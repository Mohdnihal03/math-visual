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

export default function TriangleScene({ values, autoPlay, currentStep }) {
  const [, tick] = useState(0)
  const ent  = useRef(0)
  const dT   = useRef(0)
  const cBase= useRef(values.base ?? 6)
  const cH   = useRef(values.height ?? 4)
  const pT   = useRef(0)

  useFrame((_, dt) => {
    ent.current = Math.min(1, ent.current + dt * 0.6)
    if (autoPlay) dT.current += dt * 0.38
    pT.current += dt
    const tb = autoPlay ? 2.5 + Math.abs(Math.sin(dT.current * 0.4)) * 5.5 : Math.max(0.5, values.base ?? 6)
    const th = autoPlay ? 1.5 + Math.abs(Math.sin(dT.current * 0.58)) * 4.5 : Math.max(0.5, values.height ?? 4)
    cBase.current += (tb - cBase.current) * 0.07
    cH.current    += (th - cH.current) * 0.07
    tick(n => n + 1)
  })

  const t      = ent.current
  const baseP  = easeOut(Math.min(1, t * 3))
  const heightP= easeOut(Math.min(1, Math.max(0, t * 3 - 1.0)))
  const fillP  = easeOut(Math.min(1, Math.max(0, t * 3 - 2.0)))
  const fillOp = fillP * (0.18 + Math.abs(Math.sin(pT.current * 1.5)) * 0.06)

  const base = cBase.current, height = cH.current
  const area = 0.5 * base * height
  const A = new THREE.Vector3(-base/2, 0, 0)
  const B = new THREE.Vector3( base/2, 0, 0)
  const C = new THREE.Vector3(0, height, 0)

  const triGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([A.x,A.y,0, B.x,B.y,0, C.x,C.y,0]), 3))
    geo.setAttribute('normal',   new THREE.BufferAttribute(new Float32Array([0,0,1,0,0,1,0,0,1]), 3))
    return geo
  }, [Math.round(base*4), Math.round(height*4)])

  const raS = 0.28
  const raPoints = [
    new THREE.Vector3(-raS,0.015,.02), new THREE.Vector3(-raS,raS,.02),
    new THREE.Vector3( raS,raS,.02),   new THREE.Vector3( raS,0.015,.02),
  ]

  // Control visibility based on proof steps
  let showHeight = true
  let showFill = true

  if (currentStep !== undefined) {
    if (currentStep === 0) {
      showHeight = false; showFill = false;
    } else if (currentStep === 1) {
      showHeight = true; showFill = false;
    }
  }

  return (
    <group position={[0, -height/2, 0]}>
      {/* Fill — breathes */}
      {showFill && (
        <mesh geometry={triGeo}>
          <meshStandardMaterial color="#f59e0b" side={THREE.DoubleSide}
            transparent opacity={fillOp} emissive="#f59e0b" emissiveIntensity={0.04} />
        </mesh>
      )}

      {/* Base edge */}
      {baseP > 0.02 && (
        <>
          <Line points={[A, B]} color="#d97706" lineWidth={3} transparent opacity={baseP} />
          <Line points={[
            A.clone().add(new THREE.Vector3(0,-0.44,0)),
            B.clone().add(new THREE.Vector3(0,-0.44,0)),
          ]} color="#d97706" lineWidth={1.5} transparent opacity={baseP * 0.7} />
        </>
      )}

      {/* Side edges + height */}
      {showHeight && heightP > 0.02 && (
        <>
          <Line points={[A, C]} color="#d97706" lineWidth={3} transparent opacity={heightP} />
          <Line points={[B, C]} color="#d97706" lineWidth={3} transparent opacity={heightP} />
          <Line points={[new THREE.Vector3(0,height,.02), new THREE.Vector3(0,0,.02)]}
            color="#0ea5e9" lineWidth={2.5} dashed dashSize={0.2} gapSize={0.1} transparent opacity={heightP} />
          <Line points={raPoints} color="#0ea5e9" lineWidth={1.5} transparent opacity={heightP} />
        </>
      )}

      {/* Vertex dots */}
      {[A, B, C].map((v, i) => (
        <mesh key={i} position={[v.x, v.y, 0.05]} scale={[heightP * 0.08, heightP * 0.08, heightP * 0.08]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.4} />
        </mesh>
      ))}

      {showFill && fillP > 0.3 && (
        <>
          <Html className="r3f-html" position={[0, -0.52, 0]} center style={{ pointerEvents:'none', opacity:fillP }}>
            <div style={TAG('#d97706')}>base = {base.toFixed(1)}</div>
          </Html>
          <Html className="r3f-html" position={[0.42, height/2, 0]} center style={{ pointerEvents:'none', opacity:fillP }}>
            <div style={TAG('#0284c7')}>h = {height.toFixed(1)}</div>
          </Html>
          <Html className="r3f-html" position={[0, height/3, 0.1]} center style={{ pointerEvents:'none', opacity:fillP }}>
            <div style={TAG('#b45309', { fontSize:'14px' })}>Area = {area.toFixed(2)}</div>
          </Html>
        </>
      )}

      <Grid position={[0,0,-0.1]} args={[20,20]} cellSize={1} cellThickness={0.4} cellColor="#cfc5b2"
        sectionSize={5} sectionThickness={0.8} sectionColor="#b8a890"
        infiniteGrid fadeDistance={18} fadeStrength={1.5} rotation={[Math.PI/2,0,0]} />
    </group>
  )
}
