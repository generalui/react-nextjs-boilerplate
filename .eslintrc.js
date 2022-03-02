module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		extraFileExtensions: ['.json', '.mjs']
	},
	plugins: ['@typescript-eslint', 'unused-imports'],
	extends: [
		'next',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended'
	],
	rules: {
		// Nextjs rules omited for static rendering
		// https://nextjs.org/docs/basic-features/eslint#eslint-plugin
		// Turn these rules on for Next Fullstack
		'@next/next/no-img-element': 'off',

		// Unused imports config; allows for lint --fix to remove unused imports
		'unused-imports/no-unused-imports': 'error'
	}
}
