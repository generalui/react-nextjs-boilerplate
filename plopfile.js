/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const fs = require('fs')
const path = require('path')

module.exports = (plop) => {
	plop.setGenerator('type', {
		description: 'Generate type',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What should it be called?'
			}
		],

		actions: ({ name }) => {
			if (!name) throw Error('Name cannot be empty')

			const actions = [
				{
					// Create component index file
					type: 'add',
					path: './src/types/{{properCase name}}.ts',
					templateFile: './plop_templates/Type/Type.ts.hbs',
					abortOnFail: true
				},
				{
					// Create component index file
					type: 'modify',
					path: './src/types/index.ts',
					// pattern: 'end-of-file',
					pattern: /(\/\/ Automated exports)/gi,
					// templateFile: './plop_templates/Type/index.ts.hbs',
					template: "$1\r\nexport * from './{{properCase name}}'",
					abortOnFail: true
				}
			]

			return actions
		}
	})
	// Component generator
	plop.setGenerator('component', {
		description: 'Generate component',
		prompts: [
			{
				type: 'list',
				name: 'componentType',
				message: 'What type of component is this?',
				choices: [
					{ name: 'Common', value: 'common' },
					{ name: 'Partial', value: 'partials' },
					{ name: 'Page', value: 'pages' }
				],
				default: 0
			},
			// TODO: add prompt if component is a variant of another component
			// {
			// 	type: 'confirm',
			// 	name: 'variant',
			// 	message: 'Is this a variant of another component?',
			// 	when: ({ componentType }) => componentType === 'common' || componentType === 'partial',
			// 	default: false
			// },
			// {
			// 	type: 'input',
			// 	name: 'baseComponent',
			// 	message: 'If this is a variant please name the base component otherwise press enter',
			// 	// when: ({ variant, componentType }) => variant === true,
			// 	when: ({ componentType }) => componentType === 'common' || componentType === 'partial',
			// 	validate: (value, { componentType }) => {
			// 		if (/.+/.test(value)) {
			// 			// TODO: update to supported CPP folder layout
			// 			const exists =
			// 				fs
			// 					.readdirSync(path.join(__dirname, `src/components/${componentType}`))
			// 					.indexOf(value) >= 0

			// 			return !exists ? 'There is no base component with this name' : true
			// 		}

			// 		return true
			// 		// return 'The name is required'
			// 	}
			// },
			{
				type: 'input',
				name: 'name',
				message: 'What should it be called?'
			},
			// Adding a default class will add the classnames import and default classes
			{
				when: ({ componentType }) => componentType !== 'pages',
				type: 'input',
				name: 'defaultClass',
				message: 'Default Tailwind classnames if any:'
			}
		],
		actions: ({ componentType, name }) => {
			if (!name) throw Error('Name cannot be empty')

			const actions = [
				{
					// Create component index file
					type: 'add',
					path: './src/components/{{componentType}}/{{properCase name}}/index.ts',
					templateFile: './plop_templates/Component/index.ts.hbs',
					abortOnFail: true
				},
				{
					// Create component tsx file
					type: 'add',
					path: './src/components/{{componentType}}/{{properCase name}}/{{properCase name}}.tsx',
					templateFile:
						componentType === 'pages'
							? './plop_templates/Page/PageComponent.tsx.hbs'
							: './plop_templates/Component/Component.tsx.hbs',
					abortOnFail: true
				},
				{
					// Create component types file
					type: 'add',
					path: './src/components/{{componentType}}/{{properCase name}}/{{properCase name}}.types.ts',
					templateFile: './plop_templates/Component/Component.types.ts.hbs',
					abortOnFail: true
				},
				{
					// Create component test file
					type: 'add',
					path: './src/components/{{componentType}}/{{properCase name}}/{{properCase name}}.spec.tsx',
					templateFile: './plop_templates/Component/Component.spec.tsx.hbs',
					abortOnFail: true
				}
			]

			if (componentType === 'pages') {
				actions.push({
					// Create page route file
					type: 'add',
					path: './src/pages/{{lowerCase name}}.tsx',
					templateFile: './plop_templates/Page/PageRouteComponent.tsx.hbs',
					abortOnFail: true
				})
			}

			return actions
		}
	})

	// Component generator
	plop.setGenerator('model', {
		description: 'Generate model',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What should it be called?'
			}
			// TODO: Add prompt to request if an include file is needed
		],
		actions: ({ name }) => {
			if (!name) throw Error('Name cannot be empty')

			const actions = [
				{
					// Create types file
					type: 'add',
					path: './src/models/{{properCase name}}/{{properCase name}}.types.ts',
					templateFile: './plop_templates/Model/index.ts.hbs',
					abortOnFail: true
				},
				// Create mutation folder and a couple of mutation files
				{
					type: 'add',
					path: './src/models/{{properCase name}}/mutation/update{{properCase name}}.ts',
					templateFile: './plop_templates/Model/mutation/updateModel.ts.hbs',
					abortOnFail: true
				},
				{
					type: 'add',
					path: './src/models/{{properCase name}}/mutation/create{{properCase name}}.ts',
					templateFile: './plop_templates/Model/mutation/createModel.ts.hbs',
					abortOnFail: true
				},
				{
					// Create query folder and getter file
					type: 'add',
					path: './src/models/{{properCase name}}/query/get{{properCase name}}.ts',
					templateFile: './plop_templates/Model/query/getModel.ts.hbs',
					abortOnFail: true
				},
				{
					// Create includes file
					type: 'add',
					path: './src/models/{{properCase name}}/includes/index.ts',
					templateFile: './plop_templates/Model/includes/index.ts.hbs',
					abortOnFail: true
				}
			]

			return actions
		}
	})

	// Helper to append string (intended to inject curly brackets)
	plop.setHelper('append', function ifEquals(arg1) {
		return arg1
	})

	// Helper to test equality of two strings
	plop.setHelper('ifEquals', function ifEquals(arg1, arg2, options) {
		return arg1 == arg2 ? options.fn(this) : options.inverse(this)
	})

	// Helper to test inequality of two strings
	plop.setHelper('ifNotEquals', function ifEquals(arg1, arg2, options) {
		return arg1 != arg2 ? options.fn(this) : options.inverse(this)
	})
}
