import { Link, useParams, useLocation } from 'react-router-dom'
import { topics } from '../topics/index'

const categoryAccent = {
  Geometry: '#00e0c6',
  Algebra: '#a78bfa',
  Calculus: '#ff6b6b',
}

export default function Sidebar() {
  const { id } = useParams()
  const location = useLocation()

  // Hide sidebar on landing page
  if (location.pathname === '/') {
    return null
  }

  const grouped = topics.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = []
    acc[t.category].push(t)
    return acc
  }, {})

  return (
    <aside
      className="w-64 shrink-0 flex flex-col overflow-y-auto hidden md:flex"
      style={{
        background: '#0c0d14',
        borderRight: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Header */}
      <div className="p-4 pt-5">
        <p
          className="text-[10px] font-display font-semibold uppercase tracking-[0.2em] mb-5"
          style={{ color: '#4a4d5e' }}
        >
          Explore
        </p>

        {Object.entries(grouped).map(([category, items]) => {
          const accent = categoryAccent[category] ?? '#00e0c6'
          return (
            <div key={category} className="mb-6">
              {/* Category label */}
              <div className="flex items-center gap-2 mb-2.5 px-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: accent, boxShadow: `0 0 6px ${accent}50` }}
                />
                <p
                  className="text-[10px] font-display font-semibold uppercase tracking-[0.18em]"
                  style={{ color: accent }}
                >
                  {category}
                </p>
              </div>

              {/* Topic links */}
              <div className="flex flex-col gap-0.5">
                {items.map((topic) => {
                  const active = id === topic.id
                  return (
                    <Link
                      key={topic.id}
                      to={`/topic/${topic.id}`}
                      className={`sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm no-underline font-body ${
                        active ? 'active' : ''
                      }`}
                      style={{
                        borderLeft: active
                          ? `2px solid ${accent}`
                          : '2px solid transparent',
                        fontWeight: active ? 600 : 400,
                        color: active ? '#00e0c6' : '#7a7d8e',
                        background: active ? 'rgba(0, 224, 198, 0.06)' : 'transparent',
                      }}
                    >
                      <span className="text-base leading-none">{topic.icon}</span>
                      <span className="truncate">{topic.title}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div
        className="mt-auto p-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <p className="text-xs font-body" style={{ color: '#4a4d5e' }}>
          <span style={{ color: '#00e0c6' }}>{topics.length}</span> interactive topics
        </p>
      </div>
    </aside>
  )
}
