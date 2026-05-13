import { useState, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Grid } from '@react-three/drei'
import * as THREE from 'three'

export default function CountingScene({ values, autoPlay }) {
  const [targetCount, setTargetCount] = useState(() => Math.floor(Math.random() * 5) + 1)
  const [pickedCount, setPickedCount] = useState(0)
  const [apples, setApples] = useState([])

  // Generate random positions for apples on the tree
  useEffect(() => {
    const newApples = []
    for (let i = 0; i < targetCount; i++) {
      // Random position within a sphere area for leaves
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 0.5 // Upper hemisphere
      const r = 1 + Math.random() * 1 // Radius between 1 and 2

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = 3 + r * Math.cos(phi) // Shift up to tree top
      const z = r * Math.sin(phi) * Math.sin(theta)

      newApples.push({ id: i, position: [x, y, z], picked: false, currentPos: [x, y, z] })
    }
    setApples(newApples)
    setPickedCount(0)
  }, [targetCount])

  const basketPos = [0, -2, 1.5]

  useFrame((_, dt) => {
    // Animate picked apples towards the basket
    setApples(prev => prev.map(apple => {
      if (apple.picked) {
        const [cx, cy, cz] = apple.currentPos
        const [tx, ty, tz] = basketPos
        // Move towards basket
        const dx = tx - cx
        const dy = ty - cy
        const dz = tz - cz
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist > 0.1) {
          return {
            ...apple,
            currentPos: [
              cx + dx * dt * 3,
              cy + dy * dt * 3,
              cz + dz * dt * 3
            ]
          }
        }
      }
      return apple
    }))
  })

  const handlePick = (id) => {
    setApples(prev => prev.map(apple => {
      if (apple.id === id && !apple.picked) {
        setPickedCount(c => c + 1)
        return { ...apple, picked: true }
      }
      return apple
    }))
  }

  const handleReset = () => {
    let next = Math.floor(Math.random() * 5) + 1
    // Ensure it doesn't repeat immediately
    while (next === targetCount) {
      next = Math.floor(Math.random() * 5) + 1
    }
    setTargetCount(next)
  }

  return (
    <group position={[0, -1, 0]}>
      {/* Grid */}
      <Grid position={[0, -2.5, -0.1]} args={[20, 20]} cellSize={1} cellThickness={0.4} cellColor="#cfc5b2"
        sectionSize={5} sectionThickness={0.8} sectionColor="#b8a890"
        infiniteGrid fadeDistance={18} fadeStrength={1.5} rotation={[Math.PI / 2, 0, 0]} />

      {/* Tree Trunk */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 3, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Tree Leaves */}
      <mesh position={[0, 3, 0]}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshStandardMaterial color="#228B22" opacity={0.9} transparent />
      </mesh>

      {/* Basket */}
      <mesh position={basketPos}>
        <boxGeometry args={[1.5, 1, 1.5]} />
        <meshStandardMaterial color="#CD853F" />
      </mesh>

      {/* Apples */}
      {apples.map((apple) => (
        <mesh
          key={apple.id}
          position={apple.currentPos}
          scale={[0.15, 0.15, 0.15]}
          onClick={() => handlePick(apple.id)}
          style={{ cursor: apple.picked ? 'default' : 'pointer' }}
        >
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color="#FF0000" />
        </mesh>
      ))}

      {/* UI Overlay */}
      <Html className="r3f-html" position={[0, 6, 0]} center style={{ pointerEvents: 'none' }}>
        <div style={{
          background: 'rgba(255,255,255,0.95)', border: '2px solid #fbbf24',
          borderRadius: '16px', padding: '12px 24px', textAlign: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
        }}>
          <div style={{ color: '#ffb703', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>CAN YOU COUNT?</div>
          <div style={{ color: '#1f2937', fontSize: '24px', fontWeight: 'bold' }}>
            {pickedCount} / {targetCount}
          </div>
          {pickedCount === targetCount && (
            <div style={{ color: '#10b981', fontSize: '16px', fontWeight: 'bold', marginTop: '4px' }}>
              Great Job! 🎉
            </div>
          )}
        </div>
      </Html>

      {/* Play Again Button */}
      {pickedCount === targetCount && (
        <Html className="r3f-html" position={[0, -2.5, 2.5]} center>
          <button
            onClick={handleReset}
            style={{
              background: '#00e0c6', color: '#0c0d14', border: 'none',
              borderRadius: '20px', padding: '8px 16px', fontWeight: 'bold',
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,224,198,0.3)',
              fontFamily: 'sans-serif', fontSize: '14px'
            }}
          >
            Play Again!
          </button>
        </Html>
      )}
    </group>
  )
}
