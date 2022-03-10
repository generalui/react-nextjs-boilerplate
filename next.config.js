/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true
}

// Refer to bundle analyzer docs if additional
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer(nextConfig)
