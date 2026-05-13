import { useState, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Line, Grid } from '@react-three/drei'
import * as THREE from 'three'

const easeOut = t => 1 - Math.pow(1 - Math.min(1, t), 3)
const TAG = (c, e = {}) => ({
  background:'rgba(255,255,255,0.95)', border:`1px solid ${c}60`,
  borderRadius:'7px', padding:'4px 10px', color:c, fontSize:'12px',
  fontFamily:'Fira Code,monospace', fontWeight:700, whiteSpace:'nowrap',
  boxShadow:'0 2px 8px rgba(0,0,0,0.09)', ...e,
})

// f(x) = x²
const FULL_CURVE = (() => {
  const pts = []
  for (let x = -5; x <= 5; x += 0.05) {
    const y = x * x
    if (y <= 16) pts.push(new THREE.Vector3(x, y, 0))
  }
  return pts
})()

export default function DerivativesScene({ values, autoPlay, currentStep }) {
  const [, tick] = useState(0)
  const ent = useRef(0)
  const dT  = useRef(0)
  const cx  = useRef(values.x ?? 1.5)
  const pT  = useRef(0)

  useFrame((_, dt) => {
    ent.current = Math.min(1, ent.current + dt * 0.55)
    if (autoPlay) dT.current += dt * 0.5
    pT.current += dt
    const tx = autoPlay ? Math.sin(dT.current * 0.72) * 3.8 : (values.x ?? 1.5)
    cx.current += (tx - cx.current) * 0.08
    tick(n => n + 1)
  })

  const t      = ent.current
  const curveP = easeOut(Math.min(1, t * 1.6))
  const labelP = easeOut(Math.min(1, Math.max(0, t * 2 - 1.1)))
  const pulse  = 1 + Math.abs(Math.sin(pT.current * 3)) * 0.4

  const xVal = cx.current
  const yVal = xVal * xVal
  const slope = 2 * xVal

  // Curve draws left to right
  const visCurve = FULL_CURVE.slice(0, Math.max(2, Math.round(FULL_CURVE.length * curveP)))

  // Tangent line
  const tRange = 2.5
  const tx1 = xVal - tRange, ty1 = slope*(tx1-xVal)+yVal
  const tx2 = xVal + tRange, ty2 = slope*(tx2-xVal)+yVal
  const tangentPts = [
    new THREE.Vector3(tx1, Math.max(-1,Math.min(16,ty1)), 0.02),
    new THREE.Vector3(tx2, Math.max(-1,Math.min(16,ty2)), 0.02),
  ]

  // Only show tangent line on step 1 or later of the proof
  const showTangent = currentStep === undefined || currentStep >= 1

  return (
    <group position={[0, -4, 0]}>
      <Line points={[new THREE.Vector3(-6,0,0), new THREE.Vector3(6,0,0)]} color="#b8a890" lineWidth={1.5} />
      <Line points={[new THREE.Vector3(0,-1,0), new THREE.Vector3(0,16,0)]} color="#b8a890" lineWidth={1.5} />

      {/* Curve draws in */}
      {visCurve.length > 1 && <Line points={visCurve} color="#db2777" lineWidth={3} />}

      {/* Tangent line */}
      {showTangent && curveP > 0.65 && <Line points={tangentPts} color="#d97706" lineWidth={2.5} transparent opacity={curveP} />}

      {/* Drop line */}
      {showTangent && curveP > 0.75 && (
        <Line points={[new THREE.Vector3(xVal,yVal,0.01), new THREE.Vector3(xVal,0,0.01)]}
          color="#94a3b8" lineWidth={1} dashed dashSize={0.15} gapSize={0.1} />
      )}

      {/* Pulsing point on curve */}
      <mesh position={[xVal, yVal, 0.06]} scale={[pulse*0.12, pulse*0.12, pulse*0.12]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.6} />
      </mesh>

      {/* x-axis dot */}
      <mesh position={[xVal, 0, 0.04]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.4} />
      </mesh>

      {labelP > 0.2 && (
        <>
          <Html className="r3f-html" position={[4, 15.5, 0]} center style={{ pointerEvents:'none', opacity:labelP }}>
            <div style={TAG('#db2777', { fontSize:'13px' })}>f(x) = x²</div>
          </Html>
          {showTangent && (
            <Html className="r3f-html" position={[tx2+0.55, ty2, 0]} center style={{ pointerEvents:'none', opacity:labelP }}>
              <div style={TAG('#d97706')}>f '(x) = {slope.toFixed(2)}</div>
            </Html>
          )}
          <Html className="r3f-html" position={[xVal, yVal+0.9, 0]} center style={{ pointerEvents:'none', opacity:labelP }}>
            <div style={TAG('#475569', { fontWeight:500 })}>({xVal.toFixed(2)}, {yVal.toFixed(2)})</div>
          </Html>
          {showTangent && (
            <Html className="r3f-html" position={[-4, 14, 0]} center style={{ pointerEvents:'none', opacity:labelP }}>
              <div style={{ background:'rgba(255,255,255,0.95)', border:'1px solid rgba(217,119,6,0.3)',
                borderRadius:'12px', padding:'10px 16px', minWidth:'192px', boxShadow:'0 4px 16px rgba(0,0,0,0.09)' }}>
                <div style={{ color:'#94a3b8', fontSize:'10px', marginBottom:'5px', fontFamily:'Fira Code,monospace', letterSpacing:'0.05em' }}>
                  DERIVATIVE AT x = {xVal.toFixed(2)}
                </div>
                <div style={{ color:'#d97706', fontSize:'18px', fontFamily:'Fira Code,monospace', fontWeight:800 }}>
                  slope = {slope.toFixed(3)}
                </div>
                <div style={{ color:'#94a3b8', fontSize:'10px', marginTop:'3px', fontFamily:'Fira Code,monospace' }}>
                  {slope > 0.01 ? '↗ increasing' : slope < -0.01 ? '↘ decreasing' : '→ minimum (x = 0)'}
                </div>
              </div>
            </Html>
          )}
        </>
      )}

      <Grid position={[0,-0.5,-0.05]} args={[16,20]} cellSize={1} cellThickness={0.4} cellColor="#cfc5b2"
        sectionSize={5} sectionThickness={0.8} sectionColor="#b8a890"
        infiniteGrid fadeDistance={20} fadeStrength={2} rotation={[Math.PI/2,0,0]} />
    </group>
  )
}
