//最终都将因为超时而无法响应，因为他们都没有对Response进行写操作，并且没有结束写操作。
//参数中包含Response但是这里没有处理。
function start() {
	console.log("Request handler 'start' was called.");
	function sleep(milliSeconds) {
		var startTime = new Date().getTime();
		while (new Date().getTime() < startTime + milliSeconds);
	}
	sleep(10000);
	return "Hello Start";
    //正确的方式如下
    var response = arguments[0];
    response.writeHead(200, {"Content-Type" : "text/html"});
    response.write("Hello Start");
    response.end();
}
//最终都将因为超时而无法响应，因为他们都没有对Response进行写操作，并且没有结束写操作。
//参数中包含Response但是这里没有处理。
function upload() {
	console.log("Request handler 'upload' was called.");
	return "Hello Upload";
    //正确的方式如下
//    var response = arguments[0];
//    response.writeHead(200, {"Content-Type" : "text/html"});
//    response.write("Hello Start");
//    response.end();
}
exports.start = start;
exports.upload = upload;

