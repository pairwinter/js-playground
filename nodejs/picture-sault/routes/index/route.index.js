//var userService = require('../../business/service/user/service.user').userService;

var routes = {
    "addUser":{
        path:"/",
        method:"get",
        callback:function(req,res){
            var data={layout:"layout.jade",title:"Index"};
            res.render("index/index.jade",data,function(err,html){
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