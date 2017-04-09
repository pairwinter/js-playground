#!/usr/bin/env node
/**
 * Created by damon on 24/03/2017.
 */
var chalk = require('chalk');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.dev');
var WebpackDevServer = require('webpack-dev-server');

var winston = require('winston');
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)()
        // ,
        // new (winston.transports.File)({
        //     filename: './logger/dev-webpack-dev-server.log'
        // })
    ]
});

var compiler = webpack(webpackConfig);

var DEFAULT_PORT = process.env.PORT || 5440;

var xhdDevApp = new WebpackDevServer(compiler, {
    compress: true,
    publicPath: '/',
    clientLogLevel: 'none',
    hot: true,
    quiet: true,
    stats: {
        colors: true
    }
});
compiler.plugin('done', function (stats) {
    logger.info('webpack compiled done!');
});
xhdDevApp.listen(DEFAULT_PORT, '127.0.0.1', function () {
    console.log(chalk.green('D3 started at: http://localhost:' + DEFAULT_PORT));
});