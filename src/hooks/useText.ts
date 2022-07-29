/**
 * Hook to manage getting localization text
 *
 * Based on the following blog posts
 * - https://www.smashingmagazine.com/2021/11/localizing-your-nextjs-app/
 * - https://blog.logrocket.com/complete-guide-internationalization-nextjs/
 *
 * Docs
 * - https://nextjs.org/docs/advanced-features/i18n-routing
 */
import { dictionary } from 'dictionary/index'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

// Can't localize these strings if there is an error with localization
const CONFIG_ERROR_MESSAGE = 'No locale found. Please add a locale to your Next.js configuration.'
const LOCALE_NOT_FOUND_ERROR_MESSAGE = 'NO TEXT FOUND FOR TERM'

export type UseText = (scope?: string) => {
	t: (
		term: string,
		args?: string | number | (string | number)[],
		checkForPlurality?: boolean
	) => string
	locale: string
}

// Handle injecting variables into locale string
const formatText = (text: string, args?: string | number | (string | number)[]) => {
	// If no args are passed
	if (!args) return text
	// If args is an array
	else if (Array.isArray(args))
		return args.length ? text.replace(/{(\d+)}/g, (_, index) => args[index - 1]?.toString()) : text
	// If args is singular
	else return text.replace(/{(\d+)}/g, args.toString())
}

const checkForPlural = (args?: string | number | (string | number)[]) => {
	if (!args) return false

	const isPlural = (test: string | number) => {
		return (typeof test === 'string' && test.toLowerCase().endsWith('s')) || test !== 1
	}

	// TODO: consider more robust check for plurality
	if (Array.isArray(args)) {
		return isPlural(args[0])
	} else {
		return isPlural(args)
	}
}

// TODO: optimization; load entire dictionary on page load and cache

export const useText: UseText = (scope) => {
	const { locales = [], defaultLocale, ...nextRouter } = useRouter()
	const locale = locales.includes(nextRouter.locale || '') ? nextRouter.locale : defaultLocale

	if (!locale) throw new Error(CONFIG_ERROR_MESSAGE)

	return useMemo(
		() => ({
			// Get translations function. "t" for short
			t: (term, args, checkForPlurality) => {
				// If  checkForPlurality is true evaluate args to determine plurality
				const isPlural = checkForPlurality && checkForPlural(args)

				// Parse search term into lodash.get friendly searchable array
				let localeQuery = [...term.split('.'), isPlural ? 'plural' : 'message']

				// If hook is initiated with scope add it to the localeQuery
				if (scope) localeQuery = [...scope.split('.'), ...localeQuery]

				// Check current locale for term
				let translation = get(dictionary, [locale, ...localeQuery])

				// Default to defaultLocale term if not found
				if (!translation) translation = get(dictionary, [defaultLocale as string, ...localeQuery])

				// Return error message if no term found
				if (!translation) translation = `${LOCALE_NOT_FOUND_ERROR_MESSAGE}: ${term}`

				// Return string with formatting
				return formatText(translation, args)
			},
			locale
		}),
		[scope, defaultLocale, locale]
	)
}
