const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './js/main.js',
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'app'),
        publicPath: ''
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.relative(__dirname, 'app'),
        open: true,
        compress: true,
        hot: true,
        port: 3000,
    },
    plugins:[ 
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'src/assets/img/'), to: path.resolve(__dirname, 'app/img/')},
                {from: path.resolve(__dirname, 'src/assets/js/'), to: path.resolve(__dirname, 'app/js/')}
            ]
        }),
    ],
    devtool:isProd ? false : 'source-map',
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [
                {
                    loader:MiniCssExtractPlugin.loader, 
                    options: {
                        hmr: isDev
                    },
                },
                'css-loader',
            ],
          },
          {
            test: /\.s[ac]ss$/,
            use: [
                {
                    loader:MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: (resourcePath, context) => {
                            return path.relative(path.dirname(resourcePath), context) + '/';
                        },
                    }
                },
                'css-loader', 
                'sass-loader'
            ],
          },
          {
            test:/\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
          },
          {
            test:/\.(png|jp(e*)g|svg)$/,
            use: [{
              loader: 'file-loader',
              options: {
                name: `./img/${filename('[ext]')}`
              }
            }],
          }
        ]
    }
};