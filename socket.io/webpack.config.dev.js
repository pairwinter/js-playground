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
    index: './src/index.js', //default, just for navigation
    chat: './src/chat/index.js'
};

function buildHtmlWebpackPlugin(options) {
    var _options = {
        links: entryInputs,
        template: options.template || './html-webpack-plugin-template.pug',
        filename: options.filename || parseFilename(options)
    };

    function parseFilename(options) {
        if (options.chunks) {
            return options.chunks[0] + '.html'
        }
    }

    return new HtmlWebpackPlugin(_.extend(_options, options));
}

function buildEntry(path) {
    var basicEntries = [
        require.resolve('webpack-dev-server/client') + '?/',
        require.resolve('webpack/hot/dev-server')
    ];
    basicEntries.push(path);
    return basicEntries;
}

var entries = {}, htmlPlugins = [];

_.each(entryInputs, function (value, key) {
    entries[key] = buildEntry(value);
    htmlPlugins.push(buildHtmlWebpackPlugin({
        chunks: [key]
    }));
});


module.exports = {
    entry: entries,
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
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
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
    plugins: htmlPlugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new CopyWebpackPlugin([
            {from: 'public/bower_components', to: 'bower_components'}
            // ,
            // {from: 'public/stylesheets', to: 'stylesheets'}
        ])
    ]),
    devtool: "cheap-module-eval-source-map"
};

