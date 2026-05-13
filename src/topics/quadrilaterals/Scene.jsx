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

export default function QuadrilateralsScene({ values, autoPlay }) {
  const [, tick] = useState(0)
  const dT = useRef(0)
  const cBase = useRef(values.base ?? 5)
  const cHeight = useRef(values.height ?? 3)
  const cSkew = useRef(values.skew ?? 1)

  useFrame((_, dt) => {
    if (autoPlay) dT.current += dt * 0.5
    const tb = autoPlay ? 3 + Math.abs(Math.sin(dT.current)) * 4 : (values.base ?? 5)
    const th = autoPlay ? 2 + Math.abs(Math.cos(dT.current * 0.7)) * 3 : (values.height ?? 3)
    const ts = autoPlay ? Math.sin(dT.current * 1.2) * 2 : (values.skew ?? 1)
    cBase.current += (tb - cBase.current) * 0.1
    cHeight.current += (th - cHeight.current) * 0.1
    cSkew.current += (ts - cSkew.current) * 0.1
    tick(n => n + 1)
  })

  const base = cBase.current
  const height = cHeight.current
  const skew = cSkew.current

  const A = new THREE.Vector3(-base/2, -height/2, 0)
  const B = new THREE.Vector3( base/2, -height/2, 0)
  const C = new THREE.Vector3( base/2 + skew, height/2, 0)
  const D = new THREE.Vector3(-base/2 + skew, height/2, 0)

  // Midpoints
  const M_AD = A.clone().add(D).multiplyScalar(0.5)
  const M_BC = B.clone().add(C).multiplyScalar(0.5)

  return (
    <group>
      {/* Grid */}
      <Grid position={[0,0,-0.1]} args={[20,20]} cellSize={1} cellThickness={0.4} cellColor="#cfc5b2"
        sectionSize={5} sectionThickness={0.8} sectionColor="#b8a890"
        infiniteGrid fadeDistance={18} fadeStrength={1.5} rotation={[Math.PI/2,0,0]} />

      {/* Parallelogram Edges */}
      <Line points={[A, B, C, D, A]} color="#10b981" lineWidth={3} />

      {/* Diagonals */}
      <Line points={[A, C]} color="#6b7280" lineWidth={1.5} dashed dashSize={0.2} gapSize={0.1} />
      <Line points={[B, D]} color="#6b7280" lineWidth={1.5} dashed dashSize={0.2} gapSize={0.1} />

      {/* Midpoint Theorem Line (Example) */}
      <Line points={[M_AD, M_BC]} color="#ef4444" lineWidth={2} />

      {/* Vertex Dots */}
      {[A, B, C, D].map((v, i) => (
        <mesh key={i} position={[v.x, v.y, 0.05]} scale={[0.1, 0.1, 0.1]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.4} />
        </mesh>
      ))}

      {/* Midpoint Dots */}
      {[M_AD, M_BC].map((v, i) => (
        <mesh key={i} position={[v.x, v.y, 0.05]} scale={[0.08, 0.08, 0.08]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
      ))}

      {/* Labels */}
      <Html className="r3f-html" position={[A.x - 0.3, A.y - 0.3, 0]} center style={{ pointerEvents:'none' }}>
        <div style={{ color: '#4b5563', fontWeight: 'bold' }}>A</div>
      </Html>
      <Html className="r3f-html" position={[B.x + 0.3, B.y - 0.3, 0]} center style={{ pointerEvents:'none' }}>
        <div style={{ color: '#4b5563', fontWeight: 'bold' }}>B</div>
      </Html>
      <Html className="r3f-html" position={[C.x + 0.3, C.y + 0.3, 0]} center style={{ pointerEvents:'none' }}>
        <div style={{ color: '#4b5563', fontWeight: 'bold' }}>C</div>
      </Html>
      <Html className="r3f-html" position={[D.x - 0.3, D.y + 0.3, 0]} center style={{ pointerEvents:'none' }}>
        <div style={{ color: '#4b5563', fontWeight: 'bold' }}>D</div>
      </Html>

      {/* Info Box */}
      <Html className="r3f-html" position={[-6, 0, 0]} center style={{ pointerEvents:'none' }}>
        <div style={{ background:'rgba(255,255,255,0.95)', border:'1px solid rgba(16,185,129,0.3)',
          borderRadius:'12px', padding:'10px 16px', minWidth:'200px', boxShadow:'0 4px 16px rgba(0,0,0,0.09)' }}>
          <div style={{ color:'#94a3b8', fontSize:'10px', marginBottom:'6px', fontFamily:'Fira Code,monospace', letterSpacing:'0.05em' }}>PARALLELOGRAM</div>
          <div style={{ color:'#10b981', fontSize:'13px', fontFamily:'Fira Code,monospace', lineHeight:1.9, fontWeight:700 }}>
            <div>AB = CD = {base.toFixed(1)}</div>
            <div>Height = {height.toFixed(1)}</div>
            <div>Area = {(base * height).toFixed(2)}</div>
          </div>
        </div>
      </Html>
    </group>
  )
}
