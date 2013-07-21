var service = require('../../business/service/online/service.online');
var routes = {
    "root":{
        path:"/",
        method:"get",
        callback:function(req,res){
            var online = res.online || [];
            var body = "";
            body  = service.appendToBodyOnlineInfo(body,online);
            res.set('Content-Type', 'text/html');
            res.setHeader('Content-Length',body.length);
            res.end(body);
        }
    },
    "hello":{
        path:"/hello",
        method:"get",
        callback:function(req,res){
            var body = 'Hello Word';
            res.setHeader('Content-Type','text/plain');
            res.setHeader('Content-Length',body.length);
            res.end(body);
        }
    }
}
exports.route = function(app){
    for(var routeName in routes){
        var route = routes[routeName];
        app[route.method](route.path,route.callback);
    }
};