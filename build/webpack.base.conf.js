const os = require('os');
const path = require('path');
const HappyPack = require('happypack');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const utils = require('./utils');
const config = require('../config');
const smp = new SpeedMeasurePlugin();
const happyThreadPool = HappyPack.ThreadPool({
	size: os.cpus().length
});
const devModel = process.env.NODE_ENV === 'development';

function resolve(dir) {
	return path.join(__dirname, '..', dir);
}

const createLintingRule = () => ({
	test: /\.(js|jsx)$/,
	loader: 'eslint-loader',
	enforce: 'pre',
	include: [ resolve('src'), resolve('test') ],
	options: {
		formatter: require('eslint-friendly-formatter'),
		emitWarning: true,
		fix: true
	}
});

const baseConfig = {
	context: path.resolve(__dirname, '../'),
	entry: {
		app: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	resolve: {
		extensions: [ '.js', '.json', '.jsx' ],
		alias: {
			'@': path.resolve('./src'),
			assets: path.resolve('./src/assets')
		}
	},
	module: {
		rules: [
			...[ createLintingRule() ],
			{
				test: /\.js|jsx$/,
				use: [ 'cache-loader', 'happypack/loader?id=babel' ],
				include: path.resolve('src')
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true
						}
					}
				]
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					devModel ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [
								require('postcss-flexbugs-fixes'),
								autoprefixer({
									overrideBrowserslist: [
										'>1%',
										'last 4 versions',
										'Firefox ESR',
										'not ie < 9' // React doesn't support IE8 anyway
									],
									flexbox: 'no-2009'
								})
							]
						}
					}
					// 'happypack/loader?id=styles',
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('media/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
		]
	},
	plugins: [
		new HappyPack({
			id: 'babel',
			loaders: [
				{
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						presets: [ '@babel/preset-env', '@babel/preset-react' ],
						plugins: [
							'@babel/plugin-transform-runtime',
							'@babel/plugin-proposal-class-properties',
							[
								'import',
								{
									libraryName: 'antd',
									libraryDirectory: 'es',
									style: 'css'
								}
							]
						]
					}
				}
			],
			//共享进程池
			threadPool: happyThreadPool,
			//允许 HappyPack 输出日志
			verbose: true
		}),
		// copy custom static assets
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, '../static'),
				to: config.build.assetsSubDirectory,
				ignore: [ '.*' ]
			}
		])
	]
};

module.exports = smp.wrap(baseConfig);
