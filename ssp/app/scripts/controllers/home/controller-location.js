'use strict';
angular.module('sspApp').controller('LocationCtrl', ['$scope','locationService',function ($scope,locationService) {
    var idCount = 1110;
    locationService.getLocation(null,function(data){
        $scope.addresses = data.location.addresses || [];
        $scope.countries = data.location.countries;
        $scope.address = angular.copy($scope.addresses[0]) || {isAdd:true};
        $scope.states  = data.location.states;
    });

//    click add new button
    $scope.addNew = function(){
        if($scope.address && $scope.address.isAdd){
            return;
        }
        $scope.address = {isAdd:true};
    }
//    click edit button
    $scope.edit = function($index){
        $scope.address = angular.copy($scope.addresses[$index]);
    };

//    click remove button
    $scope.remove = function(id){
        angular.forEach($scope.addresses,function(address,i){
            if(address.id === id){
                $scope.addresses.splice(i,1);
            }
        });
        if($scope.address && $scope.address.id === id){
            $scope.address = {isAdd:true};
        }
    };
//  save or add submit
    $scope.submit = function(){
        var id = $scope.address.id;
        if(id){
            angular.forEach($scope.addresses,function(address,i){
                if(address.id === id){
                    $scope.addresses.splice(i,1,angular.copy($scope.address));
                    $scope.address = {isAdd:true};
                }
            });
        }else{
            var address = angular.copy($scope.address);
            delete address.isAdd;
            locationService.saveLocation({address:address},function(data){
                $scope.addresses.push(data.address);
                $scope.address = {isAdd:true};
            });
        }
    }
  }]);
