/**
 * @ignore  =====================================================================================
 * @file    index
 * @version 1.0.0
 * @author  Damon Liu(damon.liudong@gmail.com)
 * @date    Created at 3:36 PM 18/06/2017
 * @ignore  =====================================================================================
 */

export const testPromise = () => {
    var promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Time out!');
        }, 1000);
    });
    promise.then(function (message) {
        console.log('first then -> ', message);
        // return "First then"

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('The returned Resolved message from first then!');
            }, 2000);
        }).then(function (message) {
            console.log('The then of the returned Resolved message from the first then! ->', message);
            // return message;
        })
    }).then(function (message) {
        console.log('second then -> ', message);
        // return "Second then";
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('The returned Rejected message from second then!');
            }, 2000);
        })
    }).then(function (message) {
        console.log('third then -> ', message);
    }).then(null, function (message) {
        console.log('The message in the reject function! -> ', message);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('The returned Resolved message from first then!');
            }, 2000);
        })
    }).catch(function (message) {
        //if the reject has been intercepted, the catch will not be called.
        console.log('catch -> ', message);
    });

    setTimeout(function () {
        console.log('Start .......');
        //The promise has been resolved, so the first callback in the 'then' function will be executed immediately.
        promise.then(function (message) {
            console.log(message);
        }, function (message) {
            console.log(message);
        })
    }, 10000);
};
