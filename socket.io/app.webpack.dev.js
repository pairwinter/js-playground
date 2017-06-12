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

// Chatroom

var numUsers = 0;

io.on('connection', function (socket) {
    var addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', function () {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', function () {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        if (addedUser) {
            --numUsers;

            // echo globally that this client has left
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});

server.listen(DEFAULT_PORT, '127.0.0.1', function () {
    console.log(chalk.green('Ag-Grid started at: http://localhost:' + DEFAULT_PORT));
});