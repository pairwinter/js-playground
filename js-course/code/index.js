var express = require('express')
    , http = require('http')
    , path = require('path')
var app = express();
app.configure(function () {
    app.set('port', process.env.PORT || 8085);
    app.use('/static',express.static(path.join(__dirname, '/')));
});
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
//Router
app.get('/',  function(req, res){
    res.redirect('/static/index.html');
});
app.get("/list/users",function(req,res){
    var users = [];
    for(var i=1;i<=100;i++){
        users.push({id:i,name:"name"+i,age:i});
    }
    res.send(users);
});

