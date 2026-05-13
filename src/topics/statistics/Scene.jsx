import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Line, Grid } from '@react-three/drei'
import * as THREE from 'three'

export default function StatisticsScene({ values, autoPlay, currentStep }) {
  const [, tick] = useState(0)
  const dT = useRef(0)
  
  const v1 = values.v1 ?? 5
  const v2 = values.v2 ?? 7
  const v3 = values.v3 ?? 4
  const v4 = values.v4 ?? 8
  const v5 = values.v5 ?? 6

  const data = [v1, v2, v3, v4, v5]
  
  // Calculate Mean
  const mean = data.reduce((a, b) => a + b, 0) / data.length
  
  // Calculate Median
  const sortedData = [...data].sort((a, b) => a - b)
  const median = sortedData[2] // Middle value for 5 items
  
  // Calculate Mode
  const counts = {}
  data.forEach(v => counts[v] = (counts[v] || 0) + 1)
  let maxCount = 0
  let mode = null
  Object.entries(counts).forEach(([val, count]) => {
    if (count > maxCount) {
      maxCount = count
      mode = parseFloat(val)
    }
  })
  // If maxCount is 1, there is no mode in the strict sense (all unique)
  const hasMode = maxCount > 1

  return (
    <group position={[0, -3, 0]}> {/* Shift down to see bars growing up */}
      {/* Grid */}
      <Grid position={[0,0,-0.1]} args={[20,20]} cellSize={1} cellThickness={0.4} cellColor="#cfc5b2"
        sectionSize={5} sectionThickness={0.8} sectionColor="#b8a890"
        infiniteGrid fadeDistance={18} fadeStrength={1.5} rotation={[Math.PI/2,0,0]} />

      {/* X-Axis */}
      <Line points={[new THREE.Vector3(-6, 0, 0), new THREE.Vector3(6, 0, 0)]} color="#4a4d5e" lineWidth={2} />

      {/* Bars */}
      {data.map((val, i) => {
        const x = -4 + i * 2
        const height = val
        return (
          <group key={i} position={[x, 0, 0]}>
            {/* Bar */}
            <mesh position={[0, height / 2, 0]}>
              <boxGeometry args={[1.2, height, 0.5]} />
              <meshStandardMaterial color="#00e0c6" opacity={0.8} transparent />
            </mesh>
            {/* Label */}
            <Html className="r3f-html" position={[0, height + 0.3, 0]} center style={{ pointerEvents:'none' }}>
              <div style={{ color: '#00e0c6', fontSize: '12px', fontWeight: 'bold' }}>{val}</div>
            </Html>
            <Html className="r3f-html" position={[0, -0.5, 0]} center style={{ pointerEvents:'none' }}>
              <div style={{ color: '#4a4d5e', fontSize: '11px' }}>X{i+1}</div>
            </Html>
          </group>
        )
      })}

      {/* Mean Line */}
      <Line points={[new THREE.Vector3(-6, mean, 0.3), new THREE.Vector3(6, mean, 0.3)]} color="#ff6b6b" lineWidth={2} />
      <Html className="r3f-html" position={[6.5, mean, 0.3]} center style={{ pointerEvents:'none' }}>
        <div style={{ color: '#ff6b6b', fontSize: '11px', fontWeight: 'bold' }}>Mean: {mean.toFixed(1)}</div>
      </Html>

      {/* Median Line */}
      <Line points={[new THREE.Vector3(-6, median, 0.4), new THREE.Vector3(6, median, 0.4)]} color="#fbbf24" lineWidth={2} dashed dashScale={2} />
      <Html className="r3f-html" position={[-6.5, median, 0.4]} center style={{ pointerEvents:'none' }}>
        <div style={{ color: '#fbbf24', fontSize: '11px', fontWeight: 'bold' }}>Median: {median}</div>
      </Html>

      {/* Mode Line */}
      {hasMode && (
        <>
          <Line points={[new THREE.Vector3(-6, mode, 0.5), new THREE.Vector3(6, mode, 0.5)]} color="#a78bfa" lineWidth={2} />
          <Html className="r3f-html" position={[0, mode + 0.2, 0.5]} center style={{ pointerEvents:'none' }}>
            <div style={{ color: '#a78bfa', fontSize: '11px', fontWeight: 'bold', background: 'rgba(12,13,20,0.8)', padding: '2px 4px', borderRadius: '4px' }}>Mode: {mode}</div>
          </Html>
        </>
      )}

      {/* Info Box */}
      <Html className="r3f-html" position={[0, 8, 0]} center style={{ pointerEvents:'none' }}>
        <div style={{ background:'rgba(255,255,255,0.95)', border:'1px solid rgba(0,224,198,0.3)',
          borderRadius:'12px', padding:'10px 16px', minWidth:'220px', boxShadow:'0 4px 16px rgba(0,0,0,0.09)' }}>
          <div style={{ color:'#94a3b8', fontSize:'10px', marginBottom:'6px', fontFamily:'Fira Code,monospace', letterSpacing:'0.05em' }}>STATISTICS</div>
          <div style={{ color:'#10b981', fontSize:'12px', fontFamily:'Fira Code,monospace', lineHeight:1.6, fontWeight:700 }}>
            <div style={{ color: '#ff6b6b' }}>Mean = (Σx) / n = {mean.toFixed(2)}</div>
            <div style={{ color: '#fbbf24' }}>Median (Middle) = {median}</div>
            <div style={{ color: '#a78bfa' }}>Mode (Frequent) = {hasMode ? mode : 'None'}</div>
          </div>
        </div>
      </Html>
    </group>
  )
}
