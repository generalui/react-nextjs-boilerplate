module.exports = {
	content: [
		'./src/components/**/*.tsx',
		'./src/styles/**/*.css',
		'./pages/**/*.tsx',
		'./node_modules/flowbite/**/*.js',
		'./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
	],
	safelist: [
		{
			pattern: /col-span/
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
			}
		}
	},
	plugins: [require('@tailwindcss/line-clamp'), require('daisyui'), require('flowbite/plugin')],
	daisyui: {
		themes: ['light']
	}
}
