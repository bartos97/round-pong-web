const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                include: path.resolve(__dirname, 'src'),
                sideEffects: true,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')]
                        }
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            root: __dirname
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            implementation: require('sass'),
                            sassOptions: {
                                includePaths: ['src/sass']
                            }
                        }
                    }
                ],
            },
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, 'src'),
                use: 'ts-loader'
            },
            {
              test: /\.(png|svg|jpg|gif)$/,
              loader: 'file-loader',
              options: {
                  outputPath: 'assets/img',
                  publicPath: 'assets/img',
                  esModule: false
              }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/fonts',
                    publicPath: 'assets/fonts',
                }
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, 'src/app'),
                loader: 'html-loader',
                options: {
                    interpolate: true,
                    root: path.resolve(__dirname)
                }
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Round Pong',
            template: 'src/index.html',
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                description: 'Circular variation of classic Pong game'
            }
        }),
        new FaviconsWebpackPlugin({
            logo: './src/assets/img/favicon.png',
            prefix: '',
            outputPath: 'assets/favicons',
            prefix: 'assets/favicons',
            publicPath: './'
        })
    ],
};