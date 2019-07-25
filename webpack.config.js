var VueLoaderPlugin = require('vue-loader/lib/plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill','./src/main.js'],
    output: {
        path: path.resolve(__dirname,'./dist'),
        publicPath: '/dist/',
        filename: 'build.js',
    },
    devServer: {
        historyApiFallback: true,
        overlay: true,
        //hot: true
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                ]
            },
            {
                test: /\.js$/,
                use: {loader: 'babel-loader'},
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(vue|Vue)$/,
                loader: 'vue-loader',
                options: {
                    loader: {
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                }
            },
            {
                test:/\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin()
    ]
}