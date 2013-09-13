'use strict';
$.validator.setDefaults({
  onfocusout: function(e) {
    $(e).valid();
  },
  ignore: ':hidden, :button',
  errorClass: 'text-danger'
});
var sspApp = angular.module('sspApp', ['ui.sortable','ui.bootstrap.datepicker','sspAppAjax','ui.bootstrap']).config(function ($routeProvider) {
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
    .when('/home',{
      templateUrl: 'views/main/home.html',
      controller: 'HomeCtrl'
    })
    .when('/subscription',{
      templateUrl: 'views/main/subscription.html',
      controller: 'SubscriptionCtrl',
      resolve: {
          loadData : function(subscriptionService){
              return subscriptionService.getSubscription();
          }
      }
    })
    .when('/myprofile',{
      templateUrl: 'views/main/myprofile.html',
      controller: 'MyprofileCtrl'
    })
    .when('/location',{
      templateUrl: 'views/main/location.html',
      controller: 'LocationCtrl'
    })
    .when('/information',{
      templateUrl: 'views/main/information.html',
      controller: 'InformationCtrl'
    })

    .otherwise({
      redirectTo: '/login'
    });
});
