angular.module('sspApp').factory('locationService',function($http,$q){
  return {
    getLocation : function(data,success){
      var h = $http.get('/location/get',data);
      h.success(success);
    },
    saveLocation : function(data,success){
      var h = $http.post('/location/save',data);
      h.success(success);
    }
  }
})