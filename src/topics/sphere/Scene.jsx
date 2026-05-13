import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

const easeOut = t => 1 - Math.pow(1 - Math.min(1, t), 3)

export default function SphereScene({ values, autoPlay, currentStep }) {
  const [, tick] = useState(0)
  const ent  = useRef(0)
  const dT   = useRef(0)
  const cr   = useRef(values.r ?? 2)
  const rotY = useRef(0)

  const solidRef = useRef(), wireRef = useRef()
  const eqRef    = useRef(), vtRef   = useRef()

  useFrame((_, dt) => {
    ent.current = Math.min(1, ent.current + dt * 0.65)
    if (autoPlay) dT.current += dt * 0.42
    const tr = autoPlay ? 1.2 + Math.abs(Math.sin(dT.current * 0.5)) * 2.6 : Math.max(0.3, values.r ?? 2)
    cr.current += (tr - cr.current) * 0.07
    rotY.current += dt * 0.22
    tick(n => n + 1)
  })

  const ep  = easeOut(ent.current)
  const r   = cr.current
  const vol = (4/3) * Math.PI * r**3
  const sa  = 4 * Math.PI * r**2

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
          <mesh scale={[r * ep, r * ep, r * ep]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial color="#0ea5e9" transparent opacity={0.28}
              emissive="#0ea5e9" emissiveIntensity={0.1} roughness={0.1} metalness={0.2} />
          </mesh>
        )}
        {/* Wire */}
        <mesh scale={[(r + 0.008) * ep, (r + 0.008) * ep, (r + 0.008) * ep]}>
          <sphereGeometry args={[1, 18, 12]} />
          <meshBasicMaterial color="#0ea5e9" wireframe transparent opacity={0.28} />
        </mesh>
        {/* Equator ring */}
        <mesh rotation={[Math.PI/2,0,0]} scale={[ep, ep, ep]}>
          <torusGeometry args={[r, 0.018, 8, 80]} />
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.55} />
        </mesh>
        {/* Vertical ring */}
        <mesh scale={[ep, ep, ep]}>
          <torusGeometry args={[r, 0.012, 8, 80]} />
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.3} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Center dot */}
      <mesh scale={[ep, ep, ep]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#475569" />
      </mesh>

      {/* Radius arrow */}
      {showLabels && ep > 0.5 && (
        <>
          <mesh position={[r/2, 0, 0]} rotation={[0,0,Math.PI/2]} scale={[ep, ep, ep]}>
            <cylinderGeometry args={[0.018, 0.018, r, 8]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.4} />
          </mesh>
          <mesh position={[r * ep, 0, 0]} rotation={[0,0,-Math.PI/2]} scale={[ep, ep, ep]}>
            <coneGeometry args={[0.06, 0.15, 8]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.4} />
          </mesh>
          <Html className="r3f-html" position={[r/2, 0.38, 0]} center style={{ pointerEvents:'none' }}>
            <div style={{ background:'rgba(255,255,255,0.95)', border:'1px solid #fcd34d', borderRadius:'6px',
              padding:'3px 9px', color:'#d97706', fontSize:'12px', fontFamily:'Fira Code,monospace',
              fontWeight:700, boxShadow:'0 2px 6px rgba(0,0,0,0.09)' }}>
              r = {r.toFixed(2)}
            </div>
          </Html>
        </>
      )}

      {showLabels && ep > 0.7 && (
        <Html className="r3f-html" position={[r + 1.5, r * 0.8, 0]} center style={{ pointerEvents:'none' }}>
          <div style={{ background:'rgba(255,255,255,0.95)', border:'1px solid rgba(14,165,233,0.3)',
            borderRadius:'12px', padding:'10px 16px', minWidth:'155px', boxShadow:'0 4px 16px rgba(0,0,0,0.09)' }}>
            <div style={{ color:'#94a3b8', fontSize:'10px', marginBottom:'6px', fontFamily:'Fira Code,monospace', letterSpacing:'0.05em' }}>SPHERE</div>
            <div style={{ color:'#0ea5e9', fontSize:'13px', fontFamily:'Fira Code,monospace', lineHeight:1.9, fontWeight:700 }}>
              <div>V  = {vol.toFixed(2)}</div>
              <div>SA = {sa.toFixed(2)}</div>
            </div>
          </div>
        </Html>
      )}

      {/* Floor */}
      <mesh position={[0, -r - 0.5, 0]} rotation={[-Math.PI/2,0,0]}>
        <planeGeometry args={[20,20,20,20]} />
        <meshBasicMaterial color="#c4b8a5" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh position={[0, -r - 0.49, 0]} rotation={[-Math.PI/2,0,0]}>
        <circleGeometry args={[r, 64]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.06} />
      </mesh>
    </group>
  )
}
