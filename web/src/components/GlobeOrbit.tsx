import { useEffect, useRef, useState } from 'react'

type GlobeOrbitProps = {
  hint: string
}

type OrbitState = {
  yaw: number
  pitch: number
  vx: number
  vy: number
  dragging: boolean
  lastX: number
  lastY: number
  lastT: number
  moved: boolean
  idle: boolean
}

const IDLE_PITCH = -6
const MAX_PITCH = 28
const DRAG_YAW = 0.48
const DRAG_PITCH = 0.24
const INERTIA = 0.92
const STOP = 0.04
const PITCH_SNAP = 0.08
/** Degrees per frame at ~60fps ≈ gentle Earth spin */
const IDLE_SPIN = 0.08

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
 * Equirectangular NASA map; horizontal drag reorients; vertical drag tilts light.
 */
export function GlobeOrbit({ hint }: GlobeOrbitProps) {
  const shellRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<OrbitState>({
    yaw: 20,
    pitch: IDLE_PITCH,
    vx: 0,
    vy: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    lastT: 0,
    moved: false,
    idle: true,
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
    paint()
  }, [])

  useEffect(() => {
    let raf = 0

    const tick = () => {
      const s = stateRef.current
      const reduced = reducedRef.current

      if (!s.dragging) {
        const spinning = Math.abs(s.vx) > STOP || Math.abs(s.vy) > STOP

        if (spinning && !reduced) {
          s.yaw = wrapDeg(s.yaw + s.vx)
          s.pitch = clamp(s.pitch + s.vy, -MAX_PITCH, MAX_PITCH)
          s.vx *= INERTIA
          s.vy *= INERTIA
          paint()
        } else {
          if (s.vx !== 0 || s.vy !== 0) {
            s.vx = 0
            s.vy = 0
          }

          if (Math.abs(s.pitch - IDLE_PITCH) > 0.15) {
            s.pitch += (IDLE_PITCH - s.pitch) * (reduced ? 1 : PITCH_SNAP)
            paint()
          } else if (Math.abs(s.pitch - IDLE_PITCH) > 0.001) {
            s.pitch = IDLE_PITCH
            paint()
          }

          // Slow idle Earth rotation when not dragging
          if (s.idle && !reduced) {
            s.yaw = wrapDeg(s.yaw + IDLE_SPIN)
            paint()
          }
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
      s.idle = false
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
      paint()
    }

    const endDrag = (e: PointerEvent) => {
      const s = stateRef.current
      if (!s.dragging) return
      s.dragging = false
      s.idle = true
      setGrabbing(false)
      shell.classList.remove('is-dragging')
      if (s.moved) setHasDragged(true)
      if (reducedRef.current) {
        s.vx = 0
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
