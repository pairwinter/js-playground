angular.module('sspApp').factory('myprofileService', function ($http, $q) {
    return {
        getMyprofile: function (data, success) {
            var h = $http.get('/myprofile/get', data);
            h.success(success);
        },
        saveMyprofile: function (data, success) {
            var h = $http.post('/myprofile/save', data);
            h.success(success);
        },
        getDeliverpath: function (data, success) {
            var h = $http.get('/myprofile/deliverpath/get', data);
            h.success(success);
        },
        saveDeliverpath: function (data, success) {
            var h = $http.post('/myprofile/deliverpath/save', data);
            h.success(success);
        }
    }
})