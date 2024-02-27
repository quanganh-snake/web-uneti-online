module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'uneti-primary': '#245d7c',
        'uneti-primary-light': '#336699',
        'uneti-primary-lighter': '#0484ac',
        transparent: 'transparent',
        current: 'currentColor',
        'vs-primary': '#195bff',
        'vs-success': '#46c93a',
        'vs-danger': '#ff4757',
        'vs-warn': '#ffba00',
        'vs-dark': '#1e1e1e',
        'vs-text': '#2c3e50',
        'vs-theme-layout': 'rgba(255, 255, 255)',
        'vs-theme-color': 'rgba(44, 62, 80)',
        'vs-theme-bg': 'rgba(244, 247, 248)',
      },
      borderRadius: {
        // exclude top left
        'exclude-tl': '12px 22px 22px 22px',
      },
      boxShadow: {
        icon: '0 8px 25px 0 rgba(0, 0, 0, 0.04)',
        'module-item': '0 15px 30px -8px #00000010'
      },
    },

    /**
     * Customizing breakpoint
     * Need to sync with @/assets/Styles/Commons/var.scss -> $breakpoints
     */
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
}
