'use strict';
angular.module('sspApp').controller('InformationCtrl',['$scope','informationService',function ($scope,informationService) {
    informationService.getInformation(null,function(data){
        $scope.customFields = data.information.customFields;
    });
  }]);
