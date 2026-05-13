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

function buildCurve(a, b, c) {
  const pts = []
  const range = Math.min(8, Math.max(4, Math.abs(-b/(2*a||1)) + 4))
  for (let x = -range; x <= range; x += 0.08) {
    const y = a*x*x + b*x + c
    if (Math.abs(y) < 12) pts.push(new THREE.Vector3(x, y, 0))
  }
  return pts
}

export default function QuadraticScene({ values, autoPlay, currentStep }) {
  const [, tick] = useState(0)
  const ent = useRef(0)
  const dT  = useRef(0)
  const ca  = useRef(values.a ?? 1)
  const cc  = useRef(values.c ?? -4)
  const pulsT = useRef(0)

  useFrame((_, dt) => {
    ent.current  = Math.min(1, ent.current + dt * 0.6)
    pulsT.current += dt
    if (autoPlay) dT.current += dt * 0.38
    const ta = autoPlay ? 0.6 + Math.sin(dT.current * 0.65) * 1.6 : (values.a ?? 1)
    const tc = autoPlay ? Math.sin(dT.current * 0.5) * 6.5 : (values.c ?? -4)
    ca.current += (ta - ca.current) * 0.06
    cc.current += (tc - cc.current) * 0.06
    tick(n => n + 1)
  })

  const t      = ent.current
  const curveP = easeOut(Math.min(1, t * 1.6))
  const labelP = easeOut(Math.min(1, Math.max(0, t * 2 - 1.2)))
  const pulse  = 1 + Math.abs(Math.sin(pulsT.current * 2)) * 0.35

  const a = ca.current, b = values.b ?? 0, c = cc.current
  const disc    = b*b - 4*a*c
  const vertexX = a !== 0 ? -b/(2*a) : 0
  const vertexY = a !== 0 ? c - b*b/(4*a) : c

  const allPts  = buildCurve(a, b, c)
  const visPts  = allPts.slice(0, Math.max(2, Math.round(allPts.length * curveP)))

  const roots = []
  if (disc >= 0 && a !== 0) {
    const sq = Math.sqrt(Math.max(0, disc))
    if (disc === 0) roots.push({ x: -b/(2*a) })
    else { roots.push({ x: (-b+sq)/(2*a) }); roots.push({ x: (-b-sq)/(2*a) }) }
  }

  const curveColor = disc > 0 ? '#8b5cf6' : disc === 0 ? '#f59e0b' : '#ef4444'

  // Control visibility based on proof steps
  let showVertex = true
  let showRoots = true

  if (currentStep !== undefined) {
    if (currentStep === 0) {
      showVertex = false; showRoots = false;
    } else if (currentStep === 1) {
      showVertex = true; showRoots = false;
    }
  }

  return (
    <group>
      <Line points={[new THREE.Vector3(-9,0,0), new THREE.Vector3(9,0,0)]} color="#b8a890" lineWidth={1.5} />
      <Line points={[new THREE.Vector3(0,-10,0), new THREE.Vector3(0,10,0)]} color="#b8a890" lineWidth={1.5} />

      {/* Parabola draws in */}
      {visPts.length > 1 && <Line points={visPts} color={curveColor} lineWidth={3} />}

      {/* Vertex drop */}
      {showVertex && curveP > 0.8 && Math.abs(vertexY) > 0.1 && (
        <Line points={[new THREE.Vector3(vertexX,vertexY,.01), new THREE.Vector3(vertexX,0,.01)]}
          color="#94a3b8" lineWidth={1} dashed dashSize={0.2} gapSize={0.15} />
      )}

      {/* Vertex dot */}
      {showVertex && curveP > 0.5 && (
        <mesh position={[vertexX, vertexY, 0.05]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial color={curveColor} emissive={curveColor} emissiveIntensity={0.4} />
        </mesh>
      )}

      {/* Root dots — pulse */}
      {showRoots && roots.map((r, i) => (
        <mesh key={i} position={[r.x, 0, 0.05]} scale={[pulse, pulse, pulse]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.4} />
        </mesh>
      ))}

      {/* Labels */}
      {labelP > 0.15 && (
        <>
          {showVertex && (
            <Html className="r3f-html" position={[vertexX, vertexY + 0.55, 0]} center style={{ pointerEvents:'none', opacity:labelP }}>
              <div style={TAG(curveColor)}>vertex ({vertexX.toFixed(2)}, {vertexY.toFixed(2)})</div>
            </Html>
          )}
          {showRoots && roots.map((r, i) => (
            <Html className="r3f-html" key={i} position={[r.x, -0.6, 0]} center style={{ pointerEvents:'none', opacity:labelP }}>
              <div style={TAG('#d97706')}>x = {r.x.toFixed(2)}</div>
            </Html>
          ))}
          <Html className="r3f-html" position={[5.5, 9.5, 0]} center style={{ pointerEvents:'none', opacity:labelP }}>
            <div style={TAG(curveColor, { fontSize:'13px' })}>
              {a.toFixed(1)}x² {b>=0?'+':''}{b}x {c>=0?'+':''}{c.toFixed(1)}
            </div>
          </Html>
          <Html className="r3f-html" position={[-5.5, 9.5, 0]} center style={{ pointerEvents:'none', opacity:labelP }}>
            <div style={TAG(disc>0?'#16a34a':disc===0?'#d97706':'#dc2626', { fontSize:'11px' })}>
              Δ = {disc.toFixed(1)} · {disc>0?'2 roots':disc===0?'1 root':'no roots'}
            </div>
          </Html>
        </>
      )}

      <Grid position={[0,0,-0.05]} args={[24,24]} cellSize={1} cellThickness={0.4} cellColor="#cfc5b2"
        sectionSize={5} sectionThickness={0.8} sectionColor="#b8a890"
        infiniteGrid fadeDistance={20} fadeStrength={2} rotation={[Math.PI/2,0,0]} />
    </group>
  )
}
