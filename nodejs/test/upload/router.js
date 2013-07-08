function route(handle, pathname, response, request) {
	console.log("About to route a request for " + pathname);
    if(/\/show/.test(pathname)){
        var fileName = pathname.split("show/")[1];
        handle['/show'](response, fileName);
        return;
    }
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, request);
	} else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {
			"Content-Type" : "text/html"
		});
		response.write("404 Not found");
		response.end();
	}
}
exports.route = route;
