import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Line } from '@react-three/drei'
import * as THREE from 'three'

const easeOut = t => 1 - Math.pow(1 - Math.min(1, t), 3)
const TAG = c => ({
  background:'rgba(255,255,255,0.95)', border:`1px solid ${c}60`,
  borderRadius:'6px', padding:'3px 9px', color:c, fontSize:'12px',
  fontFamily:'Fira Code,monospace', fontWeight:700, whiteSpace:'nowrap',
  boxShadow:'0 2px 6px rgba(0,0,0,0.09)',
})

export default function CylinderScene({ values, autoPlay, currentStep }) {
  const [, tick] = useState(0)
  const ent  = useRef(0)
  const dT   = useRef(0)
  const cr   = useRef(values.r ?? 2)
  const ch   = useRef(values.h ?? 4)
  const rotY = useRef(0)

  useFrame((_, dt) => {
    ent.current = Math.min(1, ent.current + dt * 0.6)
    if (autoPlay) dT.current += dt * 0.4
    const tr = autoPlay ? 0.8 + Math.abs(Math.sin(dT.current * 0.42)) * 2.6 : Math.max(0.3, values.r ?? 2)
    const th = autoPlay ? 1.0 + Math.abs(Math.sin(dT.current * 0.6)) * 5.5 : Math.max(0.3, values.h ?? 4)
    cr.current += (tr - cr.current) * 0.07
    ch.current += (th - ch.current) * 0.07
    rotY.current += dt * 0.18
    tick(n => n + 1)
  })

  const t   = ent.current
  const ep  = easeOut(t)
  const hEp = easeOut(Math.min(1, t * 1.6))

  const r = cr.current, h = ch.current
  const vol = Math.PI * r * r * h
  const sa  = 2 * Math.PI * r * (r + h)

  const heightLine = [new THREE.Vector3(r+0.4, -h/2, 0), new THREE.Vector3(r+0.4, h/2, 0)]
  const radiusLine = [new THREE.Vector3(0, h/2+0.35, 0), new THREE.Vector3(r, h/2+0.35, 0)]

  // Control visibility based on proof steps
  let showSolid = true
  let showLabels = true

  if (currentStep !== undefined) {
    if (currentStep === 0) {
      showSolid = false; showLabels = false;
    } else if (currentStep === 1) {
      showSolid = true; showLabels = false;
    }
  }

  return (
    <group>
      <group rotation={[0, rotY.current, 0]}>
        {/* Solid */}
        {showSolid && (
          <mesh scale={[r * ep, h * hEp, r * ep]}>
            <cylinderGeometry args={[1,1,1,64,8]} />
            <meshStandardMaterial color="#8b5cf6" transparent opacity={0.28}
              emissive="#8b5cf6" emissiveIntensity={0.1} roughness={0.2} metalness={0.3} />
          </mesh>
        )}
        {/* Wire */}
        <mesh scale={[(r+0.01)*ep, (h+0.01)*hEp, (r+0.01)*ep]}>
          <cylinderGeometry args={[1,1,1,32,6]} />
          <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.26} />
        </mesh>
        {/* Cap rings */}
        <mesh position={[0, h*hEp/2, 0]} scale={[ep, ep, ep]}>
          <torusGeometry args={[r, 0.02, 8, 64]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, -h*hEp/2, 0]} scale={[ep, ep, ep]}>
          <torusGeometry args={[r, 0.02, 8, 64]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.35} />
        </mesh>
      </group>

      {/* Axis */}
      <mesh scale={[ep, ep, ep]}>
        <cylinderGeometry args={[0.015, 0.015, h+0.8, 8]} />
        <meshBasicMaterial color="#c4b8a5" transparent opacity={0.45} />
      </mesh>

      {showLabels && ep > 0.5 && (
        <>
          <Line points={heightLine} color="#ec4899" lineWidth={2} />
          <Html className="r3f-html" position={[r+1.0, 0, 0]} center style={{ pointerEvents:'none' }}>
            <div style={TAG('#be185d')}>h = {h.toFixed(1)}</div>
          </Html>
          <Line points={radiusLine} color="#f59e0b" lineWidth={2} />
          <Html className="r3f-html" position={[r/2, h/2+0.7, 0]} center style={{ pointerEvents:'none' }}>
            <div style={TAG('#d97706')}>r = {r.toFixed(1)}</div>
          </Html>
        </>
      )}

      {showLabels && ep > 0.7 && (
        <Html className="r3f-html" position={[-r-1.7, 0, 0]} center style={{ pointerEvents:'none' }}>
          <div style={{ background:'rgba(255,255,255,0.95)', border:'1px solid rgba(139,92,246,0.3)',
            borderRadius:'12px', padding:'10px 16px', minWidth:'160px', boxShadow:'0 4px 16px rgba(0,0,0,0.09)' }}>
            <div style={{ color:'#94a3b8', fontSize:'10px', marginBottom:'6px', fontFamily:'Fira Code,monospace', letterSpacing:'0.05em' }}>CYLINDER</div>
            <div style={{ color:'#8b5cf6', fontSize:'13px', fontFamily:'Fira Code,monospace', lineHeight:1.9, fontWeight:700 }}>
              <div>V  = {vol.toFixed(2)}</div>
              <div>SA = {sa.toFixed(2)}</div>
            </div>
          </div>
        </Html>
      )}

      <mesh position={[0,-h/2-0.49,0]} rotation={[-Math.PI/2,0,0]}>
        <circleGeometry args={[r, 64]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.06} />
      </mesh>
      <mesh position={[0,-h/2-0.5,0]} rotation={[-Math.PI/2,0,0]}>
        <planeGeometry args={[20,20,20,20]} />
        <meshBasicMaterial color="#c4b8a5" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  )
}
