'use strict';
define(['app'],function(app) {
  app.directive('ngbkFocus', function(){
    return {
      restict: 'A',
      link: function(scope, element, attrs){
        element[0].focus();
      }
    };
  });
});
