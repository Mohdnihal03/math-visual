import { useState, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Grid, Line } from '@react-three/drei'
import * as THREE from 'three'

const easeOut = t => 1 - Math.pow(1 - Math.min(1, t), 3)
const TAG = c => ({
  background: 'rgba(255,255,255,0.95)', border: `1px solid ${c}60`,
  borderRadius: '8px', padding: '4px 10px', color: c, fontSize: '13px',
  fontWeight: 700, fontFamily: 'Fira Code,monospace', whiteSpace: 'nowrap',
  boxShadow: '0 2px 10px rgba(0,0,0,0.10)',
})

export default function PythagoreanScene({ values, autoPlay, currentStep }) {
  const [, tick] = useState(0)
  const ent = useRef(0)
  const dT = useRef(0)
  const ca = useRef(values.a ?? 3)
  const cb = useRef(values.b ?? 4)

  useFrame((_, dt) => {
    ent.current = Math.min(1, ent.current + dt * 0.65)
    if (autoPlay) dT.current += dt * 0.45
    const ta = autoPlay ? 2 + Math.abs(Math.sin(dT.current * 0.7)) * 5.5 : (values.a ?? 3)
    const tb = autoPlay ? 2 + Math.abs(Math.cos(dT.current * 0.55)) * 5.5 : (values.b ?? 4)
    ca.current += (ta - ca.current) * 0.08
    cb.current += (tb - cb.current) * 0.08
    tick(n => n + 1)
  })

  const t  = ent.current
  const triP = easeOut(Math.min(1, t * 3))
  const sqAP = easeOut(Math.min(1, Math.max(0, t * 3 - 0.8)))
  const sqBP = easeOut(Math.min(1, Math.max(0, t * 3 - 1.4)))
  const sqCP = easeOut(Math.min(1, Math.max(0, t * 3 - 2.0)))

  const a = ca.current, b = cb.current
  const c = Math.sqrt(a * a + b * b)
  const angle = Math.atan2(b, -a)
  const hx = (a + b) / 2, hy = (a + b) / 2

  const triGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0,0,0, a,0,0, 0,b,0]), 3))
    geo.setAttribute('normal',   new THREE.BufferAttribute(new Float32Array([0,0,1, 0,0,1, 0,0,1]), 3))
    return geo
  }, [Math.round(a * 4), Math.round(b * 4)])

  // Control visibility based on proof steps — highly progressive like Triangle
  let showA = true
  let showB = true
  let showC = true

  if (currentStep !== undefined) {
    if (currentStep === 0) {
      showA = false; showB = false; showC = false;
    } else if (currentStep === 1) {
      showA = true; showB = true; showC = false; // Show legs squares first
    } else if (currentStep >= 2) {
      showA = true; showB = true; showC = true; // Then hypotenuse square
    }
  }

  return (
    <group position={[-a / 2, -b / 2, 0]}>
      {/* Triangle */}
      <mesh geometry={triGeo}>
        <meshStandardMaterial color="#475569" side={THREE.DoubleSide} transparent opacity={0.07 * triP} />
      </mesh>
      {triP > 0.02 && (
        <Line points={[new THREE.Vector3(0,0,.02), new THREE.Vector3(a,0,.02), new THREE.Vector3(0,b,.02), new THREE.Vector3(0,0,.02)]}
          color="#64748b" lineWidth={2} transparent opacity={triP} />
      )}
      {triP > 0.6 && (
        <Line points={[new THREE.Vector3(.35,0,.03), new THREE.Vector3(.35,.35,.03), new THREE.Vector3(0,.35,.03)]}
          color="#94a3b8" lineWidth={1.5} />
      )}

      {/* Square A — blue */}
      {showA && (
        <group>
          <mesh position={[a/2, -a/2, 0]} scale={[a * sqAP, a * sqAP, 0.06]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#3b82f6" transparent opacity={0.42} emissive="#3b82f6" emissiveIntensity={0.18} />
          </mesh>
          {sqAP > 0.08 && (
            <lineSegments position={[a/2, -a/2, 0]} scale={[a * sqAP, a * sqAP, 0.06]}>
              <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
              <lineBasicMaterial color="#3b82f6" />
            </lineSegments>
          )}
          {sqAP > 0.5 && (
            <Html className="r3f-html" position={[a/2, -a/2 - a*sqAP/2 - 0.55, 0]} center style={{ pointerEvents:'none' }}>
              <div style={TAG('#3b82f6')}>a² = {(a * a).toFixed(1)}</div>
            </Html>
          )}
        </group>
      )}

      {/* Square B — red */}
      {showB && (
        <group>
          <mesh position={[-b/2, b/2, 0]} scale={[b * sqBP, b * sqBP, 0.06]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#ef4444" transparent opacity={0.42} emissive="#ef4444" emissiveIntensity={0.18} />
          </mesh>
          {sqBP > 0.08 && (
            <lineSegments position={[-b/2, b/2, 0]} scale={[b * sqBP, b * sqBP, 0.06]}>
              <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
              <lineBasicMaterial color="#ef4444" />
            </lineSegments>
          )}
          {sqBP > 0.5 && (
            <Html className="r3f-html" position={[-b/2 - b*sqBP/2 - 0.65, b/2, 0]} center style={{ pointerEvents:'none' }}>
              <div style={TAG('#ef4444')}>b² = {(b * b).toFixed(1)}</div>
            </Html>
          )}
        </group>
      )}

      {/* Square C — green (hypotenuse) */}
      {showC && (
        <group position={[hx, hy, 0]} rotation={[0, 0, angle]}>
          <mesh scale={[c * sqCP, c * sqCP, 0.06]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#22c55e" transparent opacity={0.42} emissive="#22c55e" emissiveIntensity={0.18} />
          </mesh>
          {sqCP > 0.08 && (
            <lineSegments scale={[c * sqCP, c * sqCP, 0.06]}>
              <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
              <lineBasicMaterial color="#22c55e" />
            </lineSegments>
          )}
          {sqCP > 0.5 && (
            <Html className="r3f-html" position={[c * 0.65, c * 0.65, 0]} center style={{ pointerEvents:'none' }}>
              <div style={TAG('#22c55e')}>c² = {(c * c).toFixed(1)}</div>
            </Html>
          )}
        </group>
      )}

      {/* Side labels */}
      {triP > 0.85 && (
        <>
          <Html className="r3f-html" position={[a/2, -0.44, 0]} center style={{ pointerEvents:'none' }}>
            <div style={{ color:'#3b82f6', fontSize:'12px', fontFamily:'Fira Code,monospace', fontWeight:700 }}>a = {a.toFixed(1)}</div>
          </Html>
          <Html className="r3f-html" position={[-0.52, b/2, 0]} center style={{ pointerEvents:'none' }}>
            <div style={{ color:'#ef4444', fontSize:'12px', fontFamily:'Fira Code,monospace', fontWeight:700 }}>b = {b.toFixed(1)}</div>
          </Html>
          <Html className="r3f-html" position={[a/2 + 0.3, b/2 + 0.35, 0]} center style={{ pointerEvents:'none' }}>
            <div style={{ color:'#22c55e', fontSize:'12px', fontFamily:'Fira Code,monospace', fontWeight:700 }}>c = {c.toFixed(2)}</div>
          </Html>
        </>
      )}

      <Grid position={[0,0,-0.1]} args={[20,20]} cellSize={1} cellThickness={0.5} cellColor="#cfc5b2"
        sectionSize={5} sectionThickness={1} sectionColor="#b8a890"
        infiniteGrid fadeDistance={25} fadeStrength={1.5} rotation={[Math.PI/2,0,0]} />
    </group>
  )
}
