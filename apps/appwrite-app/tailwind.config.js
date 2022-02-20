const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
	content: [
		join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
		...createGlobPatternsForDependencies(__dirname),
	],
	theme: {
		extend: {},
    fontFamily: {
      sans: ["Avenir", "Helvetica", "Arial", "sans-serif"],
    },
	},
	plugins: [],
};
