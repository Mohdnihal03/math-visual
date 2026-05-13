import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Line, Grid } from '@react-three/drei'
import * as THREE from 'three'

const easeOut = t => 1 - Math.pow(1 - Math.min(1, t), 3)
const TAG = (c, extra = {}) => ({
  background:'rgba(255,255,255,0.95)', border:`1px solid ${c}60`,
  borderRadius:'6px', padding:'3px 9px', color:c, fontSize:'12px',
  fontWeight:700, fontFamily:'Fira Code,monospace', whiteSpace:'nowrap',
  boxShadow:'0 2px 8px rgba(0,0,0,0.09)', ...extra,
})

function buildCircle(r, frac = 1) {
  const n = Math.max(2, Math.round(128 * frac))
  return Array.from({ length: n }, (_, i) => {
    const a = (i / (128)) * Math.PI * 2
    return new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0)
  })
}

export default function TrigonometryScene({ values, autoPlay, currentStep }) {
  const [, tick] = useState(0)
  const ent  = useRef(0)
  const dT   = useRef(0)
  const cRad = useRef((values.angle ?? 45) * Math.PI / 180)

  useFrame((_, dt) => {
    ent.current = Math.min(1, ent.current + dt * 0.6)
    if (autoPlay) dT.current += dt * 0.55
    const target = autoPlay ? dT.current : (values.angle ?? 45) * Math.PI / 180
    cRad.current += (target - cRad.current) * (autoPlay ? 1 : 0.1)
    tick(n => n + 1)
  })

  const t       = ent.current
  const circleP = easeOut(Math.min(1, t * 2))
  const lineP   = easeOut(Math.min(1, Math.max(0, t * 2 - 0.9)))
  const labelP  = easeOut(Math.min(1, Math.max(0, t * 2 - 1.5)))

  const rad = cRad.current
  const px = Math.cos(rad), py = Math.sin(rad)
  const sinV = Math.sin(rad), cosV = Math.cos(rad)
  const tanV = Math.abs(Math.tan(rad)) < 10 ? Math.tan(rad) : null
  const deg  = ((rad * 180 / Math.PI) % 360 + 360) % 360

  const circPts = buildCircle(1, circleP)
  const arcPts  = Array.from({ length: 20 }, (_, i) => {
    const a = (i / 19) * rad
    return new THREE.Vector3(Math.cos(a) * 0.36, Math.sin(a) * 0.36, 0.01)
  })

  // Control visibility based on proof steps — highly progressive like Triangle
  let showLines = true
  let showSinCos = true
  let showLabels = true

  if (currentStep !== undefined) {
    if (currentStep === 0) {
      showLines = false; showSinCos = false; showLabels = false;
    } else if (currentStep === 1) {
      showLines = true; showSinCos = false; showLabels = false; // Radius and axes only
    } else if (currentStep === 2) {
      showLines = true; showSinCos = true; showLabels = false; // Add sin/cos lines
    } else if (currentStep >= 3) {
      showLines = true; showSinCos = true; showLabels = true; // Show everything
    }
  }

  return (
    <group>
      {/* Circle ring draws in */}
      {circPts.length > 1 && (
        <Line points={circPts} color="#6366f1" lineWidth={2} transparent opacity={0.7} />
      )}

      {/* Axes */}
      {showLines && lineP > 0.02 && (
        <>
          <Line points={[new THREE.Vector3(-1.7,0,0), new THREE.Vector3(1.7,0,0)]}
            color="#c4b8a5" lineWidth={1.5} transparent opacity={lineP} />
          <Line points={[new THREE.Vector3(0,-1.7,0), new THREE.Vector3(0,1.7,0)]}
            color="#c4b8a5" lineWidth={1.5} transparent opacity={lineP} />

          {/* Radius */}
          <Line points={[new THREE.Vector3(0,0,0.01), new THREE.Vector3(px,py,0.01)]}
            color="#475569" lineWidth={2} transparent opacity={lineP} />
          
          {/* cos — amber */}
          {showSinCos && (
            <Line points={[new THREE.Vector3(0,0,0.02), new THREE.Vector3(px,0,0.02)]}
              color="#d97706" lineWidth={3} transparent opacity={lineP} />
          )}
          
          {/* sin — cyan */}
          {showSinCos && (
            <Line points={[new THREE.Vector3(px,0,0.02), new THREE.Vector3(px,py,0.02)]}
              color="#0ea5e9" lineWidth={3} transparent opacity={lineP} />
          )}
          
          {/* tan — purple */}
          {showSinCos && tanV !== null && Math.abs(cosV) > 0.1 && (
            <Line points={[new THREE.Vector3(1,0,0.02), new THREE.Vector3(1,tanV,0.02)]}
              color="#8b5cf6" lineWidth={2} transparent opacity={lineP * 0.85} />
          )}
          
          {/* Angle arc */}
          {arcPts.length > 1 && (
            <Line points={arcPts} color="#f59e0b" lineWidth={2} transparent opacity={lineP * 0.9} />
          )}
        </>
      )}

      {/* Point on circle */}
      {showLines && (
        <mesh position={[px, py, 0.07]} scale={[lineP, lineP, lineP]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.6} />
        </mesh>
      )}

      {/* Labels */}
      {showLabels && labelP > 0.1 && (
        <>
          <Html className="r3f-html" position={[px/2, -0.24, 0]} center style={{ pointerEvents:'none', opacity: labelP }} >
            <div style={TAG('#d97706')}>cos = {cosV.toFixed(3)}</div>
          </Html>
          <Html className="r3f-html" position={[px + 0.26, py/2, 0]} center style={{ pointerEvents:'none', opacity: labelP }} >
            <div style={TAG('#0ea5e9')}>sin = {sinV.toFixed(3)}</div>
          </Html>
          <Html className="r3f-html" position={[0.26, 0.26, 0]} center style={{ pointerEvents:'none', opacity: labelP }} >
            <div style={TAG('#f59e0b', { fontSize:'11px' })}>θ = {deg.toFixed(0)}°</div>
          </Html>
          {tanV !== null && Math.abs(cosV) > 0.15 && (
              <Html className="r3f-html" position={[1.3, tanV / 2, 0]} center style={{ pointerEvents:'none', opacity: labelP }} >
              <div style={TAG('#8b5cf6')}>tan = {tanV.toFixed(3)}</div>
            </Html>
          )}
          <Html className="r3f-html" position={[px + 0.16, py + 0.2, 0]} center style={{ pointerEvents:'none', opacity: labelP }} >
            <div style={TAG('#475569', { fontWeight:500 })}>({cosV.toFixed(2)}, {sinV.toFixed(2)})</div>
          </Html>
        </>
      )}

      <Grid position={[0,0,-0.05]} args={[10,10]} cellSize={0.5} cellThickness={0.4} cellColor="#cfc5b2"
        sectionSize={1} sectionThickness={0.8} sectionColor="#b8a890"
        infiniteGrid fadeDistance={12} fadeStrength={2} rotation={[Math.PI/2,0,0]} />
    </group>
  )
}
