'use strict';
angular.module('sspApp').controller('SubscriptionCtrl', ['$scope', 'subscriptionService', '$timeout', '$route', function ($scope, subscriptionService, $timeout, $route) {
    $scope.subscriptions = $route.current.locals.loadData.subscriptions;
    $scope.submit = function () {
        subscriptionService.saveSubscription({subscriptions: $scope.subscriptions}, function (data) {
            console.log(data.subscriptions);
            $scope.alerts = [
                {type: 'success', msg: 'Well done! You successfully Saved!'}
            ];
            $timeout(function () {
                $scope.alerts = [];
            }, 3000);
        })
    };
}]);

