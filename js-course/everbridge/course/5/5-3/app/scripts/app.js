'use strict';

// The app/scripts/app.js file, which defines our AngularJS app
define(['angular', 'angularResource', 'controllers/controllers','services/services', 'filters/filters','directives/directives'],function (angular) {
    return angular.module('mytodoApp', ['ui','LocalStorageModule'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'MainCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
//    return angular.module(‘MyApp’, ['ngResource', 'controllers', 'services','filters', 'directives']);
});