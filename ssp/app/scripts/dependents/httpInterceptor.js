'use strict';
angular.module('sspAppAjax',[]).config(function($httpProvider){
  $httpProvider.responseInterceptors.push('sspHttpInterceptor');
  var beforeRequest = function(data,headerGetter){
    if(!$("#sspAjaxPanel").size()){
      $('body').append('<div id="sspAjaxPanel" style="position: fixed; background-color: yellow; z-index: 10000; top: 0;">Working...</div>');
    }else{
      $('#sspAjaxPanel').show();
    }
    return data;
  }
  $httpProvider.defaults.transformRequest.push(beforeRequest);
})
.factory('sspHttpInterceptor',function($q){
  return function(promise){
    return promise.then(function(response){
      $('#sspAjaxPanel').hide();
      return response;
    },
    function(response){
      $('#sspAjaxPanel').hide();
      return response;
    });
  }
})
