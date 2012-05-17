var express = require("express");
var util = require("util");
var app = express.createServer();
app.configure(function() {
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/'));
	app.set('views', __dirname + '/views');
	app.set('view engine', 'html');
	app.register(".html", require("jqtpl").express);
	app.set('view options', {
		layout : false
	});
});
app.get("/", function(req, res) {
	var data = {};
	data.layout = false;
	res.render("index.html", data);
});
// 布局模板
app.get("/layout-content", function(req, res) {
	var data = {};
	data.layout = "layout.html";
	data.title = "结果";
	res.render("layout-content.html", data);
});
// 表单验证
app.get("/validation",function(req, res){
	var data={layout:"layout.html",title:"表单验证",page:"validation"};
	res.render("validation.html",data);
});

app.get("/validation/user",function(req, res){
	var not_exist=true;
	if(req.query.userName=="eb")
		not_exist=false;
	res.send(not_exist);
});

//异步请求
app.get("/ajax",function(req, res){
	var data={layout:"layout.html",title:"异步请求",page:"ajax"};
	res.render("ajax.html",data);
});
var exec=require("child_process").exec;
app.get("/ajax/loading",function(req, res){
	function sleep1(milliSeconds) {
		var startTime = new Date().getTime();
		while (new Date().getTime() < startTime + milliSeconds);
	}
	sleep1(3000);
	res.send({data:"over"});
});
app.get("/ajax/200",function(req, res){
	res.send({"name":"damon"});
});
app.get("/ajax/notjson",function(req, res){
	res.send("this is not json");
});
app.get("/ajax/404",function(req, res){
	res.statusCode=404;
	res.end();
});
app.get("/ajax/500",function(req, res){
	res.statusCode=500;
	res.end();
});
app.get("/ajax/sessiontimeout",function(req,res){
	res.statusCode=10000;
	res.end();
});
app.get("/ajax/noaccess",function(req,res){
	res.statusCode=10001;
	res.end();
});
//弹出层
app.get("/dialog",function(req, res){
	var data={layout:"layout.html",title:"弹出层",page:"dialog"};
	res.render("dialog.html",data);
});

//其他
app.get("/other",function(req, res){
	var data={layout:"layout.html",title:"其他",page:"other"};
	res.render("other.html",data);
});

app.get("/other/tree_data",function(req, res){
//	var data=[
//			{
//				name:"data1",
//				children:[{
//					name:"data1-1"				
//				}]
//			},
//			{
//				name:"data2",
//				children:[{
//					name:"data2-1"			
//				}]
//			},
//			];
	var data=[{ id:'0111',	name:'n1.1.n1',	isParent:true},{ id:'0112',	name:'n1.1.n2',	isParent:false},{ id:'0113',	name:'n1.1.n3',	isParent:true},{ id:'0114',	name:'n1.1.n4',	isParent:false}];
	res.send(data);
});

app.get("/chat",function(req,res){
	res.render("chat.html",{layout:false});
});


// 处理所有请求
//app.get("/*", function(req, res, next) {
//	res.send("404\n");
//});

app.listen(9002);
var socketio = require('socket.io');
var s=socketio.listen(app);
s.sockets.on('connection', function (socket) {
    socket.on('message', function (msg) {
        console.log('Message Received: ', msg);
        socket.broadcast.emit('message', msg);
    });
    s.sockets.emit('this', { will: 'be received by everyone' });
	socket.on('private message', function (from, msg) {
		console.log('I received a private message by ', from, ' saying ', msg);
	});
	socket.on('disconnect', function () {
		s.sockets.emit('user disconnected');
	});
});

