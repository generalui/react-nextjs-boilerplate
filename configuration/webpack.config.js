const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const rootPath = require('./root-path')

const config = {
	entry: path.join(rootPath, 'src', 'index.tsx'),
	output: {
		path: path.join(rootPath, 'build'),
		filename: '[name].bundle.js',
		sourceMapFilename: '[name].js.map'
	},
	mode: process.env.NODE_ENV || 'development',
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: ['ts-loader']
			},
			{
				test: /\.(css|scss)$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
				use: ['file-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(rootPath, 'src/public/index.html'),
			favicon: path.join(rootPath, 'src/public/favicon.ico'),
			filename: 'index.html'
		}),
		new Dotenv()
	]
}

if (process.env.NODE_ENV === 'development') {
	configuration.devtool = '#inline-source-map'
	configuration.devServer = {
		overlay: true
	}
}

module.exports = config
