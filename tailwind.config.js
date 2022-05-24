module.exports = {
	content: ['./src/components/**/*.tsx', './src/styles/**/*.css', './pages/**/*.tsx'],
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/forms'), require('daisyui')]
}
