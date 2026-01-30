/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.8s ease-out',
        'slideUp': 'slideUp 0.6s ease-out',
        'pulse-gentle': 'pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'scaleIn': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        slideUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          }
        },
        scaleIn: {
          'from': {
            opacity: '0',
            transform: 'scale(0.8)'
          },
          'to': {
            opacity: '1',
            transform: 'scale(1)'
          }
        }
      }
    },
  },
  plugins: [],
}

