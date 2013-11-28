//var userService = require('../../business/service/user/service.user').userService;

var routes = {
    "index":{
        path:"/",
        method:"get",
        callback:function(req,res){
            res.render("index",function(err,html){
                res.send(html);
            });
        }
    }
}
exports.route = function(app){
    for(var routeName in routes){
        var route = routes[routeName];
        app[route.method](route.path,route.callback);
    }
};