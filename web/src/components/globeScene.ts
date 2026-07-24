import {
  AmbientLight,
  CanvasTexture,
  Color,
  DirectionalLight,
  Group,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  WebGLRenderer,
} from 'three'

// Bundled via Vite so the map URL is always correct under /atra/ (and locally).
import earthDayUrl from '../assets/earth-day.jpg'

export type GlobeFrameState = {
  yaw: number
  pitch: number
  vx: number
  vy: number
  dragging: boolean
}

const DEG = Math.PI / 180

type CreateGlobeSceneOptions = {
  canvas: HTMLCanvasElement
  shell: HTMLElement
  getState: () => GlobeFrameState
  idlePitch: number
  maxPitch: number
  idleSpin: number
  spinSpring: number
  pitchSpring: number
  vyDamp: number
  reducedMotion: () => boolean
  wrapDeg: (n: number) => number
  clamp: (n: number, min: number, max: number) => number
}

/** Hand-drawn equirectangular fallback — land/ocean readable, never a solid blue disc. */
function createFallbackEarthTexture(): CanvasTexture {
  const w = 1024
  const h = 512
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d')
  if (!ctx) {
    const tex = new CanvasTexture(c)
    tex.colorSpace = SRGBColorSpace
    return tex
  }

  const ocean = ctx.createLinearGradient(0, 0, 0, h)
  ocean.addColorStop(0, '#3a7ec4')
  ocean.addColorStop(0.5, '#2f6eb0')
  ocean.addColorStop(1, '#3a7ec4')
  ctx.fillStyle = ocean
  ctx.fillRect(0, 0, w, h)

  const land = (x: number, y: number, rw: number, rh: number, color: string) => {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.ellipse(x, y, rw, rh, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  const green = '#5f9a4a'
  const tan = '#c4a46a'
  const ice = '#e8eef5'

  land(220, 210, 55, 90, green)
  land(240, 320, 35, 70, green)
  land(250, 380, 28, 45, tan)
  land(520, 170, 40, 28, green)
  land(540, 260, 55, 85, tan)
  land(555, 320, 35, 55, green)
  land(700, 180, 110, 55, tan)
  land(760, 220, 90, 50, green)
  land(820, 260, 50, 35, green)
  land(850, 360, 45, 28, tan)
  land(380, 60, 35, 28, ice)
  ctx.fillStyle = ice
  ctx.fillRect(0, 0, w, 28)
  ctx.fillRect(0, h - 36, w, 36)

  ctx.strokeStyle = 'rgba(255,255,255,0.08)'
  ctx.lineWidth = 1
  for (let i = 1; i < 8; i++) {
    const x = (w / 8) * i
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, h)
    ctx.stroke()
  }

  const tex = new CanvasTexture(c)
  tex.colorSpace = SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

function applyEarthMap(mat: MeshPhongMaterial, tex: Texture, renderer: WebGLRenderer) {
  tex.colorSpace = SRGBColorSpace
  tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
  mat.map = tex
  mat.emissiveMap = tex
  mat.emissive = new Color(0xffffff)
  // Mild lift only — high emissive washes oceans into a solid blue disc.
  mat.emissiveIntensity = 0.14
  mat.color.set(0xffffff)
  mat.needsUpdate = true
}

/**
 * WebGL Earth sphere — loaded via dynamic import so Three.js stays out of the
 * critical path chunk.
 */
export function createGlobeScene({
  canvas,
  shell,
  getState,
  idlePitch,
  maxPitch,
  idleSpin,
  spinSpring,
  pitchSpring,
  vyDamp,
  reducedMotion,
  wrapDeg,
  clamp,
}: CreateGlobeSceneOptions): () => void {
  const scene = new Scene()
  const camera = new PerspectiveCamera(40, 1, 0.1, 20)
  // Must leave margin around the unit sphere or the limb clips to flat edges in the bezel
  camera.position.z = 4.05

  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  })
  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.outputColorSpace = SRGBColorSpace

  const globe = new Group()
  scene.add(globe)

  const geo = new SphereGeometry(1, 96, 96)
  // Immediate continent map — never a flat solid blue disc while the JPEG loads.
  const fallbackTex = createFallbackEarthTexture()
  const earthMat = new MeshPhongMaterial({
    color: new Color(0xffffff),
    map: fallbackTex,
    emissive: new Color(0xffffff),
    emissiveMap: fallbackTex,
    emissiveIntensity: 0.12,
    shininess: 8,
    specular: new Color(0x1a2430),
  })
  const earth = new Mesh(geo, earthMat)
  globe.add(earth)

  // No WebGL fresnel shell — it was reading as a filled blue disc over the map.
  // Soft rim lives in CSS (.globe-orbit__atmosphere) only.

  // Directional key carries sphere shading; keep ambient moderate so oceans stay ocean.
  scene.add(new AmbientLight(0xffffff, 0.48))

  const key = new DirectionalLight(0xfff6e8, 2.35)
  key.position.set(-2.6, 1.7, 2.4)
  scene.add(key)

  const fill = new DirectionalLight(0x9bb4d0, 0.42)
  fill.position.set(2.4, -1.0, 1.2)
  scene.add(fill)

  const rim = new DirectionalLight(0xc8dcff, 0.2)
  rim.position.set(0.1, 0.35, -3.0)
  scene.add(rim)

  let disposed = false
  const loader = new TextureLoader()

  const tryLoad = (url: string, onFail: () => void) => {
    loader.load(
      url,
      (tex) => {
        if (disposed) {
          tex.dispose()
          return
        }
        const prev = earthMat.map
        applyEarthMap(earthMat, tex, renderer)
        if (prev === fallbackTex) fallbackTex.dispose()
        else if (prev && prev !== tex) prev.dispose()
        shell.dataset.globeMap = 'photo'
      },
      undefined,
      () => onFail(),
    )
  }

  // Bundled Vite URL first (hashed under /atra/assets/), then public copy.
  shell.dataset.globeMap = 'fallback'
  tryLoad(earthDayUrl, () => {
    tryLoad(`${import.meta.env.BASE_URL}earth-day.jpg`, () => {
      shell.dataset.globeMap = 'fallback'
    })
  })

  const resize = () => {
    const w = shell.clientWidth
    const h = shell.clientHeight
    if (w < 1 || h < 1) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  resize()

  const ro = new ResizeObserver(resize)
  ro.observe(shell)

  let raf = 0
  const tick = () => {
    const s = getState()
    const reduced = reducedMotion()

    if (!s.dragging && !reduced) {
      s.vx += (idleSpin - s.vx) * spinSpring
      s.vy *= vyDamp
      if (Math.abs(s.vy) < 0.002) s.vy = 0

      s.yaw = wrapDeg(s.yaw + s.vx)
      s.pitch = clamp(s.pitch + s.vy, -maxPitch, maxPitch)
      s.pitch += (idlePitch - s.pitch) * pitchSpring
      if (Math.abs(s.pitch - idlePitch) < 0.04) s.pitch = idlePitch
    } else if (!s.dragging && reduced) {
      if (Math.abs(s.pitch - idlePitch) > 0.001) s.pitch = idlePitch
    }

    globe.rotation.y = s.yaw * DEG
    globe.rotation.x = s.pitch * DEG
    renderer.render(scene, camera)
    raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)

  return () => {
    disposed = true
    cancelAnimationFrame(raf)
    ro.disconnect()
    geo.dispose()
    const map = earthMat.map
    const emissiveMap = earthMat.emissiveMap
    earthMat.map = null
    earthMat.emissiveMap = null
    map?.dispose()
    if (emissiveMap && emissiveMap !== map) emissiveMap.dispose()
    earthMat.dispose()
    renderer.dispose()
  }
}
