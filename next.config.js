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
