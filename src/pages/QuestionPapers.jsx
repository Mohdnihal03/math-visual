import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function QuestionPapers() {
  const [selectedYear, setSelectedYear] = useState('2024')

  const years = ['2025', '2024', '2023', '2022', '2021', '2020', '2019']

  return (
    <div className="min-h-screen bg-[#08090d] text-white font-body p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <Link to="/" className="text-[#7a7d8e] hover:text-white transition-colors text-sm flex items-center gap-2 mb-2">
            ← Back to Topics
          </Link>
          <h1 className="text-3xl font-display font-bold text-white glow-text">
            📝 Class 12 Math Papers
          </h1>
          <p className="text-[#7a7d8e] mt-1">
            Access previous year papers from top educational sources.
          </p>
        </div>
      </div>

      {/* Dropdowns */}
      <div className="max-w-6xl mx-auto mb-8 p-6 rounded-2xl bg-[#14161f] border border-white/[0.04] flex flex-wrap gap-6 items-center">
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-wider text-[#7a7d8e]">Select Year</label>
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-[#0c0d14] text-white border border-white/10 rounded-lg p-3 font-display font-bold focus:outline-none focus:border-[#00e0c6] min-w-[150px]"
          >
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div className="text-sm text-[#7a7d8e] mt-4 lg:mt-0 lg:ml-auto">
          ℹ️ Note: These links point to external resources.
        </div>
      </div>

      {/* Result Card */}
      <div className="max-w-6xl mx-auto">
        <div
          className="rounded-2xl p-6 transition-all duration-300 max-w-md mx-auto lg:mx-0"
          style={{
            background: 'linear-gradient(145deg, #14161f 0%, #0c0d14 100%)',
            border: '1px solid rgba(255,255,255,0.04)',
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-[#00e0c6]">{selectedYear}</span>
            <span className="text-xs uppercase tracking-wider text-[#7a7d8e]">
              Class 12 Maths
            </span>
          </div>
          <h2 className="text-lg font-display font-bold text-white mb-2">
            Mathematics Question Paper
          </h2>
          <p className="text-sm text-[#7a7d8e] mb-6">
            Access the paper on your preferred platform:
          </p>

          <div className="space-y-3">
            <a
              href="https://www.learncbse.in/cbse-previous-year-question-papers-class-12-maths/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block text-center py-3 px-4 rounded-lg font-bold text-sm transition-all duration-200"
              style={{
                background: '#ff005520',
                color: '#ff0055',
                border: '1px solid #ff005540',
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#ff0055'
                e.target.style.color = '#fff'
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#ff005520'
                e.target.style.color = '#ff0055'
              }}
            >
              View on LearnCBSE ↗
            </a>

            <a
              href="https://www.selfstudys.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block text-center py-3 px-4 rounded-lg font-bold text-sm transition-all duration-200"
              style={{
                background: '#00e0c620',
                color: '#00e0c6',
                border: '1px solid #00e0c640',
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#00e0c6'
                e.target.style.color = '#fff'
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#00e0c620'
                e.target.style.color = '#00e0c6'
              }}
            >
              View on SelfStudys ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
