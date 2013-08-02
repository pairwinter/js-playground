var userService = require('../../business/service/user/service.user').userService;

var routes = {
    "addUser":{
        path:"/user/addUser",
        method:"get",
        callback:function(req,res){
            var user = {
                name : "damon",
                icon :  "100000000_0000000001",
                realName :  "dongdong",
                email :  "pairwinter@gmail.com",
                lastLoginTime :  null,
                intro  : null
            }
            userService.addUser(user,function(){res.json({ user: 'tobi' })},function(err){res.json({ error: true })})
        }
    }
}
exports.route = function(app){
    for(var routeName in routes){
        var route = routes[routeName];
        app[route.method](route.path,route.callback);
    }
};