module.exports = {
	useTabs: true,
	semi: false,
	singleQuote: true,
	jsxSingleQuote: true,
	printWidth: 100,
	trailingComma: 'none',
	// import order https://github.com/trivago/prettier-plugin-sort-imports
	// third party modules are automatically moved to the top
	importOrder: [
		'^store/(.*)$',
		'<THIRD_PARTY_MODULES>',
		'^utils/(.*)$',
		'^hooks/(.*)$',
		'^pages/(.*)$',
		'^partials/(.*)$',
		'^common/(.*)$',
		'^styles/(.*)$',
		'^[./]'
	],
	importOrderSortSpecifiers: true,
	overrides: [
		// Overrides for local json
		{
			files: ['**/package.json', '**/locales/**/*.json', '.github/**/*.yml'],
			options: {
				useTabs: false,
				tabWidth: 2
			}
		}
	]
}
