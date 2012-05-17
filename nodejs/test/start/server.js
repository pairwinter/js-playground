var http = require("http");
var url = require("url");
function start(route, handle) {
	function onRequest(request, response) {
		request.setEncoding("utf8");
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		
		var postData = "";
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '" + postDataChunk + "'.");
		});
		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});
		
		route(handle, pathname, response);
	}
	http.createServer(onRequest).listen(8088);
	console.log("Server has started.");
}

function start2(route, handle) {
	function onRequest(request, response) {
		request.setEncoding("utf8");
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		
		var postData = "";
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '" + postDataChunk + "'.");
		});
		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});
	}
	http.createServer(onRequest).listen(8088);
	console.log("Server has started.");
}
exports.start = start;
exports.start2 = start2;
