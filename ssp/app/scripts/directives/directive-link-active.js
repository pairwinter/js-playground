'use strict';
angular.module('sspApp').directive('sspLinkActive', ['$location',function($location){
  return {
    restict: 'A',
    link: function(scope, element, attrs){
      var currentHash = attrs.href.substring(1);
      scope.location = $location;
      scope.$watch('location.path()',function(pathValue){
        if(pathValue === currentHash){
          element.parent().addClass(attrs.sspLinkActive);
        }else{
          element.parent().removeClass(attrs.sspLinkActive);
        }
      })
    }
  };
}]);
