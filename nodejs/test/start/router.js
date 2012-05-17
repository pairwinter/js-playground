function route(handle, pathname, response) {
	console.log("About to route a request for " + pathname);
	if (typeof handle[pathname] === 'function') {
		var content=handle[pathname]();
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(content);
		response.end();
	} else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not found");
		response.end();
	}
}

function route2(handle, pathname, response) {
	console.log("About to route a request for " + pathname);
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response);
	} else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not found");
		response.end();
	}
}
function route3(handle, pathname, response,postData) {
	console.log("About to route a request for " + pathname);
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response,postData);
	} else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not found");
		response.end();
	}
}
exports.route = route;
exports.route2 = route2;
exports.route3 = route3;
