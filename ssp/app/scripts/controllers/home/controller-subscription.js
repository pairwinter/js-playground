'use strict';
angular.module('sspApp').controller('SubscriptionCtrl', ['$scope','subscriptionService','$timeout',function ($scope,subscriptionService,$timeout) {
  subscriptionService.getSubscription(null,function(data){
    $scope.subscriptions = data.subscriptions;
  });
  $scope.submit = function(){
    subscriptionService.saveSubscription({subscriptions:$scope.subscriptions},function(data){
      console.log(data.subscriptions);
      $scope.alerts = [{type:'success',msg:'Well done! You successfully Saved!'}];
      $timeout(function(){
        $scope.alerts = [];
      },3000);
    })
  };
}]);

