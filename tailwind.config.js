
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-text': '#262626',
        'secondary-text': '#989898',

        'tab': '#F8F8F8',
        'tab-color': '#FD8C73',
        'tab-border': '#DBDBDB',

        'bg-buttom-color': '#0587FF'
      },
      backgroundImage: {
        'bg-button-gradient-custom': 'linear-gradient(to left, #0587FF, #0056A6)',
      },
      screens: {
        sm: '0px',
        md: '740px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
}

