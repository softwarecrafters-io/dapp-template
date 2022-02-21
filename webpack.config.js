const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

module.exports = (_, {mode}) => ({
	entry: {
		main: path.join(__dirname, 'src', 'index.tsx'),
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".scss"],
	},
	output: {
		filename: "[contenthash].js",
		path: path.join(__dirname, "build"),
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true
						}
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: [
					mode === 'production'? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg|png)(\?v=.+)?$/,
				type: 'asset/resource'
			},
		]
	},
	devtool: mode === 'production' ? 'nosources-source-map' :  'eval',
	devServer: {
		open: true,
		port: 9001,
		host: "0.0.0.0"
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "src", "index_template.html"),
			filename: 'index.html',
			chunks: ['main']
		}),
		new MiniCssExtractPlugin({
			filename: "[contenthash].css"
		}),
	],
	optimization: {
		minimize: true,
	}
});
