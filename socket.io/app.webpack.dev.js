#!/usr/bin/env node
/**
 * Created by damon on 24/03/2017.
 */
var chalk = require('chalk');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.dev');
var WebpackDevServer = require('webpack-dev-server');

var winston = require('winston');
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)()
    ]
});

var compiler = webpack(webpackConfig);

var DEFAULT_PORT = process.env.PORT || 3520;

var server = new WebpackDevServer(compiler, {
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

var io = require('socket.io')(server.listeningApp);
io.on('connection', function(){ /* … */ });
server.listen(DEFAULT_PORT, '127.0.0.1', function () {
    console.log(chalk.green('Ag-Grid started at: http://localhost:' + DEFAULT_PORT));
});