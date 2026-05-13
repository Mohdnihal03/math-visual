export default function ValueControl({ control, value, onChange }) {
  const pct = ((value - control.min) / (control.max - control.min)) * 100

  return (
    <div className="flex flex-col gap-2">
      {/* Label + value badge */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-body font-medium" style={{ color: '#7a7d8e' }}>
          {control.label}
          {control.unit && (
            <span className="ml-1 text-xs" style={{ color: '#4a4d5e' }}>
              ({control.unit})
            </span>
          )}
        </label>
        <div
          className="px-2.5 py-0.5 rounded-md font-mono text-sm font-semibold"
          style={{
            background: 'rgba(0, 224, 198, 0.1)',
            color: '#00e0c6',
            border: '1px solid rgba(0, 224, 198, 0.15)',
            minWidth: '52px',
            textAlign: 'center',
          }}
        >
          {Number(value).toFixed(control.step < 1 ? 1 : 0)}
        </div>
      </div>

      {/* Slider track + fill */}
      <div className="relative">
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1 rounded-full pointer-events-none"
          style={{
            left: 0,
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #00e0c6, #a78bfa)',
            boxShadow: '0 0 8px rgba(0, 224, 198, 0.2)',
          }}
        />
        <input
          type="range"
          min={control.min}
          max={control.max}
          step={control.step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full relative"
          style={{ background: 'transparent' }}
        />
      </div>

      {/* Min/max labels */}
      <div className="flex justify-between text-xs font-mono" style={{ color: '#4a4d5e' }}>
        <span>{control.min}</span>
        <span>{control.max}</span>
      </div>
    </div>
  )
}
