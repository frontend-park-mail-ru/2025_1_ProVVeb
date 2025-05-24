import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module'; // Импортируем createRequire
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

// Создаём аналог __dirname для ES модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Создаём require для использования в ES модулях
const require = createRequire(import.meta.url);

export default {
	mode: 'development',
	resolve: {
		extensions: ['.js', '.ts'],
		alias: {
			'@media': path.resolve(__dirname, 'src/media'),
			'@store': path.resolve(__dirname, 'src/components/Store.ts'),
			'@basecomp': path.resolve(__dirname, 'src/components/BaseComponent.ts'),
			'@VDOM': path.resolve(__dirname, 'src/components/VDOM'),
			'@compound': path.resolve(__dirname, 'src/components/compound'),
			'@pattern': path.resolve(__dirname, 'src/components/pattern'),
			'@simple': path.resolve(__dirname, 'src/components/simple'),
			'@modules': path.resolve(__dirname, 'src/modules'),
			'@network': path.resolve(__dirname, 'src/modules/network.ts'),
			'@validation': path.resolve(__dirname, 'src/modules/validation.ts'),
			'@router': path.resolve(__dirname, 'src/modules/router.ts'),
			'@mock': path.resolve(__dirname, 'src/mock'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@styles': path.resolve(__dirname, 'src/styles/globals'),
			'@notification': path.resolve(__dirname, 'src/components/simple/notification/notification.ts'),
		},
	},
	entry: {
		app: ['./src/index.ts'],
		sw: {
			import: './src/sw.ts',
			filename: 'sw.js' // Фиксированное имя для Service Worker
		}
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].js', // Фиксированное имя для Service Worker
		publicPath: '/',
		clean: true,
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin(), // Для JS
			new CssMinimizerPlugin(), // Для CSS
		],
	},
	devServer: {
		static: path.resolve(__dirname, 'dist'),
		port: 8000,
		// compress: true,
		historyApiFallback: true,
		allowedHosts: 'all',
		hot: true,
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|webp)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[contenthash].[ext]',
						},
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: { progressive: true },
							optipng: { enabled: false },
							pngquant: { quality: [0.65, 0.90] },
							gifsicle: { interlaced: false },
							webp: { quality: 75 }
						},
					},
				],
			},
			{
				test: /\.hbs$/,
				loader: 'handlebars-loader',
				include: path.resolve(__dirname, 'src/'),
				options: {
					runtime: require.resolve('handlebars/runtime'), // Используем require
				},
			},
			{
				test: /\.s[ac]ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(js|ts|tsx)$/,
				use: {
					loader: 'babel-loader',
				},
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './src/index.html',
		}),
		// new HTMLWebpackPlugin({
		// 	template: './src/feedbackPage.html',
		// 	filename: 'feedbackPage.html',
		// }),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/favicon.ico'),
					to: path.resolve(__dirname, 'dist'),
				},
				{
					from: path.resolve(__dirname, 'src/media'),
					to: path.resolve(__dirname, 'dist/media'),
				},
				{
					from: path.resolve(__dirname, 'src/feedbackPage.html'),
					to: path.resolve(__dirname, 'dist'),
				},
				{
					from: path.resolve(__dirname, 'src/feedbackPage.css'),
					to: path.resolve(__dirname, 'dist'),
				},
				{
					from: path.resolve(__dirname, 'src/feedbackPage.js'),
					to: path.resolve(__dirname, 'dist'),
				},
			],
		}),
	],
};
