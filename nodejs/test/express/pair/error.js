var express = require("express");
var util = require("util");
var app = express.createServer();
app.configure(function() {
	console.log("configure");
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.methodOverride());
});
app.configure("production", function() {
	console.log("production");
	var oneYear = 31557600000;
	app.use(express.static(__dirname + "/public", {
		maxAge : oneYear
	}));
//	app.use(express.errorHandler());
});
app.configure("development", function() {
	console.log("development");
	app.use(express.static(__dirname + "/public"));
	app.use(express.errorHandler({
		dumpExceptions : true,
		showStack : true
	}));
});
function NotFound(msg){
	this.name = 'NotFound in csser.com';
	Error.call(this, msg);
	Error.captureStackTrace(this, arguments.callee);
}

NotFound.prototype.__proto__ = Error.prototype;

app.get('/404', function(req, res,next){
	next(new NotFound('error'));
});
app.get('/error', function(req, res,next){
	next(new Error('error'));
});
app.error(function(err,req,res,next){
	res.send("404!找不到您请求的资源！");
});
app.listen(9001);
