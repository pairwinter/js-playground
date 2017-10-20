#!/usr/bin/env node
/**
 * Created by damon on 24/03/2017.
 */
var chalk = require('chalk');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.dev');
var WebpackDevServer = require('webpack-dev-server');

var fs = require('fs');
var appDirectory = fs.realpathSync(process.cwd());
var path = require('path');
function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
}

var winston = require('winston');
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)()
    ]
});

var compiler = webpack(webpackConfig);

var DEFAULT_PORT = process.env.PORT || 3520;

var xhdDevApp = new WebpackDevServer(compiler, {
    compress: true,
    publicPath: '/',
    clientLogLevel: 'none',
    contentBase: resolveApp('./src'),
    watchContentBase: true,
    disableHostCheck: true,
    stats: {
        colors: true
    },
    historyApiFallback: true,
    proxy: {
        "/basemap": {
            target: "http://localhost:8080/"
        },
        "/basemap_json": {
            target: "http://localhost:8080/"
        },
        "/vector": {
            target: "http://localhost:8080/"
        },
        // bypass: function (req, res, proxyOptions) {
        //     if (req.headers['X-Requested-With'] !== 'XMLHttpRequest') {
        //         return false;
        //     }
        // }
    }
});
compiler.plugin('done', function (stats) {
    logger.info('webpack compiled done!');
});
xhdDevApp.listen(DEFAULT_PORT, '127.0.0.1', function () {
    console.log(chalk.green('D3 started at: http://localhost:' + DEFAULT_PORT));
});