/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9', // Cyan blue
        secondary: '#8b5cf6', // Purple
        accent: '#06ffa5', // Neon green
        'neon-blue': '#00d4ff',
        'neon-purple': '#a855f7',
        'neon-pink': '#ec4899',
        'dark-bg': '#0f0f23',
        'dark-card': '#1a1a2e',
        'dark-surface': '#16213e',
        'text-dark': '#ffffff',
        'text-light': '#94a3b8',
        'bg-light': '#0f0f23',
        'glass': 'rgba(255, 255, 255, 0.1)'
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-right': 'fadeInRight 1s ease-out',
        'slide-in': 'slideIn 1s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'card-fade-in': 'cardFadeIn 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'neon-flicker': 'neon-flicker 1.5s infinite alternate',
        'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
        'matrix': 'matrix 20s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInRight: {
          'from': { opacity: '0', transform: 'translateX(30px)' },
          'to': { opacity: '1', transform: 'translateX(0)' }
        },
        slideIn: {
          'from': { width: '0' },
          'to': { width: '100%' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        cardFadeIn: {
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor' },
          '100%': { boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor' }
        },
        'rotate-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' }
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        'neon-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        'matrix': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        }
      },
      spacing: {
        '15': '3.75rem',
        '30': '7.5rem',
      }
    },
  },
  plugins: [],
}
