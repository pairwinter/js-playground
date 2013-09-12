angular.module('sspApp').factory('informationService',function($http,$q){
  return {
    getInformation : function(data,success){
      var h = $http.get('/information/get',data);
      h.success(success);
    },
    saveInformation : function(data,success){
      var h = $http.post('/information/save',data);
      h.success(success);
    }
  }
})