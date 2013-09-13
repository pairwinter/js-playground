'use strict';
angular.module('sspApp').controller('MyprofileCtrl', ['$scope','myprofileService',function ($scope,myprofileService) {

    console.log('MyprofileCtrl');

    myprofileService.getMyprofile(null,function(data){
      $scope.profiles = data.myprofile.profiles;
    });
    $scope.submit = function(){
      myprofileService.getMyprofile(null,function(){

      });
    };
    myprofileService.getDeliverpath(null,function(data){
        $scope.countries = data.deliverpath.countries;
        $scope.paths = data.deliverpath.paths;
        $scope.callingsStr = data.deliverpath.callingsStr;
        $scope.ttytddCountries = [];
        angular.forEach($scope.countries,function(country,i){
            if(country.code === 'US' || country.code === 'CA'){
                $scope.ttytddCountries.push(country);
            }
        });
    });
    $scope.deliverpathSortComplete = {
        update:function(e,ui){
            console.log(e);
        }
    };
    $scope.deliverpathUp = function($index){
        if( $index == 0){
            return;
        }
        $scope.paths.splice($index-1,0,$scope.paths.splice($index,1)[0]);
    }
    $scope.deliverpathDown = function($index){
        if( $index == $scope.paths.length-1){
            return;
        }
        $scope.paths.splice($index+1,0,$scope.paths.splice($index,1)[0]);
    }

    $scope.private =true;
  }]);
