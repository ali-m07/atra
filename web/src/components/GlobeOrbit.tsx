import { useEffect, useRef, useState } from 'react'

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

const IDLE_PITCH = -6
const MAX_PITCH = 28
const DRAG_YAW = 0.48
const DRAG_PITCH = 0.24
/** Premium turntable: ~0.22°/frame ≈ 13°/s ≈ full spin in ~27s */
const IDLE_SPIN = 0.22
/** Ease angular velocity back onto the idle turntable path after a nudge */
const SPIN_SPRING = 0.055
const PITCH_SPRING = 0.1
const VY_DAMP = 0.88

const EARTH_MAP = `${import.meta.env.BASE_URL}earth-day.jpg`

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function wrapDeg(n: number) {
  const r = n % 360
  return r < 0 ? r + 360 : r
}

/**
 * Round interactive Earth globe (never CSS rotateX/Y — that pancakes a 2D disc).
 * Continuous idle yaw (turntable); drag nudges orientation; release springs
 * velocity back onto the idle spin path — never freezes at the drag angle.
 */
export function GlobeOrbit({ hint }: GlobeOrbitProps) {
  const shellRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<OrbitState>({
    yaw: 20,
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

  const paint = () => {
    const shell = shellRef.current
    const s = stateRef.current
    if (!shell) return

    const posY = 50 + s.pitch * 0.28
    const lightX = 34 - s.pitch * 0.12
    const lightY = 30 + s.pitch * 0.4
    // Equirectangular wrap: 0–360° → 0–100% background-position-x
    shell.style.setProperty('--globe-map-x', `${(s.yaw / 360) * 100}%`)
    shell.style.setProperty('--globe-pos-y', `${clamp(posY, 38, 62)}%`)
    shell.style.setProperty('--globe-light-x', `${clamp(lightX, 24, 44)}%`)
    shell.style.setProperty('--globe-light-y', `${clamp(lightY, 18, 46)}%`)
  }

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const s = stateRef.current
    if (reducedRef.current) {
      s.vx = 0
      s.vy = 0
    }
    paint()
  }, [])

  useEffect(() => {
    let raf = 0

    const tick = () => {
      const s = stateRef.current
      const reduced = reducedRef.current

      if (!s.dragging && !reduced) {
        // Spring yaw rate back to continuous turntable spin (keeps spinning —
        // never locks forever on the angle the user left it at).
        s.vx += (IDLE_SPIN - s.vx) * SPIN_SPRING
        s.vy *= VY_DAMP
        if (Math.abs(s.vy) < 0.002) s.vy = 0

        s.yaw = wrapDeg(s.yaw + s.vx)
        s.pitch = clamp(s.pitch + s.vy, -MAX_PITCH, MAX_PITCH)
        s.pitch += (IDLE_PITCH - s.pitch) * PITCH_SPRING
        if (Math.abs(s.pitch - IDLE_PITCH) < 0.04) s.pitch = IDLE_PITCH

        paint()
      } else if (!s.dragging && reduced) {
        if (Math.abs(s.pitch - IDLE_PITCH) > 0.001) {
          s.pitch = IDLE_PITCH
          paint()
        }
      }

      raf = requestAnimationFrame(tick)
    }

    paint()
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
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

      // Capture flick velocity so release eases from the nudge into idle spin
      const scale = reducedRef.current ? 0 : 14 / dt
      s.vx = yawDelta * scale
      s.vy = pitchDelta * scale

      s.lastX = e.clientX
      s.lastY = e.clientY
      s.lastT = now
      paint()
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
        // Tap without drag: resume turntable immediately
        s.vx = IDLE_SPIN
        s.vy = 0
      }
      // Else: keep flick vx/vy — tick springs them back onto IDLE_SPIN

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
        <div className="globe-orbit__atmosphere" aria-hidden="true" />
        <div className="globe-orbit__ball">
          <div
            className="globe-orbit__texture"
            style={{ backgroundImage: `url(${EARTH_MAP})` }}
            aria-hidden="true"
          />
          <div className="globe-orbit__texture-shade" aria-hidden="true" />
          <div className="globe-orbit__specular" aria-hidden="true" />
          <div className="globe-orbit__rim" aria-hidden="true" />
        </div>
      </div>
      <p className={`globe-orbit__hint${hasDragged ? ' has-dragged' : ''}`} aria-hidden="true">
        {hint}
      </p>
    </>
  )
}
