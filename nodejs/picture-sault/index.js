var util = require('util');
var express = require('express');
var app = express();

var onlineService = require('./business/service/online/service.online');


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout: true});
app.engine('jade', require('jade').__express);
app.use('/static', express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(recordOnlineInfo);
app.use(onlineCount);
app.use(app.router);
app.use(logErrors);
app.use(errorHandlerToSendJsonData);
app.use(errorHandlerToRender);

var routes = require('./routes/routes');
routes.route(app);

function recordOnlineInfo(req,res,next){
    onlineService.updateOnlineInfo(req.headers['user-agent'],function(){next()});
}
function onlineCount(req,res,next){
    onlineService.getOnlineCount(
        function(users){
            res.online = users;
            next();
        },
        function(err){
            next(err);
        }
    )
}

function logErrors(err,req,res,next){
    console.error(err.stack);
    next(err);
}
//if the request is XHR request , the error will response to beforend in json format
function errorHandlerToSendJsonData(err,req,res,next){
    if(req.xhr){
        res.send(500,{error:'Something blew up!'})
    }else{
        next(err);
    }
}
//show the error page whit the render page 'error'
function errorHandlerToRender(err,req,res,next){
    res.status(500);
    res.render('error',{error:err});
}

app.listen(8081);
console.log('Listening on port 8081');