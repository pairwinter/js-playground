var dbConfig = require("../../config.json").db;
var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

var conString = "postgres://postgres:"+dbConfig.password+"@"+dbConfig.host+":"+dbConfig.port+"/postgres";

var db = {
    queryWithClientConnect:function(sql,args,success,error){
        var client = new pg.Client(conString);
        client.connect(function(err) {
            if(err) {
                error && error(err);
                return console.error('could not connect to postgres', err);
            }
            client.query(sql,args, function(err, result) {
                if(err) {
                    error && error(err);
                    return console.error('error running query', err);
                }
                success && success(result);
                client.end();
            });
        });
    },
    queryWithPollConnect:function(sql,args,success,error){
        pg.connect(conString, function(err, client, done) {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            client.query(sql, args, function(err, result) {
                done();//call `done()` to release the client back to the pool
                if(err) {
                    error();
                    return console.error('error running query', err);
                }
                success(result);
            });
        });
    }
}

exports.db = db;



