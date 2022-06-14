module.exports = {
	content: ['./src/components/**/*.tsx', './src/styles/**/*.css', './pages/**/*.tsx'],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						color: '#474747'
					}
				}
			}
		}
	},
	plugins: [require('daisyui'), require('flowbite/plugin'), require('@tailwindcss/line-clamp')],
	daisyui: {
		themes: ['light']
	}
}
