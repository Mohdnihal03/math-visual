import { useState, useEffect, Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { topics } from '../topics/index'
import FormulaDisplay from '../components/FormulaDisplay'
import StepProof from '../components/StepProof'
import ValueControl from '../components/ValueControl'

const difficultyStyle = {
  Beginner: { bg: 'rgba(0, 224, 198, 0.1)', text: '#00e0c6', border: 'rgba(0, 224, 198, 0.2)' },
  Intermediate: { bg: 'rgba(251, 191, 36, 0.1)', text: '#fbbf24', border: 'rgba(251, 191, 36, 0.2)' },
  Advanced: { bg: 'rgba(255, 107, 107, 0.1)', text: '#ff6b6b', border: 'rgba(255, 107, 107, 0.2)' },
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.5} color="#e0f0ff" />
      <directionalLight position={[8, 12, 8]} intensity={1.1} />
      <directionalLight position={[-6, 4, -6]} intensity={0.35} color="#1a1d2b" />
      <pointLight position={[0, 8, 8]} intensity={0.4} color="#00e0c6" />
      <pointLight position={[-5, 3, 5]} intensity={0.15} color="#a78bfa" />
    </>
  )
}

/* ─── Info panel content ─── */
function InfoContent({ topic, computed, onStepChange }) {
  const ds = difficultyStyle[topic.difficulty] ?? difficultyStyle.Beginner
  return (
    <>
      {/* Header */}
      <div
        className="px-5 pt-5 pb-4"
        style={{
          background: 'linear-gradient(180deg, #12141c 0%, #0c0d14 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <Link
          to="/"
          className="text-xs mb-3 inline-flex items-center gap-1 no-underline font-body transition-colors"
          style={{ color: '#4a4d5e' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#00e0c6')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#4a4d5e')}
        >
          ← All Topics
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{topic.icon}</span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[10px] font-body font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide"
                style={{ background: ds.bg, color: ds.text, border: `1px solid ${ds.border}` }}
              >
                {topic.difficulty}
              </span>
              <span className="text-xs font-body" style={{ color: '#4a4d5e' }}>
                · {topic.category}
              </span>
            </div>
            <h1 className="text-lg font-display font-bold leading-tight text-ink">
              {topic.title}
            </h1>
          </div>
        </div>
        <p className="text-sm leading-relaxed font-body" style={{ color: '#7a7d8e' }}>
          {topic.description}
        </p>
      </div>

      {/* Key formula — glowing card */}
      <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div
          className="rounded-2xl px-4 py-4 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,224,198,0.06), rgba(167,139,250,0.06))',
            border: '1px solid rgba(0, 224, 198, 0.12)',
            boxShadow: '0 0 30px rgba(0, 224, 198, 0.04)',
          }}
        >
          <p
            className="text-[10px] font-display font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: '#00e0c6' }}
          >
            Key Formula
          </p>
          <FormulaDisplay formula={topic.formulas[0].latex} displayMode />
        </div>
      </div>

      {/* Explanation */}
      <section className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <h2
          className="text-[10px] font-display font-bold uppercase tracking-[0.2em] mb-2"
          style={{ color: '#a78bfa' }}
        >
          Explanation
        </h2>
        <p className="text-sm leading-relaxed font-body" style={{ color: '#7a7d8e' }}>
          {topic.explanation}
        </p>
      </section>

      {/* Formulas */}
      <section className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <h2
          className="text-[10px] font-display font-bold uppercase tracking-[0.2em] mb-3"
          style={{ color: '#00e0c6' }}
        >
          Formulas
        </h2>
        <div className="flex flex-col gap-3">
          {topic.formulas.map((f, i) => (
            <div
              key={i}
              className="rounded-xl p-4"
              style={{
                background: 'rgba(18, 20, 28, 0.6)',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <p className="text-xs mb-2 font-body font-medium" style={{ color: '#4a4d5e' }}>
                {f.label}
              </p>
              <FormulaDisplay formula={f.latex} displayMode />
            </div>
          ))}
        </div>
      </section>

      {/* Computed / live values */}
      {computed && Object.keys(computed).filter((k) => computed[k] !== undefined).length > 0 && (
        <section className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <h2
            className="text-[10px] font-display font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: '#fbbf24' }}
          >
            Live Values
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(computed).map(([key, val]) =>
              val === undefined ? null : (
                <div
                  key={key}
                  className="rounded-lg p-3"
                  style={{
                    background: 'rgba(251, 191, 36, 0.04)',
                    border: '1px solid rgba(251, 191, 36, 0.1)',
                  }}
                >
                  <p className="text-xs mb-1 font-body" style={{ color: '#7a7d8e' }}>
                    {key}
                  </p>
                  <p className="font-mono font-bold text-sm" style={{ color: '#fbbf24' }}>
                    {typeof val === 'number' ? val.toFixed(3) : val}
                  </p>
                </div>
              )
            )}
          </div>
        </section>
      )}
      {/* Challenges */}
      {topic.challenges && topic.challenges.length > 0 && (
        <section className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <h2
            className="text-[10px] font-display font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: '#00e0c6' }}
          >
            Teacher's Challenges 🧠
          </h2>
          <div className="flex flex-col gap-3">
            {topic.challenges.map((c, i) => (
              <div
                key={i}
                className="rounded-xl p-4"
                style={{
                  background: 'rgba(0, 224, 198, 0.04)',
                  border: '1px solid rgba(0, 224, 198, 0.1)',
                }}
              >
                <p className="text-sm font-body text-ink mb-1">
                  {c.question}
                </p>
                {c.hint && (
                  <p className="text-xs font-body" style={{ color: '#7a7d8e' }}>
                    <span style={{ color: '#00e0c6' }}>Hint:</span> {c.hint}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Proof */}
      <section className="px-5 py-5">
        <h2
          className="text-[10px] font-display font-bold uppercase tracking-[0.2em] mb-3"
          style={{ color: '#00e0c6' }}
        >
          Step-by-Step Proof
        </h2>
        <StepProof steps={topic.proofSteps} onStepChange={onStepChange} />
      </section>

      {/* Applications */}
      {topic.applications && (
        <section className="px-5 py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <h2
            className="text-[10px] font-display font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: '#fbbf24' }}
          >
            Real-Life Applications
          </h2>
          <ul className="text-sm leading-relaxed font-body list-disc pl-5" style={{ color: '#7a7d8e' }}>
            {topic.applications.map((app, i) => (
              <li key={i} className="mb-2">{app}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Benefits */}
      {topic.benefits && topic.benefits.length > 0 && (
        <section className="px-5 py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <h2
            className="text-[10px] font-display font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: '#10b981' }}
          >
            Learning Benefits
          </h2>
          <ul className="text-sm leading-relaxed font-body list-disc pl-5" style={{ color: '#7a7d8e' }}>
            {topic.benefits.map((benefit, i) => (
              <li key={i} className="mb-2">{benefit}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Use Cases */}
      {topic.useCases && topic.useCases.length > 0 && (
        <section className="px-5 py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <h2
            className="text-[10px] font-display font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: '#60a5fa' }}
          >
            Who Is This For?
          </h2>
          <ul className="text-sm leading-relaxed font-body list-disc pl-5" style={{ color: '#7a7d8e' }}>
            {topic.useCases.map((useCase, i) => (
              <li key={i} className="mb-2">{useCase}</li>
            ))}
          </ul>
        </section>
      )}

      {/* FAQ */}
      {topic.faq && topic.faq.length > 0 && (
        <section className="px-5 py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <h2
            className="text-[10px] font-display font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: '#a78bfa' }}
          >
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-3">
            {topic.faq.map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-4"
                style={{
                  background: 'rgba(18, 20, 28, 0.6)',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <p className="text-xs font-body font-bold mb-1" style={{ color: '#00e0c6' }}>
                  Q: {item.q}
                </p>
                <p className="text-sm font-body" style={{ color: '#7a7d8e' }}>
                  A: {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

/* ─── Controls panel ─── */
function ControlsPanel({ topic, values, autoPlay, setAutoPlay, handleChange, showLabels, setShowLabels }) {
  return (
    <div
      className="shrink-0 px-4 py-3"
      style={{
        background: 'rgba(12, 13, 20, 0.95)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Mode toggle + status */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1 p-1 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <button
              onClick={() => setAutoPlay(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-all"
              style={{
                background: autoPlay ? '#00e0c6' : 'transparent',
                color: autoPlay ? '#08090d' : '#4a4d5e',
                boxShadow: autoPlay ? '0 0 12px rgba(0, 224, 198, 0.25)' : 'none',
              }}
            >
              ▶ Demo
            </button>
            <button
              onClick={() => setAutoPlay(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-all"
              style={{
                background: !autoPlay ? '#e8e6e3' : 'transparent',
                color: !autoPlay ? '#08090d' : '#4a4d5e',
              }}
            >
              🎮 Explore
            </button>
          </div>

          {/* Labels Toggle */}
          <button
            onClick={() => setShowLabels(!showLabels)}
            className="px-3 py-1.5 rounded-xl text-xs font-display font-semibold transition-all border"
            style={{
              background: showLabels ? 'rgba(0, 224, 198, 0.1)' : 'transparent',
              color: showLabels ? '#00e0c6' : '#4a4d5e',
              borderColor: showLabels ? 'rgba(0, 224, 198, 0.2)' : 'rgba(255,255,255,0.06)',
            }}
          >
            {showLabels ? '🏷️ Labels: On' : '🏷️ Labels: Off'}
          </button>
        </div>

        {autoPlay ? (
          <span
            className="flex items-center gap-2 text-xs font-body px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(0, 224, 198, 0.06)',
              border: '1px solid rgba(0, 224, 198, 0.12)',
              color: '#00e0c6',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full glow-pulse" style={{ background: '#00e0c6' }} />
            Auto-animating
          </span>
        ) : (
          <span
            className="text-xs font-body px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(0, 224, 198, 0.06)',
              color: '#00e0c6',
              border: '1px solid rgba(0, 224, 198, 0.1)',
            }}
          >
            ✦ Explore mode — drag sliders
          </span>
        )}
      </div>

      {/* Sliders */}
      <div
        className={`gap-x-6 gap-y-4 transition-all duration-300 ${autoPlay ? 'hidden md:grid' : 'grid'}`}
        style={{
          gridTemplateColumns:
            topic.controls.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
          opacity: autoPlay ? 0.35 : 1,
          pointerEvents: autoPlay ? 'none' : 'auto',
        }}
      >
        {topic.controls.map((control) => (
          <ValueControl
            key={control.id}
            control={control}
            value={values[control.id]}
            onChange={(v) => handleChange(control.id, v)}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Main page ─── */
export default function TopicPage() {
  const { id } = useParams()
  const topic = topics.find((t) => t.id === id)

  const [values, setValues] = useState(() => {
    if (!topic) return {}
    return Object.fromEntries(topic.controls.map((c) => [c.id, c.defaultValue]))
  })
  const [autoPlay, setAutoPlay] = useState(true)
  const [currentStep, setCurrentStep] = useState(undefined) // State for proof steps
  const [showLabels, setShowLabels] = useState(() => window.innerWidth > 768)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (!showLabels) {
      document.body.classList.add('hide-labels')
    } else {
      document.body.classList.remove('hide-labels')
    }
    return () => document.body.classList.remove('hide-labels')
  }, [showLabels])

  useEffect(() => {
    if (topic) {
      // Use meta title if available, otherwise fallback
      document.title = topic.meta?.title || `${topic.title} | Interactive 3D Math`

      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.name = "description"
        document.head.appendChild(metaDesc)
      }
      // Use meta description if available, otherwise fallback
      metaDesc.content = topic.meta?.description || topic.description

      // Structured Data (JSON-LD)
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": topic.title,
        "description": topic.description,
        "educationalUse": "learning",
        "learningResourceType": "Visual Resource"
      }

      // Add FAQ Schema if exists
      if (topic.faq) {
        structuredData.mainEntity = topic.faq.map(item => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
      }

      let script = document.getElementById('json-ld-topic')
      if (!script) {
        script = document.createElement('script')
        script.type = "application/ld+json"
        script.id = 'json-ld-topic'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(structuredData)
    }
  }, [topic])

  if (!topic) {
    return (
      <div className="flex items-center justify-center h-full bg-void">
        <div className="text-center">
          <p className="text-2xl mb-3 font-display" style={{ color: '#4a4d5e' }}>
            Topic not found
          </p>
          <Link
            to="/"
            className="font-body text-sm"
            style={{ color: '#00e0c6' }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const Scene = topic.Scene
  const handleChange = (cid, val) => {
    setValues((prev) => ({ ...prev, [cid]: val }))
    setAutoPlay(false)
  }
  const computed = topic.compute ? topic.compute(values) : {}

  return (
    <div className="flex flex-col md:flex-row h-full bg-void">
      {/* ── Desktop info panel ── */}
      <div
        className="hidden md:flex md:w-2/5 shrink-0 flex-col overflow-y-auto"
        style={{
          borderRight: '1px solid rgba(255,255,255,0.04)',
          background: '#0c0d14',
        }}
      >
        <InfoContent topic={topic} computed={computed} onStepChange={setCurrentStep} />
      </div>

      {/* ── Right column ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Controls */}
        <ControlsPanel
          topic={topic}
          values={values}
          autoPlay={autoPlay}
          setAutoPlay={setAutoPlay}
          handleChange={handleChange}
          showLabels={showLabels}
          setShowLabels={setShowLabels}
        />

        {/* 3D Canvas */}
        <div className={`sticky top-0 md:relative ${isExpanded ? 'h-[70vh]' : 'h-[35vh]'} md:h-auto md:flex-1 transition-all duration-300 ${!showLabels ? 'hide-labels' : ''}`} style={{ minHeight: '300px', zIndex: 20 }}>
          {/* Resize Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-display font-semibold md:hidden"
            style={{
              background: 'rgba(12, 13, 20, 0.8)',
              color: '#00e0c6',
              border: '1px solid rgba(0, 224, 198, 0.2)',
              backdropFilter: 'blur(12px)',
              zIndex: 30,
            }}
          >
            {isExpanded ? '↙ Collapse' : '↗ Expand'}
          </button>
          <Canvas
            camera={{ position: [8, 6, 12], fov: 45 }}
            style={{
              background: 'radial-gradient(ellipse at 55% 40%, #14161f 0%, #0c0d14 60%, #08090d 100%)',
            }}
          >
            <SceneLights />
            <fog attach="fog" args={['#0c0d14', 30, 60]} />
            <Suspense fallback={null}>
              <Scene values={values} computed={computed} autoPlay={autoPlay} currentStep={currentStep} />
            </Suspense>
            <OrbitControls
              enablePan={false}
              minDistance={3}
              maxDistance={28}
              enableDamping
              dampingFactor={0.06}
            />
          </Canvas>

          {/* Live badge */}
          {autoPlay && showLabels && (
            <div
              className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-display font-semibold"
              style={{
                background: 'rgba(0, 224, 198, 0.08)',
                border: '1px solid rgba(0, 224, 198, 0.15)',
                color: '#00e0c6',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 0 16px rgba(0, 224, 198, 0.06)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full glow-pulse" style={{ background: '#00e0c6' }} />
              Live
            </div>
          )}

          {/* Interaction hint */}
          {showLabels && (
            <div
              className="absolute bottom-3 right-3 text-xs font-body px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(12, 13, 20, 0.8)',
                color: '#4a4d5e',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)',
              }}
            >
              Drag · Scroll to zoom
            </div>
          )}
        </div>

        {/* ── Mobile info ── */}
        <div
          className="md:hidden"
          style={{
            background: '#0c0d14',
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <InfoContent topic={topic} computed={computed} onStepChange={setCurrentStep} />
        </div>
      </div>
    </div>
  )
}
