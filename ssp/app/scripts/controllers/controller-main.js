'use strict';

angular.module('sspApp').controller('MainCtrl', function ($scope) {
  $scope.stepUrl = "";
  $scope.signup = false;
  $scope.isShowLogin = true;
  $scope.isShowSignup = true;
  $scope.isShowHome = false;
  $scope.isShowUsername = false;
  $scope.$on('LoginFaild',function(event,name){
    $scope.isShowLogin = true;
    $scope.isShowSignup = true;
    $scope.isShowHome = false;
    $scope.isShowUsername = false;
    $scope.username = "";
  });
  $scope.$on('LoginSuccess',function(event,name){
    $scope.isShowLogin = false;
    $scope.isShowSignup = false;
    $scope.isShowHome = true;
    $scope.isShowUsername = true;
    $scope.username = name;
  });
  $scope.$on('SignupSuccess',function(event,name){
    $scope.signup = true;
    $scope.isShowLogin = false;
    $scope.isShowSignup = false;
    $scope.isShowHome = false;
    $scope.isShowUsername = true;
    $scope.username = name;
    $scope.stepUrl = 'views/main/subscription.html';
  });
  $scope.$on('SubscriptionSuccess',function(event,name){
    $scope.signup = true;
    $scope.isShowLogin = false;
    $scope.isShowSignup = false;
    $scope.isShowHome = false;
    $scope.isShowUsername = true;
    $scope.username = name;
    $scope.stepUrl = 'views/main/subscription.html';
  });



});
