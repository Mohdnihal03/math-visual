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

export default function RectangleScene({ values, autoPlay, currentStep }) {
  const [, tick] = useState(0)
  const ent  = useRef(0)
  const dT   = useRef(0)
  const cWidth = useRef(values.width ?? 5)
  const cHeight = useRef(values.height ?? 3)
  const pT   = useRef(0)

  useFrame((_, dt) => {
    ent.current = Math.min(1, ent.current + dt * 0.6)
    if (autoPlay) dT.current += dt * 0.38
    pT.current += dt
    
    const tw = autoPlay ? 2 + Math.abs(Math.sin(dT.current * 0.4)) * 6 : Math.max(0.5, values.width ?? 5)
    const th = autoPlay ? 2 + Math.abs(Math.sin(dT.current * 0.58)) * 4 : Math.max(0.5, values.height ?? 3)
    
    cWidth.current += (tw - cWidth.current) * 0.07
    cHeight.current += (th - cHeight.current) * 0.07
    tick(n => n + 1)
  })

  const t      = ent.current
  const widthP = easeOut(Math.min(1, t * 3))
  const heightP = easeOut(Math.min(1, Math.max(0, t * 3 - 1.0)))
  const fillP  = easeOut(Math.min(1, Math.max(0, t * 3 - 2.0)))
  const fillOp = fillP * (0.18 + Math.abs(Math.sin(pT.current * 1.5)) * 0.06)

  const width = cWidth.current
  const height = cHeight.current
  const area = width * height
  const isSquare = Math.abs(width - height) < 0.1

  const A = new THREE.Vector3(-width/2, -height/2, 0)
  const B = new THREE.Vector3( width/2, -height/2, 0)
  const C = new THREE.Vector3( width/2,  height/2, 0)
  const D = new THREE.Vector3(-width/2,  height/2, 0)

  const rectGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, height)
    return geo
  }, [Math.round(width*4), Math.round(height*4)])

  return (
    <group position={[0, 0, 0]}>
      {/* Fill */}
      {fillP > 0 && (
        <mesh geometry={rectGeo}>
          <meshStandardMaterial color={isSquare ? "#10b981" : "#3b82f6"} side={THREE.DoubleSide}
            transparent opacity={fillOp} emissive={isSquare ? "#10b981" : "#3b82f6"} emissiveIntensity={0.04} />
        </mesh>
      )}

      {/* Outline */}
      {widthP > 0.02 && (
        <Line points={[A, B, C, D, A]} color={isSquare ? "#059669" : "#2563eb"} lineWidth={3} transparent opacity={widthP} />
      )}

      {/* Vertex dots */}
      {[A, B, C, D].map((v, i) => (
        <mesh key={i} position={[v.x, v.y, 0.05]} scale={[heightP * 0.08, heightP * 0.08, heightP * 0.08]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color={isSquare ? "#059669" : "#2563eb"} emissive={isSquare ? "#059669" : "#2563eb"} emissiveIntensity={0.4} />
        </mesh>
      ))}

      {/* Labels */}
      {fillP > 0.3 && (
        <>
          <Html className="r3f-html" position={[0, -height/2 - 0.4, 0]} center style={{ pointerEvents:'none', opacity:fillP }}>
            <div style={TAG(isSquare ? '#059669' : '#2563eb')}>Width = {width.toFixed(1)}</div>
          </Html>
          <Html className="r3f-html" position={[width/2 + 0.6, 0, 0]} center style={{ pointerEvents:'none', opacity:fillP }}>
            <div style={TAG(isSquare ? '#059669' : '#2563eb')}>Height = {height.toFixed(1)}</div>
          </Html>
          <Html className="r3f-html" position={[0, 0, 0.1]} center style={{ pointerEvents:'none', opacity:fillP }}>
            <div style={TAG(isSquare ? '#047857' : '#1d4ed8', { fontSize:'14px' })}>
              {isSquare ? 'Square' : 'Rectangle'}<br/>
              Area = {area.toFixed(2)}
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
