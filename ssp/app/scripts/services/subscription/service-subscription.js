angular.module('sspApp').factory('subscriptionService',function($http,$q){
  return {
    getSubscription : function(data,success){
      var h = $http.get('/subscription/get',data);
      h.success(success);
    },
    saveSubscription : function(data,success){
      var h = $http.post('/subscription/save',data);
      h.success(success);
    }
  }
})