import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Line, Grid } from '@react-three/drei'
import * as THREE from 'three'

export default function CirclesScene({ values, autoPlay, currentStep }) {
  const [, tick] = useState(0)
  const dT = useRef(0)
  const cArcAngle = useRef(values.arcAngle ?? 90)
  const cPAngle = useRef(values.pAngle ?? 180)

  useFrame((_, dt) => {
    if (autoPlay) dT.current += dt * 0.5
    const ta = autoPlay ? 60 + Math.abs(Math.sin(dT.current)) * 120 : (values.arcAngle ?? 90)
    const tp = autoPlay ? 180 + Math.sin(dT.current * 0.7) * 45 : (values.pAngle ?? 180)
    cArcAngle.current += (ta - cArcAngle.current) * 0.1
    cPAngle.current += (tp - cPAngle.current) * 0.1
    tick(n => n + 1)
  })

  const radius = 4
  const arcAngle = (cArcAngle.current * Math.PI) / 180
  const pAngle = (cPAngle.current * Math.PI) / 180

  // Points
  const O = new THREE.Vector3(0, 0, 0)
  const A = new THREE.Vector3(Math.cos(-arcAngle / 2) * radius, Math.sin(-arcAngle / 2) * radius, 0)
  const B = new THREE.Vector3(Math.cos(arcAngle / 2) * radius, Math.sin(arcAngle / 2) * radius, 0)
  const P = new THREE.Vector3(Math.cos(pAngle) * radius, Math.sin(pAngle) * radius, 0)
  const Q = new THREE.Vector3(-Math.cos(pAngle) * radius, -Math.sin(pAngle) * radius, 0)

  // Circle points for drawing
  const circlePoints = []
  for (let i = 0; i <= 100; i++) {
    const a = (i / 100) * Math.PI * 2
    circlePoints.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0))
  }

  // Step visibility logic
  const showPOQ = currentStep === 0 || currentStep === undefined
  const highlightAPO = currentStep === 1
  const showAOQ = currentStep === 2
  const showBPO = currentStep === 3
  const showFull = currentStep === 4 || currentStep === undefined

  return (
    <group>
      {/* Grid */}
      <Grid position={[0, 0, -0.1]} args={[20, 20]} cellSize={1} cellThickness={0.4} cellColor="#cfc5b2"
        sectionSize={5} sectionThickness={0.8} sectionColor="#b8a890"
        infiniteGrid fadeDistance={18} fadeStrength={1.5} rotation={[Math.PI / 2, 0, 0]} />

      {/* Circle */}
      <Line points={circlePoints} color="#4a4d5e" lineWidth={1.5} />

      {/* Central Angle Lines */}
      <Line points={[A, O, B]} color={showFull || showAOQ ? "#ff6b6b" : "#4a4d5e"} lineWidth={showFull || showAOQ ? 2 : 1} />

      {/* Inscribed Angle Lines */}
      <Line points={[A, P, B]} color={showFull || highlightAPO ? "#00e0c6" : "#4a4d5e"} lineWidth={showFull || highlightAPO ? 2 : 1} />

      {/* Step 1: Line POQ */}
      {showPOQ && (
        <Line points={[P, O, Q]} color="#a78bfa" lineWidth={2} dashed dashScale={2} />
      )}

      {/* Step 2: Highlight Triangle APO */}
      {highlightAPO && (
        <>
          <Line points={[A, P, O, A]} color="#ffb703" lineWidth={2.5} />
        </>
      )}

      {/* Step 3: Exterior angle AOQ */}
      {showAOQ && (
        <>
          <Line points={[A, O, Q]} color="#ff6b6b" lineWidth={2} />
          <Line points={[P, O]} color="#a78bfa" lineWidth={1.5} />
        </>
      )}

      {/* Step 4: Exterior angle BOQ and BPO */}
      {showBPO && (
        <>
          <Line points={[B, O, Q]} color="#ff6b6b" lineWidth={2} />
          <Line points={[B, P, O, B]} color="#ffb703" lineWidth={2} />
        </>
      )}

      {/* Dots */}
      {[O, A, B, P].map((v, i) => (
        <mesh key={i} position={[v.x, v.y, 0.05]} scale={[0.08, 0.08, 0.08]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color={i === 0 ? '#ffb703' : i === 3 ? '#00e0c6' : '#ff6b6b'} />
        </mesh>
      ))}

      {showPOQ && (
        <mesh position={[Q.x, Q.y, 0.05]} scale={[0.06, 0.06, 0.06]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color="#a78bfa" />
        </mesh>
      )}

      {/* Labels */}
      <Html className="r3f-html" position={[O.x, O.y - 0.3, 0]} center style={{ pointerEvents: 'none' }}>
        <div style={{ color: '#ffb703', fontWeight: 'bold' }}>O</div>
      </Html>
      <Html className="r3f-html" position={[A.x + 0.3, A.y, 0]} center style={{ pointerEvents: 'none' }}>
        <div style={{ color: '#ff6b6b', fontWeight: 'bold' }}>A</div>
      </Html>
      <Html className="r3f-html" position={[B.x + 0.3, B.y, 0]} center style={{ pointerEvents: 'none' }}>
        <div style={{ color: '#ff6b6b', fontWeight: 'bold' }}>B</div>
      </Html>
      <Html className="r3f-html" position={[P.x - 0.3, P.y, 0]} center style={{ pointerEvents: 'none' }}>
        <div style={{ color: '#00e0c6', fontWeight: 'bold' }}>P</div>
      </Html>
      {showPOQ && (
        <Html className="r3f-html" position={[Q.x - 0.3, Q.y, 0]} center style={{ pointerEvents: 'none' }}>
          <div style={{ color: '#a78bfa', fontWeight: 'bold' }}>Q</div>
        </Html>
      )}

      {/* Info Box */}
      <Html className="r3f-html" position={[-6, 0, 0]} center style={{ pointerEvents: 'none' }}>
        <div style={{
          background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,224,198,0.3)',
          borderRadius: '12px', padding: '10px 16px', minWidth: '200px', boxShadow: '0 4px 16px rgba(0,0,0,0.09)'
        }}>
          <div style={{ color: '#94a3b8', fontSize: '10px', marginBottom: '6px', fontFamily: 'Fira Code,monospace', letterSpacing: '0.05em' }}>CIRCLE THEOREM</div>
          <div style={{ color: '#10b981', fontSize: '13px', fontFamily: 'Fira Code,monospace', lineHeight: 1.9, fontWeight: 700 }}>
            <div style={{ color: '#ff6b6b' }}>∠AOB = {cArcAngle.current.toFixed(1)}°</div>
            <div style={{ color: '#00e0c6' }}>∠APB = {(cArcAngle.current / 2).toFixed(1)}°</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>∠AOB = 2 × ∠APB</div>
          </div>
        </div>
      </Html>
    </group>
  )
}
