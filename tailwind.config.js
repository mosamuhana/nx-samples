//const config = require('./apps/web/tailwind.config.js');
//const config = require('./apps/angular-material-template2/tailwind.config.js');
const config = require('./apps/appwrite-app/tailwind.config.js');

module.exports = {
  ...config,
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};

/*
  theme: {
    extend: {
      colors: {
        ...customColors,
        black: 'var(--colors-black)',
        white: 'var(--colors-white)'
      },
      variables: {
        DEFAULT: {
          colors: {
            white: '#000000',
            black: '#ffffff',
          },
        }
      },
      darkVariables: {
        DEFAULT: {
          colors: {
            white: '#ffffff',
            black: '#000000',
          },
        },
      },
    },
  },
  plugins: [
    require('@mertasan/tailwindcss-variables')({
      darkToRoot: true
    }),
  ],
*/
