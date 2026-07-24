import {
  AdditiveBlending,
  AmbientLight,
  BackSide,
  Color,
  DirectionalLight,
  Group,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  SRGBColorSpace,
  TextureLoader,
  WebGLRenderer,
} from 'three'

export type GlobeFrameState = {
  yaw: number
  pitch: number
  vx: number
  vy: number
  dragging: boolean
}

const EARTH_MAP = `${import.meta.env.BASE_URL}earth-day.jpg`
const DEG = Math.PI / 180

const ATMOSPHERE_VERT = /* glsl */ `
varying vec3 vNormal;
varying vec3 vViewPos;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vViewPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`

const ATMOSPHERE_FRAG = /* glsl */ `
varying vec3 vNormal;
varying vec3 vViewPos;

void main() {
  vec3 viewDir = normalize(-vViewPos);
  float fresnel = pow(1.0 - abs(dot(viewDir, normalize(vNormal))), 3.2);
  float alpha = fresnel * 0.92;
  gl_FragColor = vec4(0.42, 0.72, 1.0, alpha);
}
`

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
  // Frame the full sphere with margin so the circular limb + fresnel read clearly
  const camera = new PerspectiveCamera(40, 1, 0.1, 20)
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
  const earthMat = new MeshPhongMaterial({
    // Slight cool tint; directional lights carry most of the brightness
    color: new Color(0xd8e4f2),
    shininess: 22,
    specular: new Color(0x223344),
  })
  const earth = new Mesh(geo, earthMat)
  globe.add(earth)

  // Limb-only atmosphere (fresnel) — never a filled blue disc
  const atmoMat = new ShaderMaterial({
    vertexShader: ATMOSPHERE_VERT,
    fragmentShader: ATMOSPHERE_FRAG,
    transparent: true,
    depthWrite: false,
    side: BackSide,
    blending: AdditiveBlending,
  })
  const atmo = new Mesh(new SphereGeometry(1.06, 64, 64), atmoMat)
  globe.add(atmo)

  // Very low ambient + hard key → terminator / sphere shading is obvious
  scene.add(new AmbientLight(0x334866, 0.12))

  const key = new DirectionalLight(0xfff4e6, 2.6)
  key.position.set(-3.2, 1.8, 2.2)
  scene.add(key)

  const fill = new DirectionalLight(0x243656, 0.18)
  fill.position.set(2.8, -1.4, 0.6)
  scene.add(fill)

  const rim = new DirectionalLight(0x79a8ff, 0.85)
  rim.position.set(0.2, 0.6, -3.2)
  scene.add(rim)

  let disposed = false
  const loader = new TextureLoader()
  loader.load(
    EARTH_MAP,
    (tex) => {
      if (disposed) {
        tex.dispose()
        return
      }
      tex.colorSpace = SRGBColorSpace
      tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
      earthMat.map = tex
      earthMat.needsUpdate = true
    },
    undefined,
    () => {
      earthMat.color.set(0x1a4a8a)
    },
  )

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
    atmo.geometry.dispose()
    earthMat.map?.dispose()
    earthMat.dispose()
    atmoMat.dispose()
    renderer.dispose()
  }
}
