var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/everbridge'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.listen(8082);
console.log('Listening on port 8082');
