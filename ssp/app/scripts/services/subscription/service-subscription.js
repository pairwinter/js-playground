angular.module('sspApp').factory('subscriptionService', function ($http, $q) {
    return {
        getSubscription: function (data) {
            var defer = $q.defer();
            var h = $http.get('/subscription/get', data);
            h.success(function(data){
                defer.resolve(data);
            });
            return defer.promise;
        },
        saveSubscription: function (data, success) {
            var h = $http.post('/subscription/save', data);
            h.success(success);
        }
    }
})