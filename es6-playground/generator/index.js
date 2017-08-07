/**
 * @ignore  =====================================================================================
 * @file    index
 * @version 1.0.0
 * @author  Damon Liu(damon.liudong@gmail.com)
 * @date    Created at 4:41 PM 18/06/2017
 * @ignore  =====================================================================================
 */
import "babel-polyfill";
import request from "request";
export const testGenerator = () => {
    function* g() {
        yield 0;
        yield console.log(1);
        yield console.log(2);
        yield 3;
        yield {name: 'Damon'};
        yield function () {
            console.log('yield function!');
        };
    }

    var gen = g();
    console.log(gen.next());
    // console.log(gen.next());
    // console.log(gen.next());
    // console.log(gen.next());
    // console.log(gen.next());
    // console.log(gen.next());
};

export const testGeneratorAjax = () => {
    let Parse = function*(url) {
        var response = yield _request(url);
        console.log(`Get the data from ${url}\n`, JSON.stringify(response, null, '\t'));
        response = yield _request(url);
        console.log(`Get the data from ${url}\n`, JSON.stringify(response, null, '\t'));
    };
    let _request = (url) => {
        request({
            url: url,
            headers: {
                'User-Agent': 'request'
            }
        }, function (err, response, body) {
            console.log('request done!');
            // parse.next(JSON.parse(body));
        });
    };


    let parse = Parse('https://api.github.com');
    parse.next();
};