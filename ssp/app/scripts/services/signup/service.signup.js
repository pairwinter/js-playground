angular.module('sspApp').factory('signupService',function($http,$q){
  return {
    signup : function(user,success){
      var h = $http.post('/user/login',user);
      h.success(success)
    }
  }
})