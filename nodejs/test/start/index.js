var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handle = {}
handle["/"] = requestHandlers.root;
handle["/start"] = requestHandlers.start;
handle["/start2"] = requestHandlers.start2;
handle["/start3"] = requestHandlers.start3;
handle["/upload"] = requestHandlers.upload;
handle["/upload2"] = requestHandlers.upload2;
handle["/toPost"] = requestHandlers.toPost;
handle["/showData"] = requestHandlers.showData;
//server.start(router.route3, handle);
server.start2(router.route3, handle);
