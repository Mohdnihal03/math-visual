import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line, Html } from '@react-three/drei'
import * as THREE from 'three'

export default function IntegrationScene({ values, autoPlay, currentStep }) {
  const groupRef = useRef()

  useFrame((state, delta) => {
    if (autoPlay) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  // Determine number of rectangles and visibility based on proof steps or controls
  let rects = Math.floor(values.rectangles || 10)
  let rectOpacity = 0.4
  let showLabel = true

  // If we are stepping through the proof, override the controls!
  if (currentStep !== undefined) {
    if (currentStep === 0) {
      rects = 4 // Few rectangles to show "divide interval"
      rectOpacity = 0.2
      showLabel = false
    } else if (currentStep === 1) {
      rects = 8 // More rectangles
      rectOpacity = 0.4
      showLabel = false
    } else if (currentStep === 2) {
      rects = 12
      rectOpacity = 0.5
      showLabel = true // Show area sum
    } else if (currentStep === 3) {
      rects = 50 // Many rectangles to represent the limit
      rectOpacity = 0.6
      showLabel = true
    }
  }

  const pts = []
  const width = 10
  const startX = -5
  for (let x = startX; x <= startX + width; x += 0.1) {
    const y = Math.sin(x) + 2
    pts.push(new THREE.Vector3(x, y, 0))
  }

  const rectWidth = width / rects
  const rectangles = []
  let totalArea = 0
  for (let i = 0; i < rects; i++) {
    const x = startX + i * rectWidth + rectWidth / 2
    const y = Math.sin(x) + 2 // Midpoint rule
    rectangles.push({ x, y, width: rectWidth })
    totalArea += y * rectWidth
  }

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* X Axis */}
      <Line points={[new THREE.Vector3(-6, 0, 0), new THREE.Vector3(6, 0, 0)]} color="#4a4d5e" lineWidth={1} />
      
      {/* The Curve */}
      <Line points={pts} color="#00e0c6" lineWidth={3} />
      
      {/* Riemann Sum Rectangles */}
      {rectangles.map((r, i) => (
        <mesh key={i} position={[r.x, r.y / 2, 0]}>
          <boxGeometry args={[r.width * 0.95, r.y, 0.2]} />
          <meshStandardMaterial 
            color="#ff6b6b" 
            opacity={rectOpacity} 
            transparent 
            emissive="#ff6b6b"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}

      {/* Label for Area */}
      {showLabel && (
        <Html className="r3f-html" position={[0, 4, 0]} center>
          <div style={{
            background: 'rgba(8, 9, 13, 0.85)',
            border: '1px solid #ff6b6b',
            borderRadius: '6px',
            padding: '4px 10px',
            color: '#e8e6e3',
            fontSize: '12px',
            fontFamily: 'JetBrains Mono, monospace',
            whiteSpace: 'nowrap',
            boxShadow: '0 0 20px rgba(255, 107, 107, 0.2)'
          }}>
            Approx Area: <span style={{ color: '#ff6b6b' }}>{totalArea.toFixed(3)}</span>
          </div>
        </Html>
      )}
    </group>
  )
}
