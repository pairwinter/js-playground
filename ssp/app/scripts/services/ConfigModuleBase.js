'use strict';
define(['routeDependencyResolveService'],function(routeDependencyResolveService){
  return function(module,config){
    module.lazy = module;
    module.config(
      ['$routeProvider','$locationProvider','$controllerProvider','$compileProvider','$filterProvider','$provide',
      function($routeProvider,$locationProvider,$controllerProvider,$compileProvider,$filterProvider,$provide){
        module.lazy = {
          controller : $controllerProvider.register,
          directive : $compileProvider.directive,
          filter : $filterProvider.register,
          factory : $provide.factory,
          service : $provide.service
        }
//        $locationProvider.html5Mode(true);
        if(config.routes){
          angular.forEach(config.routes,function(route,path){
            $routeProvider.when(path,{templateUrl:route.templateUrl,resolve:routeDependencyResolveService(route.dependencies)});
          });
        }
        if(config.defaultRoutePath){
          $routeProvider.otherwise({redirectTo:config.defaultRoutePath});
        }
      }]
    );
  }
});
