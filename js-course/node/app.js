/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , course = require('./routes/course')
    , http = require('http')
    , path = require('path')
    , partials = require('express-partials');

var app = express();
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.set('view options',{layout:"layout.ejs"});
    app.engine('html', require('ejs').renderFile);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(partials());
    app.use(app.router);
    app.use('/static',express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get("/course/1-6/this.html",course["_1_6_this"]);
app.get("/course/1-7/closure.html",course["_1_7_closure"]);
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
