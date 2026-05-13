import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Line, Grid } from '@react-three/drei'
import * as THREE from 'three'

const TAG = (c, e = {}) => ({
  background:'rgba(255,255,255,0.95)', border:`1px solid ${c}60`,
  borderRadius:'8px', padding:'5px 12px', color:c, fontSize:'13px',
  fontFamily:'Fira Code,monospace', fontWeight:700, whiteSpace:'nowrap',
  boxShadow:'0 2px 8px rgba(0,0,0,0.09)', ...e,
})

export default function CoordinateGeometryScene({ values, autoPlay }) {
  const [, tick] = useState(0)
  const dT = useRef(0)
  const cx = useRef(values.x ?? 2)
  const cy = useRef(values.y ?? 3)

  useFrame((_, dt) => {
    if (autoPlay) dT.current += dt * 0.5
    const tx = autoPlay ? Math.sin(dT.current) * 4 : (values.x ?? 2)
    const ty = autoPlay ? Math.cos(dT.current * 0.7) * 4 : (values.y ?? 3)
    cx.current += (tx - cx.current) * 0.1
    cy.current += (ty - cy.current) * 0.1
    tick(n => n + 1)
  })

  const x = cx.current
  const y = cy.current

  const P = new THREE.Vector3(x, y, 0)
  const Px = new THREE.Vector3(x, 0, 0)
  const Py = new THREE.Vector3(0, y, 0)

  return (
    <group>
      {/* Grid */}
      <Grid position={[0,0,-0.1]} args={[20,20]} cellSize={1} cellThickness={0.4} cellColor="#cfc5b2"
        sectionSize={5} sectionThickness={0.8} sectionColor="#b8a890"
        infiniteGrid fadeDistance={18} fadeStrength={1.5} rotation={[Math.PI/2,0,0]} />

      {/* Axes */}
      <Line points={[new THREE.Vector3(-10,0,0), new THREE.Vector3(10,0,0)]} color="#4b5563" lineWidth={2} />
      <Line points={[new THREE.Vector3(0,-10,0), new THREE.Vector3(0,10,0)]} color="#4b5563" lineWidth={2} />

      {/* Projections */}
      <Line points={[P, Px]} color="#9ca3af" lineWidth={1.5} dashed dashSize={0.2} gapSize={0.1} />
      <Line points={[P, Py]} color="#9ca3af" lineWidth={1.5} dashed dashSize={0.2} gapSize={0.1} />

      {/* Point */}
      <mesh position={[x, y, 0.05]} scale={[0.15, 0.15, 0.15]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.4} />
      </mesh>

      {/* Origin */}
      <mesh position={[0, 0, 0.05]} scale={[0.1, 0.1, 0.1]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>

      {/* Labels */}
      <Html className="r3f-html" position={[x, y + 0.3, 0]} center style={{ pointerEvents:'none' }}>
        <div style={TAG('#0ea5e9')}>P ({x.toFixed(1)}, {y.toFixed(1)})</div>
      </Html>

      <Html className="r3f-html" position={[x, -0.3, 0]} center style={{ pointerEvents:'none' }}>
        <div style={TAG('#4b5563')}>x = {x.toFixed(1)}</div>
      </Html>

      <Html className="r3f-html" position={[-0.5, y, 0]} center style={{ pointerEvents:'none' }}>
        <div style={TAG('#4b5563')}>y = {y.toFixed(1)}</div>
      </Html>

      {/* Quadrant Labels */}
      <Html className="r3f-html" position={[3, 3, 0]} center style={{ pointerEvents:'none', opacity: 0.5 }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9ca3af' }}>I</div>
      </Html>
      <Html className="r3f-html" position={[-3, 3, 0]} center style={{ pointerEvents:'none', opacity: 0.5 }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9ca3af' }}>II</div>
      </Html>
      <Html className="r3f-html" position={[-3, -3, 0]} center style={{ pointerEvents:'none', opacity: 0.5 }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9ca3af' }}>III</div>
      </Html>
      <Html className="r3f-html" position={[3, -3, 0]} center style={{ pointerEvents:'none', opacity: 0.5 }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9ca3af' }}>IV</div>
      </Html>
    </group>
  )
}
