var util = require('util');
var db = require('../database').db;

var userDAO = {
    /*
     CREATE TABLE p_user
     (
     id serial NOT NULL,
     name character(10),
     icon character(20),
     realname character(10),
     email character varying(50),
     lastlogintime timestamp without time zone,
     intro character varying(500),
     createdtime timestamp without time zone,
     lastmodifiedtime timestamp without time zone
     )
     */
    addUser:function(user,success,error){
        var domain = "name,icon,realname,email,lastlogintime,intro,createdtime,lastmodifiedtime";
        var key = "$1,$2,$3,$4,$5,$6,$7,$8";
        var sql = util.format("insert into p_user(%s) values (%s)",domain,key);
        var args = [user.name,user.icon,user.realName,user.email,user.lastLoginTime,user.intro,user.createdTime,user.lastModifiedTime];
        db.queryWithClientConnect(sql,args,success,error);
    }
}
exports.userDAO = userDAO;