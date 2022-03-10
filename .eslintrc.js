module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		extraFileExtensions: ['.json', '.mjs']
	},
	plugins: ['@typescript-eslint', 'unused-imports', 'jsx-a11y'],
	extends: [
		'next',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		// JSX-A11y Configurations can be found at
		// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
		'plugin:jsx-a11y/recommended'
	],
	rules: {
		// Nextjs rules omited for static rendering
		// https://nextjs.org/docs/basic-features/eslint#eslint-plugin
		// Turn these rules on for Next Fullstack
		'@next/next/no-img-element': 'off'
	}
}
