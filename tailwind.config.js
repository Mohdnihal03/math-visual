/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Lexend', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        void: {
          DEFAULT: '#08090d',
          50: '#12141c',
          100: '#1a1d2b',
          200: '#23273a',
          300: '#2e3349',
        },
        neon: {
          teal: '#00e0c6',
          coral: '#ff6b6b',
          amber: '#fbbf24',
          violet: '#a78bfa',
        },
        ink: {
          DEFAULT: '#e8e6e3',
          muted: '#7a7d8e',
          faint: '#4a4d5e',
        },
      },
    },
  },
  plugins: [],
}
