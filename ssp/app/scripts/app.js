'use strict';
angular.module('sspApp', []).config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup',{
        templateUrl: 'views/signup/sign_up.html',
        controller: 'SignUpCtrl'
      })
      .when('/overview',{
        templateUrl: 'views/others/overview.html',
        controller: 'OverviewCtrl'
      })
      .when('/faq',{
        templateUrl: 'views/others/faq.html',
        controller: 'SignUpCtrl'
      })
      .when('/forgot_username',{
        templateUrl: 'views/forgot/forgot_username.html',
        controller: 'ForgotUsernameCtrl'
      })
      .when('/forgot_password',{
        templateUrl: 'views/forgot/forgot_psw.html',
        controller: 'ForgotPasswordCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
