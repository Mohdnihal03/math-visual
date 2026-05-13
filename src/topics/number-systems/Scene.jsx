import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Line, Grid } from '@react-three/drei'
import * as THREE from 'three'

export default function NumberSystemsScene({ values, autoPlay }) {
  const [, tick] = useState(0)
  const dT = useRef(0)
  const cSteps = useRef(values.steps ?? 5)

  useFrame((_, dt) => {
    if (autoPlay) dT.current += dt * 0.5
    const ts = autoPlay ? 2 + Math.floor(Math.abs(Math.sin(dT.current)) * 8) : (values.steps ?? 5)
    cSteps.current = ts
    tick(n => n + 1)
  })

  const steps = cSteps.current
  
  // Generate points for the square root spiral
  const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(2, 0, 0)] // Scale by 2 for visibility
  for (let i = 2; i <= steps + 1; i++) {
    const prevPoint = points[i - 1]
    const dist = Math.sqrt(prevPoint.x * prevPoint.x + prevPoint.y * prevPoint.y)
    // Perpendicular direction (counter-clockwise)
    const perpX = -prevPoint.y / dist
    const perpY = prevPoint.x / dist
    // We want the step length to be 2 (scaled unit)
    const newPoint = new THREE.Vector3(prevPoint.x + perpX * 2, prevPoint.y + perpY * 2, 0)
    points.push(newPoint)
  }

  // Generate arcs to number line
  const arcs = []
  for (let i = 2; i <= steps + 1; i++) {
    const p = points[i]
    if (!p) continue
    const radius = Math.sqrt(p.x * p.x + p.y * p.y)
    const startAngle = Math.atan2(p.y, p.x)
    const arcPoints = []
    for (let j = 0; j <= 20; j++) {
      const a = startAngle * (1 - j / 20)
      arcPoints.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0))
    }
    arcs.push(arcPoints)
  }

  return (
    <group position={[-2, -2, 0]}> {/* Shift to center the spiral */}
      {/* Grid */}
      <Grid position={[0,0,-0.1]} args={[20,20]} cellSize={1} cellThickness={0.4} cellColor="#cfc5b2"
        sectionSize={5} sectionThickness={0.8} sectionColor="#b8a890"
        infiniteGrid fadeDistance={18} fadeStrength={1.5} rotation={[Math.PI/2,0,0]} />

      {/* Number Line (X-Axis) */}
      <Line points={[new THREE.Vector3(-1, 0, 0), new THREE.Vector3(12, 0, 0)]} color="#4a4d5e" lineWidth={2} />
      
      {/* Ticks on Number Line */}
      {[0, 1, 2, 3, 4, 5].map((val) => {
        const x = val * 2 // Scaled
        return (
          <group key={val}>
            <Line points={[new THREE.Vector3(x, -0.2, 0), new THREE.Vector3(x, 0.2, 0)]} color="#4a4d5e" lineWidth={2} />
            <Html className="r3f-html" position={[x, -0.5, 0]} center style={{ pointerEvents:'none' }}>
              <div style={{ color: '#4a4d5e', fontSize: '12px', fontFamily: 'Fira Code,monospace' }}>{val}</div>
            </Html>
          </group>
        )
      })}

      {/* Spiral Triangles */}
      {points.slice(1).map((p, i) => {
        if (i === 0) return null
        const prevP = points[i]
        return (
          <group key={i}>
            {/* Hypotenuse */}
            <Line points={[points[0], p]} color="#ff6b6b" lineWidth={1.5} />
            {/* Outer edge (length 1) */}
            <Line points={[prevP, p]} color="#00e0c6" lineWidth={2} />
          </group>
        )
      })}

      {/* Arcs to Number Line */}
      {arcs.map((arc, i) => (
        <Line key={i} points={arc} color="#a78bfa" lineWidth={1} dashed dashScale={2} />
      ))}

      {/* Dots on spiral vertices */}
      {points.map((v, i) => (
        <mesh key={i} position={[v.x, v.y, 0.05]} scale={[0.06, 0.06, 0.06]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color={i === 0 ? '#ffb703' : '#ff6b6b'} />
        </mesh>
      ))}

      {/* Dots on Number Line (Projections) */}
      {points.slice(2).map((p, i) => {
        const radius = Math.sqrt(p.x * p.x + p.y * p.y)
        return (
          <mesh key={i} position={[radius, 0, 0.05]} scale={[0.05, 0.05, 0.05]}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial color="#a78bfa" />
          </mesh>
        )
      })}

      {/* Labels for √n */}
      {points.slice(2).map((p, i) => {
        const n = i + 2
        return (
          <Html className="r3f-html" key={i} position={[p.x + 0.3, p.y + 0.3, 0]} center style={{ pointerEvents:'none' }}>
            <div style={{ color: '#00e0c6', fontSize: '11px', fontWeight: 'bold' }}>√{n}</div>
          </Html>
        )
      })}

      {/* Info Box */}
      <Html className="r3f-html" position={[8, 6, 0]} center style={{ pointerEvents:'none' }}>
        <div style={{ background:'rgba(255,255,255,0.95)', border:'1px solid rgba(0,224,198,0.3)',
          borderRadius:'12px', padding:'10px 16px', minWidth:'180px', boxShadow:'0 4px 16px rgba(0,0,0,0.09)' }}>
          <div style={{ color:'#94a3b8', fontSize:'10px', marginBottom:'6px', fontFamily:'Fira Code,monospace', letterSpacing:'0.05em' }}>NUMBER SYSTEM</div>
          <div style={{ color:'#10b981', fontSize:'13px', fontFamily:'Fira Code,monospace', lineHeight:1.9, fontWeight:700 }}>
            <div style={{ color: '#ff6b6b' }}>Steps: {steps}</div>
            <div style={{ color: '#00e0c6' }}>Max Value: √{steps + 1}</div>
          </div>
        </div>
      </Html>
    </group>
  )
}
