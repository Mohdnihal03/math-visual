import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Text } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

function FloatingText({ text, position, fontSize, color }) {
  const ref = useRef()
  const speed = useRef(Math.random() * 0.5 + 0.2)
  const offset = useRef(Math.random() * Math.PI * 2)
  const [hovered, setHovered] = useState(false)

  // Calculate opacity based on Z depth (deeper = more transparent)
  const baseOpacity = (position[2] + 1.5) / 3
  const opacity = Math.max(0.3, Math.min(1.0, baseOpacity))

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const { x, y } = state.pointer // Normalized mouse coordinates (-1 to +1)

    if (ref.current) {
      // Base floating motion
      let targetY = position[1] + Math.sin(t * speed.current + offset.current) * 0.15
      let targetX = position[0] + Math.cos(t * speed.current + offset.current) * 0.15

      // Parallax effect based on mouse (gentle movement)
      targetX += x * 0.2
      targetY += y * 0.2

      // Smooth interpolation (lerp)
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, 0.1)
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.1)

      // Scale effect on hover
      const targetScale = hovered ? 1.5 : 1
      ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, targetScale, 0.2))

      // Gentle rotation
      ref.current.rotation.z = Math.sin(t * 0.3 + offset.current) * 0.1
    }
  })

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={fontSize}
      color={hovered ? '#00e0c6' : color}
      anchorX="center"
      anchorY="middle"
      opacity={hovered ? 1.0 : opacity}
      transparent={true}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
    >
      {text}
    </Text>
  )
}

function Logo3D() {
  // Array of symbols, numbers, and formulas
  const mathElements = [
    { text: '∑', pos: [0, 1.2, 0], size: 0.3, color: '#ff6b6b' },
    { text: 'π', pos: [1.2, 0, 0], size: 0.3, color: '#00e0c6' },
    { text: '√', pos: [-1.2, 0, 0], size: 0.3, color: '#a78bfa' },
    { text: '∫', pos: [0, -1.2, 0], size: 0.3, color: '#fbbf24' },
    { text: '∞', pos: [0, 0, 1.2], size: 0.3, color: '#00e0c6' },
    { text: 'e=mc²', pos: [0.8, 0.8, -0.5], size: 0.15, color: '#ff6b6b' },
    { text: 'a²+b²=c²', pos: [-0.8, -0.8, 0.5], size: 0.15, color: '#a78bfa' },
    { text: 'f(x)=sin(x)', pos: [0.5, -0.5, -1], size: 0.15, color: '#fbbf24' },
    { text: 'lim x→∞', pos: [-0.5, 0.5, 1], size: 0.15, color: '#00e0c6' },
    { text: 'dx/dy', pos: [1, -1, 0.5], size: 0.2, color: '#ff6b6b' },
    { text: 'θ', pos: [-1, 1, -0.5], size: 0.2, color: '#fbbf24' },
    { text: 'λ', pos: [0, 0, -1.2], size: 0.2, color: '#a78bfa' },
    { text: '42', pos: [0.5, 1, 0.5], size: 0.2, color: '#00e0c6' },
    { text: 'e^iπ + 1 = 0', pos: [-0.5, -1, -0.5], size: 0.12, color: '#ff6b6b' },
    { text: '∇×E = -∂B/∂t', pos: [-1.5, 0.2, -1.5], size: 0.1, color: '#a78bfa' },
    { text: '∫ e^x dx', pos: [1.5, -1.2, -1], size: 0.15, color: '#fbbf24' },
    { text: 'ζ(s) = ∑ n^-s', pos: [-1.2, 1.5, -0.5], size: 0.12, color: '#ff6b6b' },
    { text: 'G_μν = 8πT_μν', pos: [1.2, -1.5, 1], size: 0.12, color: '#00e0c6' },
    { text: 'i', pos: [-0.2, 0.2, 1.5], size: 0.3, color: '#a78bfa' },
  ]

  return (
    <group>
      {mathElements.map((el, i) => (
        <FloatingText
          key={i}
          text={el.text}
          position={el.pos}
          fontSize={el.size}
          color={el.color}
        />
      ))}
    </group>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    document.title = "Ganith Society — Welcome"
  }, [])

  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [operator, setOperator] = useState('+')
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState(null)
  const [currentQuote, setCurrentQuote] = useState('')

  useEffect(() => {
    const quotes = [
      "There are three types of people: those who can count, and those who can't.",
      "Math is the only place where people buy 60 watermelons and no one wonders why.",
      "Without geometry, life is pointless.",

      "Why was the equal sign so humble? Because he wasn't less than or greater than anyone else."
    ]
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  const generateProblem = () => {
    const ops = ['+', '-', '*', '/']
    const op = ops[Math.floor(Math.random() * ops.length)]
    let n1, n2

    if (op === '+' || op === '-') {
      n1 = Math.floor(Math.random() * 90) + 10 // 10 to 99
      n2 = Math.floor(Math.random() * 90) + 10 // 10 to 99
      // Ensure positive result for subtraction
      if (op === '-' && n1 < n2) {
        const temp = n1
        n1 = n2
        n2 = temp
      }
    } else if (op === '*') {
      n1 = Math.floor(Math.random() * 11) + 2 // 2 to 12
      n2 = Math.floor(Math.random() * 11) + 2 // 2 to 12
    } else if (op === '/') {
      const divisor = Math.floor(Math.random() * 9) + 2 // 2 to 10
      const answer = Math.floor(Math.random() * 9) + 2 // 2 to 10
      n1 = divisor * answer // Dividend
      n2 = divisor // Divisor
    }

    setNum1(n1)
    setNum2(n2)
    setOperator(op)
    setUserAnswer('')
    setIsCorrect(null)
  }

  useEffect(() => {
    generateProblem()
  }, [])

  const triggerConfetti = () => {
    const container = document.getElementById('game-container')
    if (!container) return

    const particleCount = 15
    const colors = ['#00e0c6', '#a78bfa', '#ff6b6b', '#fbbf24']

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div')
      p.className = 'absolute w-1.5 h-1.5 rounded-full pointer-events-none'
      p.style.background = colors[Math.floor(Math.random() * colors.length)]

      // Position at the center of the input area
      p.style.left = '50%'
      p.style.top = '50%'
      p.style.transform = 'translate(-50%, -50%)'

      container.appendChild(p)

      const angle = Math.random() * Math.PI * 2
      const velocity = Math.random() * 60 + 40
      const tx = Math.cos(angle) * velocity
      const ty = Math.sin(angle) * velocity

      gsap.to(p, {
        x: tx,
        y: ty,
        opacity: 0,
        scale: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => p.remove()
      })
    }
  }

  const checkAnswer = (val) => {
    setUserAnswer(val)
    if (val === '') {
      setIsCorrect(null)
      return
    }
    const numVal = parseFloat(val)
    let correctAns = 0
    if (operator === '+') correctAns = num1 + num2
    if (operator === '-') correctAns = num1 - num2
    if (operator === '*') correctAns = num1 * num2
    if (operator === '/') correctAns = num1 / num2

    if (numVal === correctAns) {
      setIsCorrect(true)
      triggerConfetti()
      setTimeout(generateProblem, 1500)
    } else {
      setIsCorrect(false)
    }
  }

  return (
    <div className={`min-h-full bg-void flex flex-col items-center justify-center text-center px-6 overflow-hidden relative transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Geometric background grid */}
      <div className="absolute inset-0 geo-grid opacity-30 pointer-events-none" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-teal/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-violet/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-12 py-12">

        {/* 3D Canvas */}
        <div className="w-full lg:w-1/2 h-[250px] md:h-[400px]">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00e0c6" />
            <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff6b6b" />
            <pointLight position={[0, -10, 0]} intensity={1} color="#a78bfa" />
            <pointLight position={[0, 10, 0]} intensity={1} color="#fbbf24" />
            <Logo3D />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
          </Canvas>
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start">
          {/* Welcome Tag */}
          {/* <div className="anim-fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-body font-medium mb-6"
            style={{ background: 'rgba(0, 224, 198, 0.1)', border: '1px solid rgba(0, 224, 198, 0.2)', color: '#00e0c6' }}>
            <span className="w-2 h-2 rounded-full bg-neon-teal animate-pulse" />
            Welcome to the future of learning
          </div> */}

          {/* Title */}
          <h1 className="anim-fade-up font-display font-extrabold text-4xl md:text-7xl mb-4 leading-none tracking-tight text-ink">
            Ganith Society
          </h1>

          {/* Subtitles */}
          <h2 className="anim-fade-up font-display font-bold text-xl md:text-2xl mb-6"
            style={{
              background: 'linear-gradient(135deg, #00e0c6 0%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            see math , understand math
          </h2>

          {/* CTA Buttons */}
          <div className="anim-fade-up flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
            <Link
              to="/home"
              onClick={(e) => {
                e.preventDefault()
                setIsFadingOut(true)
                setTimeout(() => navigate('/home'), 500)
              }}
              className="px-8 py-3 rounded-xl text-sm font-display font-bold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #00e0c6 0%, #a78bfa 100%)',
                color: '#08090d',
                boxShadow: '0 4px 20px rgba(0, 224, 198, 0.2)',
              }}
            >
              Explore Topics <span className="text-lg">→</span>
            </Link>
            <Link
              to="/cheat-sheet"
              className="px-8 py-3 rounded-xl text-sm font-display font-bold transition-all duration-300 hover:scale-105 border border-white/10 hover:border-white/20 bg-white/[0.02] text-ink"
            >
              Formula Sheet
            </Link>
          </div>

          {/* Description */}
          <p className="anim-fade-up text-ink-muted text-base md:text-lg mb-6 font-body font-light leading-relaxed max-w-md">
            Step into a world where abstract concepts become living, interactive structures. We're glad you're here to explore with us.
          </p>

          {/* Mini Game */}
          <div id="game-container" className="anim-fade-up p-4 rounded-xl bg-white/[0.02] border border-white/10 max-w-sm w-full relative">
            <p className="text-xs font-display font-semibold uppercase tracking-wider text-ink-muted mb-2">
              Quick Math Challenge
            </p>
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <span className="text-xl font-display font-bold text-ink">
                {num1} {operator} {num2} =
              </span>
              <div className="relative">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => checkAnswer(e.target.value)}
                  className="w-16 px-2 py-1 rounded-lg bg-void border border-white/10 text-ink text-center font-display font-bold focus:outline-none focus:border-neon-teal"
                  placeholder="?"
                />
                {isCorrect === true && (
                  <span className="absolute -right-6 top-1/2 -translate-y-1/2 text-neon-teal font-bold">✓</span>
                )}
                {isCorrect === false && (
                  <span className="absolute -right-6 top-1/2 -translate-y-1/2 text-neon-coral font-bold">✗</span>
                )}
              </div>
            </div>
          </div>

          {/* Funny Quote */}
          <div className="anim-fade-up mt-4 p-3 rounded-lg bg-white/[0.01] border border-white/5 max-w-sm w-full text-center lg:text-left">
            <p className="text-xs font-body italic text-ink-muted">
              "{currentQuote}"
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-xs font-body" style={{ color: '#4a4d5e' }}>
        <p>Developed by <span style={{ color: '#00e0c6', fontWeight: 'bold' }}>Mohammed Nihal</span></p>
      </div>
    </div>
  )
}
