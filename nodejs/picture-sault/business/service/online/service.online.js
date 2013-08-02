var util = require('util');
var _ = require('underscore');
var onlineCache = require('../../cache/online/cache.online').onlineCache;
exports.appendToBodyOnlineInfo = function(body,online){
    body += online.length + " users online:"
    var users = [];
    _.each(online,function(val){
        users.push(util.format('<p>%s</p>',val));
    })
    body = body + users.join("");
    return body;
}
exports.updateOnlineInfo = function(key,success){
    onlineCache.updateOnlineInfo(key,success);
}
//count uses number within one minute
exports.getOnlineCount = function(success,error){
    onlineCache.getOnlineCount(success,error);
}