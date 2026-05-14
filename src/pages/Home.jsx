import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { topics } from '../topics/index'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const cleanResponse = (text) => {
  if (!text) return ''
  
  let cleaned = text
    // Remove common noise and OCR artifacts
    .replace(/\d{5,}/g, '') // Remove random long numbers like 23456789
    .replace(/\d+ chapter \d+/gi, '')
    .replace(/exercises \d+ [–-] \d+/gi, '')
    .replace(/section \d+\.\d+/gi, '')
    .replace(/big ideas math com/gi, '')
    .replace(/multi - language glossary at big ideas math/gi, '')
    .replace(/lesson tutorials/gi, '')
    .replace(/check it out/gi, '')
    
    // Clean math delimiters
    .replace(/\\ \\ \(/g, ' $ ')
    .replace(/\\ \\ \)/g, ' $ ')
    .replace(/\\ \\ \[/g, '\n$$\n')
    .replace(/\\ \\ \]/g, '\n$$\n')
    .replace(/\\ u 0026/g, '&')
    .replace(/\\ \\ /g, '\\')
    .replace(/begin { aligned }/g, '\\begin{aligned}')
    .replace(/end { aligned }/g, '\\end{aligned}')
    
  // Split into sections based on keywords
  const regex = /(\d+ activity|example \d+|key idea|key vocabulary|vocabulary|critical thinking|reasoning|on your own)/gi
  const parts = cleaned.split(regex)
  
  let formatted = ''
  
  // Add the introduction part if it exists
  if (parts[0] && parts[0].trim()) {
    formatted += parts[0].trim() + '\n\n'
  }
  
  // Process the matched sections
  for (let i = 1; i < parts.length; i += 2) {
    const header = parts[i]
    const content = parts[i+1]
    if (header && content) {
      formatted += `### ${header.trim().toUpperCase()}\n${content.trim()}\n\n`
    }
  }
  
  // Fallback if no sections were found
  if (formatted === '' && cleaned) {
    formatted = cleaned
  }
  
  // Final cleanup of extra newlines and spaces
  return formatted
    .replace(/\n\n+/g, '\n\n')
    .replace(/ +/g, ' ')
    .trim()
}

const difficultyStyle = {
  Beginner: { bg: 'rgba(0, 224, 198, 0.1)', text: '#00e0c6', border: 'rgba(0, 224, 198, 0.2)' },
  Intermediate: { bg: 'rgba(251, 191, 36, 0.1)', text: '#fbbf24', border: 'rgba(251, 191, 36, 0.2)' },
  Advanced: { bg: 'rgba(255, 107, 107, 0.1)', text: '#ff6b6b', border: 'rgba(255, 107, 107, 0.2)' },
}

const categoryAccent = {
  Geometry: '#00e0c6',
  Algebra: '#a78bfa',
  Calculus: '#ff6b6b',
}

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [localResults, setLocalResults] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100) // Small timeout to ensure modal is rendered
    }
  }, [isSearchOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setLocalResults([])
      return
    }
    const filtered = topics.filter(t => 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setLocalResults(filtered)
  }, [searchQuery])

  const handleSearch = async (query = searchQuery) => {
    const term = query.trim()
    if (!term) return
    setIsLoading(true)
    setError(null)
    setSearchResult('')
    try {
      const response = await fetch('https://api.langsearch.com/v1/web-search', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_LANGSEARCH_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: term,
          freshness: "noLimit",
          summary: false,
          count: 5
        })
      })

      const result = await response.json()
      if (result.code === 200 && result.data?.webPages?.value) {
        setSearchResult(result.data.webPages.value)
      } else {
        setError('No results found for this query.')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    document.title = "Ganith Society — Interactive 3D Math Visualizations"

    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = "description"
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = "Explore mathematical concepts through beautiful 3D animations. Interactive models for students of all ages."
  }, [])

  return (
    <div className="min-h-full bg-void">
      {/* ── Hero ── */}
      <div className="relative px-6 md:px-8 py-10 md:py-20 text-center overflow-hidden">
        {/* Geometric grid background */}
        <div className="absolute inset-0 geo-grid pointer-events-none" />

        {/* Radial glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '600px',
            height: '600px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(0,224,198,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Corner accent lines */}
        <div
          className="absolute top-0 left-0 w-24 h-px"
          style={{ background: 'linear-gradient(90deg, #00e0c6, transparent)' }}
        />
        <div
          className="absolute top-0 left-0 w-px h-24"
          style={{ background: 'linear-gradient(180deg, #00e0c6, transparent)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-24 h-px"
          style={{ background: 'linear-gradient(270deg, #a78bfa, transparent)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-px h-24"
          style={{ background: 'linear-gradient(0deg, #a78bfa, transparent)' }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Status pill */}
          <div
            className="anim-fade-up inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs mb-6 md:mb-8 font-body font-medium"
            style={{
              background: 'rgba(0, 224, 198, 0.06)',
              border: '1px solid rgba(0, 224, 198, 0.15)',
              color: '#00e0c6',
              animationDelay: '0ms',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full glow-pulse" style={{ background: '#00e0c6' }} />
            Interactive 3D Visual Learning
          </div>

          {/* Headline */}
          <h1
            className="anim-fade-up font-display font-extrabold text-4xl md:text-7xl mb-5 leading-[1.05] tracking-tight"
            style={{ animationDelay: '80ms' }}
          >
            <span className="text-ink">See Math.</span>
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #00e0c6 0%, #a78bfa 50%, #ff6b6b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Understand Math.
            </span>
          </h1>

          {/* Subhead */}
          <p
            className="anim-fade-up text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto font-body font-light leading-relaxed"
            style={{ color: '#7a7d8e', animationDelay: '160ms' }}
          >
            Explore mathematical concepts through beautiful 3D animations.
            Enter your own values and watch models respond in real time.
          </p>

          {/* Action Buttons */}
          <div className="anim-fade-up flex flex-col sm:flex-row justify-center items-center gap-4 mb-10 max-w-sm mx-auto sm:max-w-none" style={{ animationDelay: '200ms' }}>
            <Link
              to="/cheat-sheet"
              className="px-6 py-3 rounded-full text-sm font-display font-bold transition-all duration-300 hover:scale-105 w-full sm:w-auto text-center flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #00e0c6 0%, #a78bfa 100%)',
                color: '#08090d',
                boxShadow: '0 4px 20px rgba(0, 224, 198, 0.2)',
              }}
            >
              📚 Formula Cheat Sheet
            </Link>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="px-6 py-3 rounded-full text-sm font-display font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto"
              style={{
                background: 'rgba(18, 20, 28, 0.8)',
                color: '#00e0c6',
                border: '1px solid rgba(0, 224, 198, 0.2)',
                boxShadow: '0 4px 20px rgba(0, 224, 198, 0.1)',
              }}
            >
              <span>🧠</span> Intelligent Search
            </button>
          </div>

          {/* Feature chips */}
          <div
            className="anim-fade-up flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm font-body"
            style={{ color: '#4a4d5e', animationDelay: '240ms' }}
          >
            {[
              { icon: '◆', label: `${topics.length} Topics`, color: '#00e0c6' },
              { icon: '◆', label: 'Live 3D Models', color: '#a78bfa' },
              { icon: '◆', label: 'Step-by-step Proofs', color: '#ff6b6b' },
              { icon: '◆', label: 'Custom Values', color: '#fbbf24' },
            ].map((f) => (
              <span key={f.label} className="flex items-center gap-2">
                <span style={{ color: f.color, fontSize: '8px' }}>{f.icon}</span>
                <span>{f.label}</span>
              </span>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="mt-8 text-[10px] font-display font-bold uppercase tracking-[0.2em] flex flex-col items-center gap-2 animate-pulse" style={{ color: '#4a4d5e' }}>
            <span>scroll down or select topic from below</span>
            <span style={{ color: '#00e0c6', fontSize: '14px' }}>↓</span>
          </div>
        </div>

        {/* ── Marquee Topics ── */}
        <div className="relative mt-10 mx-[-1.5rem] md:mx-[-2rem] overflow-hidden">
          <div className="flex animate-marquee w-max gap-4 py-2">
            {/* First set of topics */}
            {topics.map((t) => (
              <Link
                key={t.id}
                to={`/topic/${t.id}`}
                className="px-4 py-1.5 rounded-full text-xs font-body font-medium border border-white/5 bg-white/[0.02] text-ink-muted hover:text-neon-teal hover:border-neon-teal/20 hover:bg-neon-teal/5 transition-colors whitespace-nowrap flex items-center gap-2"
              >
                <span>{t.icon}</span>
                <span>{t.title}</span>
              </Link>
            ))}
            {/* Duplicate set for seamless loop */}
            {topics.map((t) => (
              <Link
                key={`${t.id}-dup`}
                to={`/topic/${t.id}`}
                className="px-4 py-1.5 rounded-full text-xs font-body font-medium border border-white/5 bg-white/[0.02] text-ink-muted hover:text-neon-teal hover:border-neon-teal/20 hover:bg-neon-teal/5 transition-colors whitespace-nowrap flex items-center gap-2"
              >
                <span>{t.icon}</span>
                <span>{t.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>


      {/* ── Topics grid ── */}
      <div className="px-6 md:px-8 pb-16 pt-6">
        <div className="max-w-5xl mx-auto">
          {['Geometry', 'Algebra', 'Calculus'].map((cat) => {
            const items = topics.filter((t) => t.category === cat)
            if (!items.length) return null
            const accent = categoryAccent[cat]

            return (
              <div key={cat} className="mb-10">
                {/* Category header with decorative lines */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1" style={{ background: `${accent}18` }} />
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: accent,
                        boxShadow: `0 0 8px ${accent}50`,
                      }}
                    />
                    <h2
                      className="text-[11px] font-display font-bold uppercase tracking-[0.2em]"
                      style={{ color: accent }}
                    >
                      {cat}
                    </h2>
                  </div>
                  <div className="h-px flex-1" style={{ background: `${accent}18` }} />
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((topic, idx) => {
                    const ds = difficultyStyle[topic.difficulty] ?? difficultyStyle.Beginner
                    return (
                      <Link
                        key={topic.id}
                        to={`/topic/${topic.id}`}
                        className="anim-fade-up topic-card glow-border block rounded-2xl p-5 no-underline"
                        style={{
                          animationDelay: `${idx * 100}ms`,
                          background: '#12141c',
                          border: '1px solid rgba(255,255,255,0.05)',
                        }}
                      >
                        {/* Icon + difficulty */}
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                            style={{
                              background: 'rgba(255,255,255,0.03)',
                              border: '1px solid rgba(255,255,255,0.05)',
                            }}
                          >
                            {topic.icon}
                          </div>
                          <span
                            className="text-[10px] font-body font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide"
                            style={{
                              background: ds.bg,
                              color: ds.text,
                              border: `1px solid ${ds.border}`,
                            }}
                          >
                            {topic.difficulty}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display font-semibold text-base mb-1.5 text-ink">
                          {topic.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs leading-relaxed font-body mb-4" style={{ color: '#7a7d8e' }}>
                          {topic.description}
                        </p>

                        {/* Footer: formula preview + CTA */}
                        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                          <span
                            className="text-xs font-mono px-2 py-0.5 rounded"
                            style={{
                              background: 'rgba(0, 224, 198, 0.06)',
                              color: '#4a4d5e',
                              border: '1px solid rgba(0, 224, 198, 0.08)',
                            }}
                          >
                            {topic.formulaPreview}
                          </span>
                          <span
                            className="text-xs font-display font-semibold tracking-wide"
                            style={{ color: '#00e0c6' }}
                          >
                            Explore →
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Tutorial Section ── */}
      <div className="px-6 md:px-8 pt-2 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
            <h2 className="text-[11px] font-display font-bold uppercase tracking-[0.2em] text-ink-muted">
              How To Use It
            </h2>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
          </div>

          <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-4 snap-x scrollbar-thin">
            {/* Step 1 */}
            <div className="anim-fade-up group flex-shrink-0 w-[260px] sm:w-auto snap-center" style={{ animationDelay: '300ms' }}>
              <div className="relative rounded-xl p-5 bg-void-50 border border-void-200 hover:border-neon-teal transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-full bg-neon-teal/10 flex items-center justify-center text-neon-teal font-display font-bold mb-4 anim-float">
                  1
                </div>
                <h3 className="text-ink font-display font-semibold text-sm mb-2">Pick a Topic</h3>
                <p className="text-ink-muted text-xs font-body leading-relaxed">
                  Browse the collection below and select a concept to explore.
                </p>
                <div className="absolute inset-0 border border-neon-teal opacity-0 group-hover:opacity-20 rounded-xl transition-opacity pointer-events-none" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="anim-fade-up group flex-shrink-0 w-[260px] sm:w-auto snap-center" style={{ animationDelay: '400ms' }}>
              <div className="relative rounded-xl p-5 bg-void-50 border border-void-200 hover:border-neon-violet transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-full bg-neon-violet/10 flex items-center justify-center text-neon-violet font-display font-bold mb-4 anim-float" style={{ animationDelay: '0.2s' }}>
                  2
                </div>
                <h3 className="text-ink font-display font-semibold text-sm mb-2">Interact in 3D</h3>
                <p className="text-ink-muted text-xs font-body leading-relaxed">
                  Drag to rotate the model, scroll to zoom, and see it from any angle.
                </p>
                <div className="absolute inset-0 border border-neon-violet opacity-0 group-hover:opacity-20 rounded-xl transition-opacity pointer-events-none" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="anim-fade-up group flex-shrink-0 w-[260px] sm:w-auto snap-center" style={{ animationDelay: '500ms' }}>
              <div className="relative rounded-xl p-5 bg-void-50 border border-void-200 hover:border-neon-coral transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-full bg-neon-coral/10 flex items-center justify-center text-neon-coral font-display font-bold mb-4 anim-float" style={{ animationDelay: '0.4s' }}>
                  3
                </div>
                <h3 className="text-ink font-display font-semibold text-sm mb-2">Tweak Variables</h3>
                <p className="text-ink-muted text-xs font-body leading-relaxed">
                  Move sliders to change values and watch the models update live.
                </p>
                <div className="absolute inset-0 border border-neon-coral opacity-0 group-hover:opacity-20 rounded-xl transition-opacity pointer-events-none" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="anim-fade-up group flex-shrink-0 w-[260px] sm:w-auto snap-center" style={{ animationDelay: '600ms' }}>
              <div className="relative rounded-xl p-5 bg-void-50 border border-void-200 hover:border-neon-amber transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-full bg-neon-amber/10 flex items-center justify-center text-neon-amber font-display font-bold mb-4 anim-float" style={{ animationDelay: '0.6s' }}>
                  4
                </div>
                <h3 className="text-ink font-display font-semibold text-sm mb-2">Follow Proofs</h3>
                <p className="text-ink-muted text-xs font-body leading-relaxed">
                  Step through interactive proofs to understand the logic.
                </p>
                <div className="absolute inset-0 border border-neon-amber opacity-0 group-hover:opacity-20 rounded-xl transition-opacity pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 text-center text-xs font-body" style={{ color: '#4a4d5e', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <p>Developed by <span style={{ color: '#00e0c6', fontWeight: 'bold' }}>Mohammed Nihal</span></p>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 backdrop-blur-sm"
          style={{ background: 'rgba(8, 9, 13, 0.7)' }}
          onClick={() => setIsSearchOpen(false)}
        >
          <div 
            className="w-full max-w-3xl bg-void-50 border rounded-2xl p-4 md:p-6 shadow-2xl max-h-[90vh] overflow-y-auto anim-fade-up"
            style={{
              background: 'rgba(18, 20, 28, 0.75)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
              animationDuration: '0.3s',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-display font-bold text-ink flex items-center gap-2">
                <span>🧠</span> Intelligent Search
              </h2>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-ink-muted hover:text-ink transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Input */}
            <div className="relative mb-4 md:mb-6">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">🔍</span>
              <input 
                ref={inputRef}
                type="text"
                placeholder="Ask anything about Math"
                className="w-full bg-void border border-void-200 rounded-xl pl-11 pr-24 py-3 text-ink font-body focus:outline-none focus:border-neon-teal transition-colors text-sm md:text-base"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.05)',
                  boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)',
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-20 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors"
                >
                  ✕
                </button>
              )}
              <button 
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 md:px-4 py-1 md:py-1.5 rounded-lg bg-neon-teal text-void font-display font-bold text-xs"
                style={{
                  background: '#00e0c6',
                  color: '#08090d',
                }}
              >
                Search
              </button>
            </div>

            {/* Results */}
            <div className="results-area mt-4">
              {/* Local Results */}
              {localResults.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-display font-bold uppercase tracking-wider text-neon-teal mb-3">
                    Interactive Models
                  </h3>
                  <div className="space-y-3">
                    {localResults.map((topic) => (
                      <Link
                        key={topic.id}
                        to={`/topic/${topic.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="p-3 rounded-xl bg-void border border-neon-teal/20 hover:border-neon-teal/50 hover:shadow-[0_0_15px_rgba(0,224,198,0.1)] transition-all duration-300 flex items-center justify-between"
                        style={{ background: 'rgba(0, 224, 198, 0.02)' }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{topic.icon}</span>
                          <div>
                            <h4 className="text-sm font-display font-bold text-ink">{topic.title}</h4>
                            <p className="text-xs text-ink-muted">{topic.description}</p>
                          </div>
                        </div>
                        <span className="text-neon-teal text-xs font-display font-bold">Explore →</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Web Results Header */}
              {(isLoading || (Array.isArray(searchResult) && searchResult.length > 0)) && (
                <h3 className="text-xs font-display font-bold uppercase tracking-wider text-ink-muted mb-3">
                  Web Results
                </h3>
              )}

              {/* Web Results Content */}
              {isLoading ? (
                <div className="space-y-4 py-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 rounded-xl bg-void border border-white/5 animate-pulse">
                      <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-white/5 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-white/5 rounded w-full"></div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <p className="text-red-500 text-sm font-body">{error}</p>
              ) : Array.isArray(searchResult) && searchResult.length > 0 ? (
                <div className="space-y-3 md:space-y-4">
                  {searchResult.map((res, idx) => (
                    <div 
                      key={res.id || idx}
                      className="p-3 md:p-4 rounded-xl bg-void border border-void-200 hover:border-neon-teal/50 hover:shadow-[0_0_15px_rgba(0,224,198,0.1)] transition-all duration-300 anim-fade-up"
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        borderColor: 'rgba(255,255,255,0.05)',
                        animationDelay: `${idx * 50}ms`,
                      }}
                    >
                      <a 
                        href={res.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs md:text-sm font-display font-bold text-neon-teal hover:underline block mb-1 break-words"
                        style={{ color: '#00e0c6' }}
                      >
                        {res.name}
                      </a>
                      <span className="text-[10px] md:text-xs text-ink-muted font-body block mb-1 md:mb-2 break-all" style={{ color: '#4a4d5e' }}>
                        {res.displayUrl}
                      </span>
                      {res.snippet && (
                        <p className="text-[11px] md:text-xs text-ink-muted font-body leading-relaxed break-words" style={{ color: '#7a7d8e' }}>
                          {res.snippet}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : localResults.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-ink-muted text-sm font-body mb-4">
                    Ask a question to get started, or try one of these:
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Area of Cone', 'Pythagoras Theorem', 'Volume of Cylinder', 'Trigonometry Basics'].map((chip) => (
                      <button
                        key={chip}
                        onClick={() => {
                          setSearchQuery(chip)
                          handleSearch(chip)
                        }}
                        className="px-3 py-1.5 rounded-full text-xs font-body font-medium bg-void border border-white/5 text-ink-muted hover:text-neon-teal hover:border-neon-teal/20 hover:bg-neon-teal/5 transition-colors"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
