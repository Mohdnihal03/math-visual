import { useState, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Line, Grid } from '@react-three/drei'
import * as THREE from 'three'

const easeOut = t => 1 - Math.pow(1 - Math.min(1, t), 3)
const TAG = (c, e = {}) => ({
  background:'rgba(255,255,255,0.95)', border:`1px solid ${c}60`,
  borderRadius:'8px', padding:'5px 12px', color:c, fontSize:'13px',
  fontFamily:'Fira Code,monospace', fontWeight:700, whiteSpace:'nowrap',
  boxShadow:'0 2px 8px rgba(0,0,0,0.09)', ...e,
})

export default function HeronsFormulaScene({ values, autoPlay, currentStep }) {
  const [, tick] = useState(0)
  const ent  = useRef(0)
  const dT   = useRef(0)
  const cA = useRef(values.a ?? 5)
  const cB = useRef(values.b ?? 4)
  const cAngle = useRef(values.angle ?? 60)
  const pT   = useRef(0)

  useFrame((_, dt) => {
    ent.current = Math.min(1, ent.current + dt * 0.6)
    if (autoPlay) dT.current += dt * 0.38
    pT.current += dt
    
    const ta = autoPlay ? 3 + Math.abs(Math.sin(dT.current * 0.4)) * 4 : Math.max(0.5, values.a ?? 5)
    const tb = autoPlay ? 3 + Math.abs(Math.sin(dT.current * 0.58)) * 3 : Math.max(0.5, values.b ?? 4)
    const tangle = autoPlay ? 30 + Math.abs(Math.sin(dT.current * 0.72)) * 120 : Math.max(10, values.angle ?? 60)
    
    cA.current += (ta - cA.current) * 0.07
    cB.current += (tb - cB.current) * 0.07
    cAngle.current += (tangle - cAngle.current) * 0.07
    tick(n => n + 1)
  })

  const t      = ent.current
  const fillP  = easeOut(Math.min(1, Math.max(0, t * 2 - 1.0)))
  const fillOp = fillP * (0.15 + Math.abs(Math.sin(pT.current * 1.5)) * 0.05)

  const a = cA.current
  const b = cB.current
  const angleRad = (cAngle.current * Math.PI) / 180
  
  // Law of Cosines to find side c
  const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(angleRad))
  
  const s = (a + b + c) / 2
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c))

  // Vertices
  const A = new THREE.Vector3(0, 0, 0)
  const B = new THREE.Vector3(a, 0, 0)
  const C = new THREE.Vector3(b * Math.cos(angleRad), b * Math.sin(angleRad), 0)

  // Center the triangle
  const center = new THREE.Vector3()
  center.add(A).add(B).add(C).divideScalar(3)
  
  const pA = A.clone().sub(center)
  const pB = B.clone().sub(center)
  const pC = C.clone().sub(center)

  const triGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([pA.x,pA.y,0, pB.x,pB.y,0, pC.x,pC.y,0]), 3))
    geo.setAttribute('normal',   new THREE.BufferAttribute(new Float32Array([0,0,1,0,0,1,0,0,1]), 3))
    return geo
  }, [Math.round(a*4), Math.round(b*4), Math.round(cAngle.current*4)])

  return (
    <group position={[0, 0, 0]}>
      {/* Fill */}
      {fillP > 0 && (
        <mesh geometry={triGeo}>
          <meshStandardMaterial color="#ec4899" side={THREE.DoubleSide}
            transparent opacity={fillOp} emissive="#ec4899" emissiveIntensity={0.04} />
        </mesh>
      )}

      {/* Outline */}
      {fillP > 0.1 && (
        <Line points={[pA, pB, pC, pA]} color="#db2777" lineWidth={3} transparent opacity={fillP} />
      )}

      {/* Vertex dots */}
      {[pA, pB, pC].map((v, i) => (
        <mesh key={i} position={[v.x, v.y, 0.05]} scale={[fillP * 0.08, fillP * 0.08, fillP * 0.08]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color="#db2777" emissive="#db2777" emissiveIntensity={0.4} />
        </mesh>
      ))}

      {/* Labels */}
      {fillP > 0.3 && (
        <>
          <Html className="r3f-html" position={[(pA.x + pB.x)/2, (pA.y + pB.y)/2 - 0.4, 0]} center style={{ pointerEvents:'none', opacity:fillP }}>
            <div style={TAG('#db2777')}>a = {a.toFixed(1)}</div>
          </Html>
          <Html className="r3f-html" position={[(pA.x + pC.x)/2 - 0.4, (pA.y + pC.y)/2, 0]} center style={{ pointerEvents:'none', opacity:fillP }}>
            <div style={TAG('#db2777')}>b = {b.toFixed(1)}</div>
          </Html>
          <Html className="r3f-html" position={[(pB.x + pC.x)/2 + 0.4, (pB.y + pC.y)/2, 0]} center style={{ pointerEvents:'none', opacity:fillP }}>
            <div style={TAG('#db2777')}>c = {c.toFixed(1)}</div>
          </Html>
          
          <Html className="r3f-html" position={[0, 0, 0.1]} center style={{ pointerEvents:'none', opacity:fillP }}>
            <div style={TAG('#be185d', { fontSize:'14px', textAlign:'center' })}>
              s = {s.toFixed(1)}<br/>
              Area = {area.toFixed(1)}
            </div>
          </Html>
        </>
      )}

      <Grid position={[0,0,-0.1]} args={[20,20]} cellSize={1} cellThickness={0.4} cellColor="#cfc5b2"
        sectionSize={5} sectionThickness={0.8} sectionColor="#b8a890"
        infiniteGrid fadeDistance={18} fadeStrength={1.5} rotation={[Math.PI/2,0,0]} />
    </group>
  )
}
