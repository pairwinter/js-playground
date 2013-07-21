var util = require('util');
var _ = require('underscore');
var db_online = require('../../database/online/db.online');
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
    db_online.updateOnlineInfo(key,success);
}
//count uses number within one minute
exports.getOnlineCount = function(success,error){
    db_online.getOnlineCount(success,error);
}