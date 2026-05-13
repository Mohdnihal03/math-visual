import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

const fib = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

export default function FibonacciScene({ values, autoPlay, currentStep }) {
  const groupRef = useRef()

  useFrame((state, delta) => {
    if (autoPlay) {
      groupRef.current.rotation.y += delta * 0.5
    }
  })

  // Override number of blocks based on proof steps
  let n = Math.floor(values.n || 6)
  if (currentStep !== undefined) {
    // Step 0 -> 2 blocks, Step 1 -> 3 blocks, Step 2 -> 4 blocks, etc.
    n = Math.min(currentStep + 2, fib.length)
  }

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {fib.slice(0, n).map((val, i) => {
        const angle = i * 0.5
        const radius = i * 0.8
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = val / 2

        return (
          <group key={i} position={[x, y, z]}>
            <mesh>
              <boxGeometry args={[val * 0.2, val, val * 0.2]} />
              <meshStandardMaterial 
                color={i % 2 === 0 ? '#00e0c6' : '#a78bfa'} 
                emissive={i % 2 === 0 ? '#00e0c6' : '#a78bfa'}
                emissiveIntensity={0.2}
                transparent
                opacity={0.8}
              />
            </mesh>
            <Html className="r3f-html" position={[0, val / 2 + 0.3, 0]} center>
              <div style={{
                background: 'rgba(8, 9, 13, 0.8)',
                border: `1px solid ${i % 2 === 0 ? '#00e0c6' : '#a78bfa'}`,
                borderRadius: '4px',
                padding: '2px 6px',
                color: '#e8e6e3',
                fontSize: '10px',
                fontFamily: 'JetBrains Mono, monospace'
              }}>
                {val}
              </div>
            </Html>
          </group>
        )
      })}
    </group>
  )
}
