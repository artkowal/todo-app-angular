/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
    darkMode: 'class',
    theme: {
      extend: {
        fontSize: {
          'fluid-h1': 'var(--font-h1)',
          'fluid-h2': 'var(--font-h2)',
          'fluid-body': 'var(--font-body)',
          'fluid-small': 'var(--font-small)',
        },
        colors: {
          brand: {
            50:  '#E3F2FD',
            100: '#BBDEFB',
            500: '#1565C0',
            700: '#0D47A1',
          },
          success: '#2E7D32',
          warning: '#E65100',
          danger:  '#B71C1C',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#1e1e1e',
          hover: '#2c2c2c',
        },
        outline: {
          light: '#e5e7eb',
          dark: '#374151',
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        },
        borderRadius: {
          'xl':  '1rem',
          '2xl': '1.5rem',
        },
      },
    },
    plugins: [],
}

