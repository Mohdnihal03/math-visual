import React from 'react'
import { Link } from 'react-router-dom'
import { topics } from '../topics'
import FormulaDisplay from '../components/FormulaDisplay'

export default function CheatSheet() {
  return (
    <div className="min-h-screen bg-[#08090d] text-white font-body p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <Link to="/" className="text-[#7a7d8e] hover:text-white transition-colors text-sm flex items-center gap-2 mb-2">
            ← Back to Topics
          </Link>
          <h1 className="text-3xl font-display font-bold text-white glow-text">
            📚 Formula Cheat Sheet
          </h1>
          <p className="text-[#7a7d8e] mt-1">
            All your formulas with memory tips in one place.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(145deg, #14161f 0%, #0c0d14 100%)',
              border: '1px solid rgba(255,255,255,0.04)',
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{topic.icon}</span>
              <div>
                <h2 className="text-lg font-display font-bold text-white">
                  {topic.title}
                </h2>
                <span className="text-xs uppercase tracking-wider text-[#7a7d8e]">
                  {topic.category}
                </span>
              </div>
            </div>

            {/* Formulas */}
            <div className="space-y-3 mb-4">
              {topic.formulas.map((f, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#1a1c26] border border-white/[0.02]">
                  <p className="text-xs text-[#7a7d8e] mb-1">{f.label}</p>
                  <FormulaDisplay formula={f.latex} displayMode={false} className="text-[#00e0c6]" />
                </div>
              ))}
            </div>

            {/* Tips */}
            {topic.tips && (
              <div
                className="p-3 rounded-lg text-sm"
                style={{
                  background: 'rgba(251, 191, 36, 0.04)',
                  border: '1px solid rgba(251, 191, 36, 0.1)',
                  color: '#fbbf24',
                }}
              >
                <span className="font-bold">💡 Tip:</span> {topic.tips}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
