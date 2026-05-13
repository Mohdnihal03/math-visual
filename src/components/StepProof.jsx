import { useState } from 'react'
import FormulaDisplay from './FormulaDisplay'

export default function StepProof({ steps, onStepChange }) {
  const [revealed, setRevealed] = useState(0)

  const handleStepChange = (newStep) => {
    setRevealed(newStep)
    if (onStepChange) {
      onStepChange(newStep)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {steps.map((step, i) => {
        const visible = i <= revealed
        const current = i === revealed
        return (
          <div
            key={i}
            className="rounded-xl p-4 transition-all duration-300 cursor-pointer"
            onClick={() => handleStepChange(i)}
            style={{
              background: visible ? 'rgba(18, 20, 28, 0.8)' : 'rgba(18, 20, 28, 0.3)',
              border: current
                ? '1px solid rgba(0, 224, 198, 0.35)'
                : visible
                  ? '1px solid rgba(255,255,255,0.06)'
                  : '1px solid rgba(255,255,255,0.02)',
              opacity: visible ? 1 : 0.35,
              boxShadow: current
                ? '0 0 20px rgba(0, 224, 198, 0.06), inset 0 1px 0 rgba(0, 224, 198, 0.08)'
                : 'none',
            }}
          >
            <div className="flex items-start gap-3">
              {/* Step number */}
              <span
                className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-display font-bold"
                style={{
                  background: current
                    ? '#00e0c6'
                    : visible
                      ? 'rgba(0, 224, 198, 0.12)'
                      : 'rgba(255,255,255,0.04)',
                  color: current
                    ? '#08090d'
                    : visible
                      ? '#00e0c6'
                      : '#4a4d5e',
                  boxShadow: current ? '0 0 10px rgba(0, 224, 198, 0.3)' : 'none',
                }}
              >
                {i + 1}
              </span>

              <div className="flex-1 min-w-0">
                <p className="text-sm mb-2 font-body" style={{ color: '#7a7d8e' }}>
                  {step.text}
                </p>
                {step.latex && (
                  <div
                    className="rounded-lg px-3 py-2"
                    style={{
                      background: 'rgba(0, 224, 198, 0.04)',
                      border: '1px solid rgba(0, 224, 198, 0.08)',
                    }}
                  >
                    <FormulaDisplay formula={step.latex} displayMode={false} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}

      {/* Action buttons */}
      <div className="flex gap-2 mt-2">
        {revealed < steps.length - 1 && (
          <button
            onClick={() => handleStepChange(revealed + 1)}
            className="hidden md:inline-block px-4 py-2 rounded-lg text-sm font-body font-medium transition-all"
            style={{
              background: 'rgba(0, 224, 198, 0.1)',
              color: '#00e0c6',
              border: '1px solid rgba(0, 224, 198, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 224, 198, 0.18)'
              e.currentTarget.style.boxShadow = '0 0 16px rgba(0, 224, 198, 0.12)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 224, 198, 0.1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Next Step →
          </button>
        )}
        {revealed > 0 && (
          <button
            onClick={() => handleStepChange(0)}
            className="px-4 py-2 rounded-lg text-sm font-body transition-all"
            style={{
              background: 'rgba(255,255,255,0.04)',
              color: '#7a7d8e',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            Reset
          </button>
        )}
        {revealed === steps.length - 1 && (
          <span
            className="px-4 py-2 text-sm font-body font-medium flex items-center gap-1.5"
            style={{ color: '#00e0c6' }}
          >
            <span className="glow-pulse">✦</span> Proof complete
          </span>
        )}
      </div>
    </div>
  )
}
