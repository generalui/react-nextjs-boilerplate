/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	compiler: {},
	images: {
		domains: ['unsplash.com']
	},
	experimental: {
		outputStandalone: true
	},
	webpack5: true,
	webpack: (config) => {
		// Fixes npm packages that depend on `fs` module
		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false
		}

		return config
	},
	i18n: {
		locales: ['en'],
		defaultLocale: 'en'
	}
}

// Refer to bundle analyzer docs if additional
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer(nextConfig)
