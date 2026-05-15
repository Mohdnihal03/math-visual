import { useState, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Grid } from '@react-three/drei'
import * as THREE from 'three'

const easeOut = t => 1 - Math.pow(1 - Math.min(1, t), 3)
const TAG = (c, e = {}) => ({
  background:'rgba(255,255,255,0.95)', border:`1px solid ${c}60`,
  borderRadius:'8px', padding:'5px 12px', color:c, fontSize:'13px',
  fontFamily:'Fira Code,monospace', fontWeight:700, whiteSpace:'nowrap',
  boxShadow:'0 2px 8px rgba(0,0,0,0.09)', ...e,
})

export default function CuboidScene({ values, autoPlay, currentStep }) {
  const [, tick] = useState(0)
  const ent  = useRef(0)
  const dT   = useRef(0)
  const cLength = useRef(values.length ?? 4)
  const cWidth = useRef(values.width ?? 3)
  const cHeight = useRef(values.height ?? 2)
  const pT   = useRef(0)

  useFrame((_, dt) => {
    ent.current = Math.min(1, ent.current + dt * 0.6)
    if (autoPlay) dT.current += dt * 0.38
    pT.current += dt
    
    const tl = autoPlay ? 2 + Math.abs(Math.sin(dT.current * 0.4)) * 4 : Math.max(0.5, values.length ?? 4)
    const tw = autoPlay ? 2 + Math.abs(Math.sin(dT.current * 0.58)) * 3 : Math.max(0.5, values.width ?? 3)
    const th = autoPlay ? 1 + Math.abs(Math.sin(dT.current * 0.72)) * 3 : Math.max(0.5, values.height ?? 2)
    
    cLength.current += (tl - cLength.current) * 0.07
    cWidth.current += (tw - cWidth.current) * 0.07
    cHeight.current += (th - cHeight.current) * 0.07
    tick(n => n + 1)
  })

  const t      = ent.current
  const fillP  = easeOut(Math.min(1, Math.max(0, t * 2 - 1.0)))
  const fillOp = fillP * (0.15 + Math.abs(Math.sin(pT.current * 1.5)) * 0.05)

  const length = cLength.current
  const width = cWidth.current
  const height = cHeight.current
  const volume = length * width * height
  const surfaceArea = 2 * (length * width + width * height + height * length)
  const isCube = Math.abs(length - width) < 0.1 && Math.abs(width - height) < 0.1

  const boxColor = isCube ? "#10b981" : "#8b5cf6" // Emerald for Cube, Purple for Cuboid
  const lineColor = isCube ? "#059669" : "#7c3aed"

  return (
    <group position={[0, 0, 0]} rotation={[0.4, 0.6, 0]}>
      {/* 3D Box */}
      {fillP > 0 && (
        <mesh scale={[length, height, width]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={boxColor} transparent opacity={fillOp}
            emissive={boxColor} emissiveIntensity={0.05} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Edges/Outline */}
      {fillP > 0.1 && (
        <mesh scale={[length, height, width]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={lineColor} wireframe={true} transparent opacity={fillP} />
        </mesh>
      )}

      {/* Labels */}
      {fillP > 0.3 && (
        <>
          <Html className="r3f-html" position={[length/2 + 0.5, 0, 0]} center style={{ pointerEvents:'none', opacity:fillP }}>
            <div style={TAG(lineColor)}>L = {length.toFixed(1)}</div>
          </Html>
          <Html className="r3f-html" position={[0, height/2 + 0.5, 0]} center style={{ pointerEvents:'none', opacity:fillP }}>
            <div style={TAG(lineColor)}>H = {height.toFixed(1)}</div>
          </Html>
          <Html className="r3f-html" position={[0, 0, width/2 + 0.5]} center style={{ pointerEvents:'none', opacity:fillP }}>
            <div style={TAG(lineColor)}>W = {width.toFixed(1)}</div>
          </Html>
          
          <Html className="r3f-html" position={[0, -height/2 - 1, 0]} center style={{ pointerEvents:'none', opacity:fillP }}>
            <div style={TAG(isCube ? '#047857' : '#6d28d9', { fontSize:'14px', textAlign:'center' })}>
              {isCube ? 'Cube' : 'Cuboid'}<br/>
              Volume = {volume.toFixed(1)}<br/>
              S.Area = {surfaceArea.toFixed(1)}
            </div>
          </Html>
        </>
      )}

      <Grid position={[0,-height/2 - 0.5,0]} args={[20,20]} cellSize={1} cellThickness={0.4} cellColor="#cfc5b2"
        sectionSize={5} sectionThickness={0.8} sectionColor="#b8a890"
        infiniteGrid fadeDistance={18} fadeStrength={1.5} />
    </group>
  )
}
