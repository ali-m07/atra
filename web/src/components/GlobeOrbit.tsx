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
  wasPlaying: boolean
  lastSeek: number
}

const IDLE_PITCH = -6
const MAX_PITCH = 28
const DRAG_YAW = 0.48
const DRAG_PITCH = 0.24
const INERTIA = 0.92
const STOP = 0.04
const PITCH_SNAP = 0.08
const SEC_PER_DEG = 0.014
const SEEK_EPS = 0.002

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function wrapDeg(n: number) {
  const r = n % 360
  return r < 0 ? r + 360 : r
}

function wrapTime(t: number, duration: number) {
  if (!duration || !Number.isFinite(duration)) return 0
  const r = t % duration
  return r < 0 ? r + duration : r
}

/**
 * Round interactive globe (never CSS rotateX/Y — that pancakes a 2D disc).
 * Horizontal drag scrubs the Earth video (reorient). Vertical drag tilts light only.
 */
export function GlobeOrbit({ hint }: GlobeOrbitProps) {
  const shellRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const stateRef = useRef<OrbitState>({
    yaw: 0,
    pitch: IDLE_PITCH,
    vx: 0,
    vy: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    lastT: 0,
    moved: false,
    wasPlaying: true,
    lastSeek: -1,
  })
  const [grabbing, setGrabbing] = useState(false)
  const [hasDragged, setHasDragged] = useState(false)
  const reducedRef = useRef(false)

  const paint = (scrub: boolean) => {
    const shell = shellRef.current
    const video = videoRef.current
    const s = stateRef.current
    if (!shell) return

    const posY = 50 + s.pitch * 0.28
    const lightX = 34 - s.pitch * 0.12
    const lightY = 30 + s.pitch * 0.4
    shell.style.setProperty('--globe-pos-y', `${clamp(posY, 38, 62)}%`)
    shell.style.setProperty('--globe-light-x', `${clamp(lightX, 24, 44)}%`)
    shell.style.setProperty('--globe-light-y', `${clamp(lightY, 18, 46)}%`)

    if (scrub && video && video.duration) {
      const next = wrapTime(s.yaw * SEC_PER_DEG, video.duration)
      if (Math.abs(next - s.lastSeek) >= SEEK_EPS) {
        try {
          video.currentTime = next
          s.lastSeek = next
        } catch {
          /* seek before ready */
        }
      }
    }
  }

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const video = videoRef.current
    if (!video) return

    if (reducedRef.current) {
      video.pause()
      video.removeAttribute('autoplay')
      paint(false)
      return
    }

    const play = () => {
      void video.play().catch(() => {})
    }
    play()
    video.addEventListener('loadeddata', play)
    return () => video.removeEventListener('loadeddata', play)
  }, [])

  useEffect(() => {
    let raf = 0

    const tick = () => {
      const s = stateRef.current
      const video = videoRef.current
      const reduced = reducedRef.current

      if (!s.dragging) {
        const spinning = Math.abs(s.vx) > STOP || Math.abs(s.vy) > STOP

        if (spinning && !reduced) {
          s.yaw = wrapDeg(s.yaw + s.vx)
          s.pitch = clamp(s.pitch + s.vy, -MAX_PITCH, MAX_PITCH)
          s.vx *= INERTIA
          s.vy *= INERTIA
          if (video) video.pause()
          paint(true)
        } else {
          if (s.vx !== 0 || s.vy !== 0) {
            s.vx = 0
            s.vy = 0
          }

          // Soft snap pitch back toward idle (sphere stays round)
          if (Math.abs(s.pitch - IDLE_PITCH) > 0.15) {
            s.pitch += (IDLE_PITCH - s.pitch) * (reduced ? 1 : PITCH_SNAP)
            paint(false)
          } else if (Math.abs(s.pitch - IDLE_PITCH) > 0.001) {
            s.pitch = IDLE_PITCH
            paint(false)
          }

          // Resume idle Earth motion after release
          if (
            video &&
            s.wasPlaying &&
            !reduced &&
            video.paused &&
            Math.abs(s.vx) <= STOP &&
            Math.abs(s.vy) <= STOP
          ) {
            void video.play().catch(() => {})
          }
        }
      }

      raf = requestAnimationFrame(tick)
    }

    paint(false)
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return
      const s = stateRef.current
      const video = videoRef.current
      s.dragging = true
      s.moved = false
      s.vx = 0
      s.vy = 0
      s.lastX = e.clientX
      s.lastY = e.clientY
      s.lastT = performance.now()
      s.wasPlaying = Boolean(video && !video.paused)
      if (video) {
        if (video.duration) {
          s.yaw = wrapDeg(video.currentTime / SEC_PER_DEG)
          s.lastSeek = video.currentTime
        }
        video.pause()
      }
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
      paint(true)
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
          <video
            ref={videoRef}
            className="globe-orbit__video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero-poster.jpg"
            draggable={false}
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
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
