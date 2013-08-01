var cacheConfig = require("../../config.json").cache;
var redis  = require('redis');
var cache = redis.createClient(cacheConfig.port,cacheConfig.host);
exports.cache = function(){
    return cache;
}
