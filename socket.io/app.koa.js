/**
 * @ignore  =====================================================================================
 * @file    app.js
 * @version 1.0.0
 * @author  Damon Liu(damon.liudong@gmail.com)
 * @date    Created at 4:22 PM 10/06/2017
 * @ignore  =====================================================================================
 */

var Koa = require('koa');
var static = require('koa-static');
var Router = require('koa-router');
var views = require('koa-views');
var app = new Koa();
app.use(views(__dirname + '/views', {extension: 'pug'}));
app.use(static('./public/bower_components'));

//x-response-time
app.use(async function (ctx, next) {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

//logger
app.use(async function (ctx, next) {
    console.log(`${ctx.method} ${ctx.url}`);
    await next();
});

var router = new Router();
router.get('/', async function (ctx, next) {
    ctx.state = {
        title: 'Test'
    };
    await ctx.render('index.pug');
});
router.get('/json', function (ctx, next) {
    ctx.body = {
        name: 'damon'
    }
});
app.use(router.routes());

var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);
io.on('connection', function(){ /* … */ });
server.listen(3000);
