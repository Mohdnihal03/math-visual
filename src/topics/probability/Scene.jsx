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

export default function ProbabilityScene({ values, autoPlay, currentStep }) {
  const [, tick] = useState(0)
  const ent  = useRef(0)
  const pT   = useRef(0)
  
  const [mode, setMode] = useState('coin') // 'coin' or 'die'
  const [results, setResults] = useState({ heads: 0, tails: 0, d1:0, d2:0, d3:0, d4:0, d5:0, d6:0, total: 0 })
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentResult, setCurrentResult] = useState(null)

  const objectRotation = useRef(new THREE.Euler())
  const objectPosition = useRef(new THREE.Vector3(0, 0, 0))
  const animationTime = useRef(0)
  const targetRotation = useRef(new THREE.Euler())
  const objectRef = useRef()

  useFrame((_, dt) => {
    ent.current = Math.min(1, ent.current + dt * 0.6)
    pT.current += dt
    
    if (isAnimating) {
      animationTime.current += dt
      const t = animationTime.current / 2 // 2 second animation
      
      if (t < 1) {
        if (mode === 'coin') {
          // Coin flip animation: goes up and spins
          const height = Math.sin(t * Math.PI) * 3
          objectPosition.current.y = height
          objectRotation.current.x = t * Math.PI * 10
          objectRotation.current.z = t * Math.PI * 2
        } else {
          // Die roll animation: tumbles around
          const height = Math.sin(t * Math.PI) * 2
          objectPosition.current.y = height
          objectPosition.current.x = Math.sin(t * Math.PI * 2) * 2
          objectRotation.current.x = t * Math.PI * 8
          objectRotation.current.y = t * Math.PI * 6
          objectRotation.current.z = t * Math.PI * 4
        }
      } else {
        // Land on target
        setIsAnimating(false)
        objectPosition.current.set(0, 0, 0)
        objectRotation.current.copy(targetRotation.current)
        
        // Add to results
        setResults(prev => {
          const key = mode === 'coin' ? currentResult.toLowerCase() : `d${currentResult}`
          return {
            ...prev,
            [key]: prev[key] + 1,
            total: prev.total + 1
          }
        })
      }
    }
    
    if (objectRef.current) {
      objectRef.current.position.copy(objectPosition.current)
      objectRef.current.rotation.copy(objectRotation.current)
    }
    
    tick(n => n + 1)
  })

  const t      = ent.current
  const fillP  = easeOut(Math.min(1, Math.max(0, t * 2 - 1.0)))

  const handleAction = () => {
    if (isAnimating) return
    setIsAnimating(true)
    animationTime.current = 0
    
    if (mode === 'coin') {
      const isHeads = Math.random() > 0.5
      setCurrentResult(isHeads ? 'Heads' : 'Tails')
      // Target rotation for coin: Heads is top face (0,0,0), Tails is bottom face (PI,0,0)
      targetRotation.current.set(isHeads ? 0 : Math.PI, 0, 0)
    } else {
      const dieValue = Math.floor(Math.random() * 6) + 1
      setCurrentResult(`${dieValue}`)
      
      // Target rotations to make specific faces look up
      const rots = [
        [0, 0, 0], // 1 (Top)
        [Math.PI, 0, 0], // 2 (Bottom)
        [0, 0, Math.PI / 2], // 3 (Left)
        [0, 0, -Math.PI / 2], // 4 (Right)
        [-Math.PI / 2, 0, 0], // 5 (Front)
        [Math.PI / 2, 0, 0], // 6 (Back)
      ]
      const r = rots[dieValue - 1]
      targetRotation.current.set(r[0], r[1], r[2])
    }
  }

  const switchMode = (m) => {
    if (isAnimating) return
    setMode(m)
    setCurrentResult(null)
    objectRotation.current.set(0, 0, 0)
    objectPosition.current.set(0, 0, 0)
  }

  return (
    <group position={[0, 0, 0]}>
      {/* Mode Switcher */}
      {fillP > 0.5 && (
        <Html position={[0, 3.5, 0]} center>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => switchMode('coin')}
              style={{
                background: mode === 'coin' ? '#4f46e5' : '#e5e7eb',
                color: mode === 'coin' ? 'white' : '#374151',
                border: 'none', borderRadius: '20px', padding: '8px 16px', cursor: 'pointer'
              }}
            >
              Coin Flip
            </button>
            <button 
              onClick={() => switchMode('die')}
              style={{
                background: mode === 'die' ? '#4f46e5' : '#e5e7eb',
                color: mode === 'die' ? 'white' : '#374151',
                border: 'none', borderRadius: '20px', padding: '8px 16px', cursor: 'pointer'
              }}
            >
              Die Roll
            </button>
          </div>
        </Html>
      )}

      {/* 3D Object (Coin or Die) */}
      <group 
        ref={objectRef}
        scale={[fillP, fillP, fillP]}
      >
        {mode === 'coin' ? (
          <group>
            <mesh>
              <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
              <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.1} />
            </mesh>
            {/* Heads side (Top) - Gold */}
            <mesh position={[0, 0.101, 0]} rotation={[-Math.PI/2, 0, 0]}>
              <circleGeometry args={[1.4, 32]} />
              <meshStandardMaterial color="#fef08a" />
              <Html position={[0, 0, 0]} transform occlude><div style={{fontSize:'12px',fontWeight:'bold',color:'#78350f'}}>HEADS</div></Html>
            </mesh>
            {/* Tails side (Bottom) - Silver */}
            <mesh position={[0, -0.101, 0]} rotation={[Math.PI/2, 0, 0]}>
              <circleGeometry args={[1.4, 32]} />
              <meshStandardMaterial color="#e5e7eb" />
              <Html position={[0, 0, 0]} transform occlude><div style={{fontSize:'12px',fontWeight:'bold',color:'#374151'}}>TAILS</div></Html>
            </mesh>
          </group>
        ) : (
          <mesh>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.05} />
            
            {/* Numbers on faces with occlusion */}
            <Html position={[0, 0.76, 0]} rotation={[-Math.PI/2, 0, 0]} transform occlude><div style={{fontSize:'16px',fontWeight:'bold'}}>1</div></Html>
            <Html position={[0, -0.76, 0]} rotation={[Math.PI/2, 0, 0]} transform occlude><div style={{fontSize:'16px',fontWeight:'bold'}}>2</div></Html>
            <Html position={[-0.76, 0, 0]} rotation={[0, -Math.PI/2, 0]} transform occlude><div style={{fontSize:'16px',fontWeight:'bold'}}>3</div></Html>
            <Html position={[0.76, 0, 0]} rotation={[0, Math.PI/2, 0]} transform occlude><div style={{fontSize:'16px',fontWeight:'bold'}}>4</div></Html>
            <Html position={[0, 0, 0.76]} transform occlude><div style={{fontSize:'16px',fontWeight:'bold'}}>5</div></Html>
            <Html position={[0, 0, -0.76]} rotation={[0, Math.PI, 0]} transform occlude><div style={{fontSize:'16px',fontWeight:'bold'}}>6</div></Html>
          </mesh>
        )}
      </group>

      {/* Action Button */}
      {fillP > 0.5 && (
        <Html position={[0, -3, 0]} center>
          <button 
            onClick={handleAction}
            disabled={isAnimating}
            style={{
              background: isAnimating ? '#9ca3af' : '#10b981',
              color: 'white',
              border: 'none', borderRadius: '8px', padding: '10px 24px',
              fontSize: '16px', fontWeight: 'bold', cursor: isAnimating ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            {isAnimating ? 'Animating...' : mode === 'coin' ? 'Flip Coin' : 'Roll Die'}
          </button>
        </Html>
      )}

      {/* Results Display */}
      {fillP > 0.5 && (
        <Html position={[0, -1.5, 0]} center>
          <div style={TAG('#374151', { fontSize: '14px' })}>
            {currentResult ? `Landed on: ${currentResult}` : 'Try it!'}
          </div>
        </Html>
      )}

      {/* Stats Panel */}
      {fillP > 0.5 && (
        <Html position={[-4, 0, 0]} center>
          <div style={TAG('#374151', { textAlign: 'left' })}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Stats (Total: {results.total}):</div>
            {mode === 'coin' ? (
              <>
                <div>Heads: {results.heads} ({results.total ? ((results.heads/results.total)*100).toFixed(0) : 0}%)</div>
                <div>Tails: {results.tails} ({results.total ? ((results.tails/results.total)*100).toFixed(0) : 0}%)</div>
              </>
            ) : (
              <>
                <div>1: {results.d1}</div>
                <div>2: {results.d2}</div>
                <div>3: {results.d3}</div>
                <div>4: {results.d4}</div>
                <div>5: {results.d5}</div>
                <div>6: {results.d6}</div>
              </>
            )}
          </div>
        </Html>
      )}

      <Grid position={[0,0,-0.1]} args={[20,20]} cellSize={1} cellThickness={0.4} cellColor="#cfc5b2"
        sectionSize={5} sectionThickness={0.8} sectionColor="#b8a890"
        infiniteGrid fadeDistance={18} fadeStrength={1.5} rotation={[Math.PI/2,0,0]} />
    </group>
  )
}
