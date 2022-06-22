module.exports = {
	content: [
		'./src/components/**/*.tsx',
		'./src/styles/**/*.css',
		'./pages/**/*.tsx',
		'./node_modules/flowbite/**/*.js'
	],
	safelist: [
		{
			pattern: /col-span/
		},
		{
			pattern: /max-w/
		}
	],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						color: '#474747'
					}
				}
			},
			colors: {
				'blue-100': '#D5F2FF',
				'blue-200': '#C7E9FF',
				'blue-600': '#0093D8',
				'blue-700': '#0773b0'
			}
		}
	},
	plugins: [require('@tailwindcss/line-clamp'), require('daisyui'), require('flowbite/plugin')],
	daisyui: {
		themes: ['light']
	}
}
