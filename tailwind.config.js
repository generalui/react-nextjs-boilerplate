// eslint-disable-next-line @typescript-eslint/no-var-requires
const client = require('./client.config.js')

// TODO: remove daisy ui
// TODO: copy daisy ui toggles
module.exports = {
	content: [
		'./src/components/**/*.tsx',
		'./src/components/**/*.ts',
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
	theme: client.tailwindTheme,
	plugins: [require('@tailwindcss/line-clamp'), require('daisyui'), require('flowbite/plugin')],
	daisyui: {
		themes: ['light']
	}
}
