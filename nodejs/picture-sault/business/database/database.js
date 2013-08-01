var dbConfig = require("../../config.json").db;
var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

var conString = "postgres://postgres:"+dbConfig.port+"@"+dbConfig.host+"/postgres";

function queryWithClientConnect(sql,args,success,error){
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        client.query('SELECT NOW() AS "theTime"', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            console.log(result.rows[0].theTime);
            //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
            client.end();
        });
    });
}
function queryWithPollConnect(sql,args,success,error){
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



