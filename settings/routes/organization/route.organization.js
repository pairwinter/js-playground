var routes = {
    "baseInfo":{
        path:"/settings/organization/baseInfo",
        method:"get",
        callback:function(req,res){
            var baseInfo = {};
            res.json(baseInfo);
        }
    },
    "loginMsg":{
        path:"/settings/organization/loginMsg",
        method:"get",
        callback:function(req,res){
            var loginMsg = {};
            res.json(loginMsg);
        }
    }
}
exports.route = function(app){
    for(var routeName in routes){
        var route = routes[routeName];
        app[route.method](route.path,route.callback);
    }
};