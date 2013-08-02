var cache = require('../cache').cache();

var onlineCache = {
    updateOnlineInfo:function (key,success){
        cache.zadd('online',Date.now(),key,success);
    },
    //count uses number within one minute
    getOnlineCount:function(success,error){
        var min = 60*1000;
        var ago = Date.now()-min;
        cache.zrevrangebyscore('online','+inf',ago,function(err,users){
            if(err){
                error(err);
            }else{
                success(users);
            }
        });
    }
}
exports.onlineCache = onlineCache;