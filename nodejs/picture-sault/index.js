var express = require('express');
var app = express();

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(function(err,req,res,next){
    console.log(err.stack);
    res.send(500,'Something broke!');
});

app.get('/hello',function(req,res){
    var body = 'Hello Word';
    res.setHeader('Content-Type','text/plain');
    res.setHeader('Content-Length',body.length);
    res.end(body);
});

app.listen(80);
console.log('Listening on port 8000');