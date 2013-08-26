'use strict';

angular.module('mytodoApp', ['ui','LocalStorageModule'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/userInfo', {
        templateUrl: 'views/userInfo.html',
        controller: 'UserinfoCtrl'
      })
      .when('//user/userInfo', {
        templateUrl: 'views//user/userInfo.html',
        controller: 'UserUserinfoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
