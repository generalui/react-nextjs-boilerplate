// eslint-disable-next-line @typescript-eslint/no-var-requires
const client = require('./client.config.js')

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
		},
		{
			pattern: /h/
		},
		{
			pattern: /overflow/
		}
	],
	theme: client.tailwindTheme,
	plugins: [require('@tailwindcss/line-clamp'), require('flowbite/plugin')]
}
