var db = require('../database').db();

exports.updateOnlineInfo = function(key,success){
    db.zadd('online',Date.now(),key,success);
}
//count uses number within one minute
exports.getOnlineCount = function(success,error){
    var min = 60*1000;
    var ago = Date.now()-min;
    db.zrevrangebyscore('online','+inf',ago,function(err,users){
        if(err){
            error(err);
        }else{
            success(users);
        }
    });
}