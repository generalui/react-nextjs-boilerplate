/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})

const nextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true
	},
	pwa: {
		dest: 'public',
		disable: process.env.NODE_ENV === 'development'
	}
}

module.exports = withBundleAnalyzer(withPWA(nextConfig))
