/**
 * @ignore  =====================================================================================
 * @file    webpack.config.dev
 * @version 1.0.0
 * @author  Damon Liu(damon.liudong@gmail.com)
 * @date    Created at 4:34 PM 24/03/2017
 * @ignore  =====================================================================================
 */

var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var appDirectory = fs.realpathSync(process.cwd());

/**
 * Get the right path of folder, comes from the code resources of 'react-scripts/config/paths.js'
 * @param relativePath
 * @returns {*}
 */
function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
}

var entryInputs = {
    index: './src/index.js',
    wdsClient: require.resolve('webpack-dev-server/client') + '?/',
    ol: './src/gis/ol/index.js',
    ll: './src/gis/ll/index.js'
};

module.exports = {
    entry: entryInputs,
    output: {
        publicPath: '/',
        path: resolveApp('dist')
    },
    resolve: {
        alias: {
            Public: path.resolve(__dirname, 'public')
        }
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: 'url-loader?limit=100000'
            }
        ],
    },
    node: {
        fs: 'empty',
        readline: 'empty'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/gis/ol/index.pug',
            hash: false,
            filename: 'ol.html',
            chunks: ['ol', 'wdsClient'],
        }),
        new HtmlWebpackPlugin({
            template: './src/gis/ll/index.pug',
            hash: false,
            filename: 'll.html',
            chunks: ['ll', 'wdsClient'],
        }),
        new CopyWebpackPlugin([{from: 'gisResources/json_config', to: 'json_config'}])
    ],
    devtool: "eval-source-map"
};

