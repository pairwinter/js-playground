function root(){
	console.log("Request handler 'root' was called.");
	return "Nothing!";
}

function start(response) {
	console.log("Request handler 'start' was called.");
	function sleep(milliSeconds) {	
		var startTime = new Date().getTime();
		while (new Date().getTime() < startTime + milliSeconds);
	}
	sleep(10000);
	return "Hello Start";
}

var exec=require("child_process").exec;

function start2(response) {
	console.log("Request handler 'start2' was called.");
	var content = "";
	exec("find /" ,{ timeout: 30000, maxBuffer: 2000*1024 }, function(error,stdout,stderr){
		content=stdout;
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(content);
		response.end();
	});
	return "Hello Start";
}
var backprocess=require("./backprocess");
function start3(response) {
	console.log("Request handler 'start3' was called.");
	backprocess.process(10000,function(datatime){
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(datatime+"");
		response.end();
	});
	return "Hello Start3";
}

function upload(response) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello Upload");
	response.end();
}
function upload2(response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello Upload2");
	response.end();
}

function toPost(response){
	var body = '<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" content="text/html; '+
	'charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<form action="/showData" method="post">'+
	'<textarea name="text" rows="20" cols="60"></textarea>'+
	'<input type="submit" value="Submit text" />'+
	'</form>'+
	'</body>'+
	'</html>';
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}
var querystring = require("querystring");

function showData(response,data)
{
	
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(querystring.parse(data).text);
	response.end();
}
exports.root = root;
exports.start = start;
exports.start2 = start2;
exports.start3 = start3;
exports.toPost = toPost;
exports.upload = upload;
exports.upload2 = upload2;
exports.showData = showData;

