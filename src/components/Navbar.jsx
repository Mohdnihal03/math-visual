import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav
      className="px-6 py-4 flex items-center justify-between z-10 shrink-0"
      style={{
        background: 'rgba(8, 9, 13, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <Link to="/" className="flex items-center gap-3 no-underline group">
        {/* Logo mark — glowing geometric diamond */}
        <img src="/ganith-samaaj.png" alt="Logo" className="w-12 h-12 object-contain" />
        <span className="font-display font-bold text-xl tracking-tight text-ink">
          Ganith<span style={{ color: '#00e0c6' }}>Samaaj</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-3">
        {/* Status badge */}
        <span
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-body font-medium"
          style={{
            background: 'rgba(0, 224, 198, 0.08)',
            border: '1px solid rgba(0, 224, 198, 0.15)',
            color: '#00e0c6',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full glow-pulse"
            style={{ background: '#00e0c6' }}
          />
          Visual Math Learning ✨
        </span>
      </div>
    </nav>
  )
}
