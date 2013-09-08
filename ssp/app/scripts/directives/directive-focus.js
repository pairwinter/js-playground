'use strict';
angular.module('sspApp').directive('sspFocus', function(){
  return {
    restict: 'A',
    link: function(scope, element){
      element[0].focus();
    }
  };
});
