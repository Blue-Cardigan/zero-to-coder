/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': '0.875rem',    // Increased from 0.75rem (14px)
        'sm': '1rem',        // Increased from 0.875rem (16px)
        'base': '1.125rem',  // Increased from 1rem (18px)
        'lg': '1.5rem',     // Increased from 1.125rem (20px)
        'xl': '1.75rem',      // Increased from 1.25rem (24px)
        '2xl': '2rem',    // Increased from 1.4rem (28px)
        '3xl': '2.5rem',       // Increased from 1.75rem (32px)
        '4xl': '3rem',     // Increased from 2rem (40px)
        '5xl': '3.5rem',       // Increased from 2.5rem (48px)
        '6xl': '4rem',     // Increased from 3rem (56px)
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'black/30': 'rgba(0, 0, 0, 0.3)',
      },
      borderColor: {
        'pink-500/50': 'rgba(236, 72, 153, 0.5)',
        'pink-400/80': 'rgba(244, 114, 182, 0.8)',
        'blue-500/50': 'rgba(59, 130, 246, 0.5)',
        'white/20': 'rgba(255, 255, 255, 0.2)',
        'white/30': 'rgba(255, 255, 255, 0.3)',
        'fuchsia-500/50': 'rgba(217, 70, 239, 0.5)',
        'emerald-500/50': 'rgba(16, 185, 129, 0.5)',
      },
      backdropBlur: {
        'lg': '16px',
      },
      animation: {
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
}; 