import { useEffect, useRef, useState } from 'react'

// Same hashed asset WebGL uses — never depend on /earth-day.jpg alone.
import earthDayUrl from '../assets/earth-day.jpg'

type GlobeOrbitProps = {
  hint: string
}

type OrbitState = {
  yaw: number
  pitch: number
  /** Current yaw rate (°/frame @ ~60fps). Springs toward IDLE_SPIN after release. */
  vx: number
  vy: number
  dragging: boolean
  lastX: number
  lastY: number
  lastT: number
  moved: boolean
}

const IDLE_PITCH = -8
const MAX_PITCH = 32
const DRAG_YAW = 0.48
const DRAG_PITCH = 0.28
/** ~0.28°/frame ≈ 17°/s ≈ full spin in ~21s — livelier turntable */
const IDLE_SPIN = 0.28
const SPIN_SPRING = 0.06
const PITCH_SPRING = 0.1
const VY_DAMP = 0.88

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function wrapDeg(n: number) {
  const r = n % 360
  return r < 0 ? r + 360 : r
}

/**
 * Real 3D Earth (Three.js SphereGeometry) inside the laptop hero frame.
 * Continuous idle yaw (turntable); drag nudges orientation; release springs
 * velocity back onto the idle spin path — never freezes at the drag angle.
 */
export function GlobeOrbit({ hint }: GlobeOrbitProps) {
  const shellRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<OrbitState>({
    // SphereGeometry maps texture u=0.5 (Africa) to +X; rotate -90° so +X faces the camera.
    yaw: -90,
    pitch: IDLE_PITCH,
    vx: IDLE_SPIN,
    vy: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    lastT: 0,
    moved: false,
  })
  const [grabbing, setGrabbing] = useState(false)
  const [hasDragged, setHasDragged] = useState(false)
  const reducedRef = useRef(false)

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const s = stateRef.current
    if (reducedRef.current) {
      s.vx = 0
      s.vy = 0
    }
  }, [])

  useEffect(() => {
    const shell = shellRef.current
    const canvas = canvasRef.current
    if (!shell || !canvas) return

    let cancelled = false
    let destroy: (() => void) | undefined

    void import('./globeScene').then(({ createGlobeScene }) => {
      if (cancelled || !shellRef.current || !canvasRef.current) return
      destroy = createGlobeScene({
        canvas: canvasRef.current,
        shell: shellRef.current,
        getState: () => stateRef.current,
        idlePitch: IDLE_PITCH,
        maxPitch: MAX_PITCH,
        idleSpin: IDLE_SPIN,
        spinSpring: SPIN_SPRING,
        pitchSpring: PITCH_SPRING,
        vyDamp: VY_DAMP,
        reducedMotion: () => reducedRef.current,
        wrapDeg,
        clamp,
      })
      if (cancelled) {
        destroy()
        destroy = undefined
      }
    })

    return () => {
      cancelled = true
      destroy?.()
    }
  }, [])

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return
      const s = stateRef.current
      s.dragging = true
      s.moved = false
      s.vx = 0
      s.vy = 0
      s.lastX = e.clientX
      s.lastY = e.clientY
      s.lastT = performance.now()
      setGrabbing(true)
      shell.classList.add('is-dragging')
      shell.setPointerCapture(e.pointerId)
      e.preventDefault()
    }

    const onPointerMove = (e: PointerEvent) => {
      const s = stateRef.current
      if (!s.dragging) return

      const now = performance.now()
      const dt = Math.max(8, now - s.lastT)
      const dx = e.clientX - s.lastX
      const dy = e.clientY - s.lastY
      if (Math.abs(dx) + Math.abs(dy) > 2) s.moved = true

      const yawDelta = dx * DRAG_YAW
      const pitchDelta = -dy * DRAG_PITCH
      s.yaw = wrapDeg(s.yaw + yawDelta)
      s.pitch = clamp(s.pitch + pitchDelta, -MAX_PITCH, MAX_PITCH)

      const scale = reducedRef.current ? 0 : 14 / dt
      s.vx = yawDelta * scale
      s.vy = pitchDelta * scale

      s.lastX = e.clientX
      s.lastY = e.clientY
      s.lastT = now
    }

    const endDrag = (e: PointerEvent) => {
      const s = stateRef.current
      if (!s.dragging) return
      s.dragging = false
      setGrabbing(false)
      shell.classList.remove('is-dragging')
      if (s.moved) setHasDragged(true)

      if (reducedRef.current) {
        s.vx = 0
        s.vy = 0
      } else if (!s.moved) {
        s.vx = IDLE_SPIN
        s.vy = 0
      }

      try {
        shell.releasePointerCapture(e.pointerId)
      } catch {
        /* already released */
      }
    }

    shell.addEventListener('pointerdown', onPointerDown)
    shell.addEventListener('pointermove', onPointerMove)
    shell.addEventListener('pointerup', endDrag)
    shell.addEventListener('pointercancel', endDrag)

    return () => {
      shell.removeEventListener('pointerdown', onPointerDown)
      shell.removeEventListener('pointermove', onPointerMove)
      shell.removeEventListener('pointerup', endDrag)
      shell.removeEventListener('pointercancel', endDrag)
    }
  }, [])

  return (
    <>
      <div
        ref={shellRef}
        className={`globe-orbit${grabbing ? ' is-grabbing' : ''}${hasDragged ? ' has-dragged' : ''}`}
        role="img"
        aria-label={hint}
        title={hint}
      >
        {/* CSS map ball under canvas: if WebGL fails, continents still show (never a solid blue disc). */}
        <div
          className="globe-orbit__fallback"
          aria-hidden="true"
          style={{ backgroundImage: `url(${earthDayUrl})` }}
        />
        <div className="globe-orbit__atmosphere" aria-hidden="true" />
        <canvas ref={canvasRef} className="globe-orbit__canvas" aria-hidden="true" />
      </div>
      <p className={`globe-orbit__hint${hasDragged ? ' has-dragged' : ''}`} aria-hidden="true">
        {hint}
      </p>
    </>
  )
}
