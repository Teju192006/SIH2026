/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Lexend', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        ink: '#0B1F3A',
        ink2: '#12294A',
        mist: '#F3F6FA',
        line: '#E1E8F0',
        clinical: {
          50: '#EAF7FB',
          100: '#CFEFF7',
          400: '#2FA9CE',
          500: '#1487AC',
          600: '#0D6E8C',
        },
        safe: '#1E8E5A',
        caution: '#C7811C',
        danger: '#C22A2A',
        xai: '#6B4FBB',
        cyan: '#00D4FF',
        purple: '#7C3AED',
        neon: '#00FF88',
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,31,58,0.06), 0 1px 0 rgba(11,31,58,0.04)',
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-purple': '0 0 20px rgba(124, 58, 237, 0.3)',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #0B1F3A 0%, #1a3a52 50%, #0B1F3A 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)',
      }
    },
  },
  plugins: [],
}
