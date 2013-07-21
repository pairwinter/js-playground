var redis  = require('redis');
var db = redis.createClient(6379,"192.168.1.104");
exports.db = function(){
    return db;
}
