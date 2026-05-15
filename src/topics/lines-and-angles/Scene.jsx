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

export default function LinesAndAnglesScene({ values, autoPlay, currentStep }) {
  const [, tick] = useState(0)
  const ent  = useRef(0)
  const pT   = useRef(0)
  const dT   = useRef(0)

  const cAngle = useRef(values.angle ?? 60)
  const cTilt = useRef(values.tilt ?? 0)

  useFrame((_, dt) => {
    ent.current = Math.min(1, ent.current + dt * 0.6)
    pT.current += dt
    
    if (autoPlay) dT.current += dt * 0.5
    
    const tangle = autoPlay ? 40 + Math.abs(Math.sin(dT.current * 0.5)) * 100 : Math.max(20, values.angle ?? 60)
    const ttilt = autoPlay ? Math.sin(dT.current * 0.3) * 20 : values.tilt ?? 0
    
    cAngle.current += (tangle - cAngle.current) * 0.07
    cTilt.current += (ttilt - cTilt.current) * 0.07
    tick(n => n + 1)
  })

  const t      = ent.current
  const fillP  = easeOut(Math.min(1, Math.max(0, t * 2 - 1.0)))

  const angle = cAngle.current
  const tilt = cTilt.current
  const angleRad = (angle * Math.PI) / 180
  const tiltRad = (tilt * Math.PI) / 180

  const h = 2 // Distance from origin to horizontal lines

  // Line 1: y = h
  // Line 2: y = -h + tan(tilt) * x
  // Transversal: y = tan(angle) * x

  const m1 = 0 // Slope of horizontal line
  const m2 = Math.tan(tiltRad) // Slope of tilted line
  const mT = Math.tan(angleRad) // Slope of transversal

  // Intersections
  const x1 = h / mT
  const y1 = h

  const x2 = -h / (mT - m2)
  const y2 = mT * x2

  const p1 = new THREE.Vector3(x1, y1, 0)
  const p2 = new THREE.Vector3(x2, y2, 0)

  // Line geometries
  const line1Points = [new THREE.Vector3(-10, h, 0), new THREE.Vector3(10, h, 0)]
  const line2Points = [new THREE.Vector3(-10, -h + m2 * -10, 0), new THREE.Vector3(10, -h + m2 * 10, 0)]
  const transPoints = [new THREE.Vector3(-10, mT * -10, 0), new THREE.Vector3(10, mT * 10, 0)]

  // Angle sectors (arcs)
  // We use CircleGeometry with thetaStart and thetaLength
  const radius = 0.8

  const createArc = (center, start, length, color) => (
    <mesh position={[center.x, center.y, 0.01]} scale={[fillP, fillP, fillP]}>
      <circleGeometry args={[radius, 32, start, length]} />
      <meshStandardMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
      <Line points={getArcPoints(start, length, radius)} color={color} lineWidth={2} />
    </mesh>
  )

  const getArcPoints = (start, length, r) => {
    const pts = []
    const segments = 20
    for (let i = 0; i <= segments; i++) {
      const a = start + (length * i) / segments
      pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0))
    }
    return pts
  }

  // Angles at Intersection 1 (Top)
  const a1_1 = 0
  const l1_1 = angleRad
  
  const a1_2 = angleRad
  const l1_2 = Math.PI - angleRad
  
  const a1_3 = Math.PI
  const l1_3 = angleRad
  
  const a1_4 = Math.PI + angleRad
  const l1_4 = Math.PI - angleRad

  // Angles at Intersection 2 (Bottom)
  // Base line is tilted by tiltRad
  const a2_1 = tiltRad
  const l2_1 = angleRad - tiltRad
  
  const a2_2 = angleRad
  const l2_2 = Math.PI - (angleRad - tiltRad)
  
  const a2_3 = Math.PI + tiltRad
  const l2_3 = angleRad - tiltRad
  
  const a2_4 = Math.PI + angleRad
  const l2_4 = Math.PI - (angleRad - tiltRad)

  const isParallel = Math.abs(tilt) < 0.5

  // Colors for matching angles (when parallel)
  const colA = "#ff0055" // Corresponding / Alternate
  const colB = "#00ffaa"
  const colC = "#00aaff"
  const colD = "#ffff00"

  return (
    <group position={[0, 0, 0]}>
      {/* Lines */}
      <Line points={line1Points} color="#fff" lineWidth={3} transparent opacity={fillP} />
      <Line points={line2Points} color="#fff" lineWidth={3} transparent opacity={fillP} />
      <Line points={transPoints} color="#ff00aa" lineWidth={2} transparent opacity={fillP} />

      {/* Intersection dots */}
      {[p1, p2].map((p, i) => (
        <mesh key={i} position={[p.x, p.y, 0.05]} scale={[fillP * 0.1, fillP * 0.1, fillP * 0.1]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color="#fff" />
        </mesh>
      ))}

      {/* Arcs at Int 1 */}
      {createArc(p1, a1_1, l1_1, colA)}
      {createArc(p1, a1_2, l1_2, colB)}
      {createArc(p1, a1_3, l1_3, colA)}
      {createArc(p1, a1_4, l1_4, colB)}

      {/* Arcs at Int 2 */}
      {createArc(p2, a2_1, l2_1, isParallel ? colA : colC)}
      {createArc(p2, a2_2, l2_2, isParallel ? colB : colD)}
      {createArc(p2, a2_3, l2_3, isParallel ? colA : colC)}
      {createArc(p2, a2_4, l2_4, isParallel ? colB : colD)}

      {/* Labels */}
      {fillP > 0.5 && (
        <>
          <Html position={[p1.x + 0.5, p1.y + 0.5, 0]} center>
            <div style={TAG(colA)}>{angle.toFixed(0)}°</div>
          </Html>
          <Html position={[p2.x + 0.5, p2.y + 0.5, 0]} center>
            <div style={TAG(isParallel ? colA : colC)}>{(angle - tilt).toFixed(0)}°</div>
          </Html>
          
          <Html position={[0, 3.5, 0]} center>
            <div style={TAG('#fff', { background: 'rgba(0,0,0,0.8)' })}>
              {isParallel ? 'Lines are Parallel' : 'Lines are NOT Parallel'}
            </div>
          </Html>
        </>
      )}

      <Grid position={[0,0,-0.1]} args={[20,20]} cellSize={1} cellThickness={0.4} cellColor="#cfc5b2"
        sectionSize={5} sectionThickness={0.8} sectionColor="#b8a890"
        infiniteGrid fadeDistance={18} fadeStrength={1.5} rotation={[Math.PI/2,0,0]} />
    </group>
  )
}
