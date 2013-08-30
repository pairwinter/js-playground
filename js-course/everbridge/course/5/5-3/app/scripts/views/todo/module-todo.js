'use strict';

// The app/scripts/app.js file, which defines our AngularJS app
define(['angular','angularUi','v/todo/route-todo','configModuleBaseService'],function () {
    var routesConfig=arguments[2],configModuleBaseService=arguments[3];
    var module = angular.module('mytodoApp', ['ui']);
    configModuleBaseService(module,routesConfig);
    return module;
});