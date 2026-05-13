import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Line, Grid } from '@react-three/drei'
import * as THREE from 'three'

const easeOut = t => 1 - Math.pow(1 - Math.min(1, t), 3)
const TAG = (c, e = {}) => ({
  background:'rgba(255,255,255,0.95)', border:`1px solid ${c}60`,
  borderRadius:'8px', padding:'5px 11px', color:c, fontSize:'12px',
  fontFamily:'Fira Code,monospace', fontWeight:700, whiteSpace:'nowrap',
  boxShadow:'0 2px 8px rgba(0,0,0,0.09)', ...e,
})

function buildLine(m, b) {
  const pts = []
  for (let x = -8; x <= 8; x += 0.25) {
    const y = m * x + b
    if (Math.abs(y) <= 11) pts.push(new THREE.Vector3(x, y, 0))
  }
  return pts
}

export default function LinearScene({ values, autoPlay, currentStep }) {
  const [, tick] = useState(0)
  const ent = useRef(0)
  const dT  = useRef(0)
  const cm  = useRef(values.m ?? 1)
  const cb  = useRef(values.b ?? 0)
  const pT  = useRef(0)

  useFrame((_, dt) => {
    ent.current = Math.min(1, ent.current + dt * 0.6)
    if (autoPlay) dT.current += dt * 0.35
    pT.current += dt
    const tm = autoPlay ? Math.sin(dT.current * 0.75) * 3.5 : (values.m ?? 1)
    const tb = autoPlay ? Math.sin(dT.current * 0.5) * 4.5 : (values.b ?? 0)
    cm.current += (tm - cm.current) * 0.06
    cb.current += (tb - cb.current) * 0.06
    tick(n => n + 1)
  })

  const t     = ent.current
  const lineP = easeOut(Math.min(1, t * 1.5))
  const labelP= easeOut(Math.min(1, Math.max(0, t * 2 - 1.2)))
  const pulse = 1 + Math.abs(Math.sin(pT.current * 2.2)) * 0.4

  const m = cm.current, bVal = cb.current
  const allPts = buildLine(m, bVal)
  const half = Math.round(allPts.length / 2)
  const take = Math.round(half * lineP)
  const visPts = take > 0 ? allPts.slice(half - take, half + take) : []

  const slopeBase = [new THREE.Vector3(1, bVal, 0.02), new THREE.Vector3(3, bVal, 0.02)]
  const slopeRise = [new THREE.Vector3(3, bVal, 0.02), new THREE.Vector3(3, m*3+bVal, 0.02)]
  const lineColor = m > 0 ? '#16a34a' : m < 0 ? '#dc2626' : '#64748b'

  // Control visibility based on proof steps — highly progressive like Triangle
  let showIntercept = true
  let showSlope = true

  if (currentStep !== undefined) {
    if (currentStep === 0) {
      showIntercept = false; showSlope = false;
    } else if (currentStep === 1) {
      showIntercept = true; showSlope = false; // Show intercept dot first
    } else if (currentStep >= 2) {
      showIntercept = true; showSlope = true; // Then show slope triangle
    }
  }

  return (
    <group>
      <Line points={[new THREE.Vector3(-8,0,0), new THREE.Vector3(8,0,0)]} color="#b8a890" lineWidth={1.5} />
      <Line points={[new THREE.Vector3(0,-10,0), new THREE.Vector3(0,10,0)]} color="#b8a890" lineWidth={1.5} />

      {/* Line draws from centre */}
      {visPts.length > 1 && <Line points={visPts} color={lineColor} lineWidth={3} />}

      {/* Slope triangle */}
      {showSlope && labelP > 0.3 && Math.abs(m) > 0.05 && Math.abs(bVal) < 9 && (
        <>
          <Line points={slopeBase} color="#f59e0b" lineWidth={2} transparent opacity={0.85} />
          <Line points={slopeRise} color="#ec4899" lineWidth={2} transparent opacity={0.85} />
          <Html className="r3f-html" position={[2, bVal-0.42, 0]} center style={{ pointerEvents:'none', opacity:labelP }}>
            <div style={TAG('#d97706', { fontSize:'10px' })}>run = 2</div>
          </Html>
          <Html className="r3f-html" position={[3.7, m*2+bVal, 0]} center style={{ pointerEvents:'none', opacity:labelP }}>
            <div style={TAG('#be185d', { fontSize:'10px' })}>rise = {(m*2).toFixed(1)}</div>
          </Html>
        </>
      )}

      {/* y-intercept dot — pulses */}
      {showIntercept && lineP > 0.1 && (
        <mesh position={[0, bVal, 0.05]} scale={[pulse*0.11, pulse*0.11, pulse*0.11]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.4} />
        </mesh>
      )}

      {showIntercept && labelP > 0.2 && (
        <>
          <Html className="r3f-html" position={[0.32, bVal+0.52, 0]} center style={{ pointerEvents:'none', opacity:labelP }}>
            <div style={TAG('#d97706', { fontSize:'11px', fontWeight:500 })}>y-int = {bVal.toFixed(1)}</div>
          </Html>
          <Html className="r3f-html" position={[4.5, 8.5, 0]} center style={{ pointerEvents:'none', opacity:labelP }}>
            <div style={TAG(lineColor, { fontSize:'14px' })}>y = {m.toFixed(1)}x {bVal>=0?'+':''}{bVal.toFixed(1)}</div>
          </Html>
          <Html className="r3f-html" position={[-5, 8.5, 0]} center style={{ pointerEvents:'none', opacity:labelP }}>
            <div style={TAG('#6366f1', { fontSize:'11px', fontWeight:500 })}>
              slope = {m>0?'+':''}{m.toFixed(2)} {m>0?'↗':m<0?'↘':'→'}
            </div>
          </Html>
        </>
      )}

      <Grid position={[0,0,-0.05]} args={[20,20]} cellSize={1} cellThickness={0.4} cellColor="#cfc5b2"
        sectionSize={5} sectionThickness={0.8} sectionColor="#b8a890"
        infiniteGrid fadeDistance={20} fadeStrength={2} rotation={[Math.PI/2,0,0]} />
    </group>
  )
}
