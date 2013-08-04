var userService = require('../../business/service/user/service.user').userService;

var routes = {
    "fetchRegisterResource":{
        path:"/user/fetchRegisterResource",
        method:"get",
        callback:function(req,res){
            res.render("user/user_register.jade",function(err,html){
                res.send(html);
            });
        }
    },
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
            };
            userService.addUser(user,function(result){
                var data={layout:"layout.jade",title:"test"};
                res.render("user/user_list.jade",data,function(err,html){
                    res.send(html);
                });
            },function(err){res.json({ error: true })})
        }
    }
}
exports.route = function(app){
    for(var routeName in routes){
        var route = routes[routeName];
        app[route.method](route.path,route.callback);
    }
};