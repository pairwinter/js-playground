'use strict';
angular.module('sspApp').directive('sspInformationCustomfield', function(){
  return {
    restict: 'A',
    templateUrl:"/views/template/information/template_information_customfield.html",
    link: function(scope, element){
        scope.customField.savedValuesSelected = [];
        scope.customField.definedValuesSelected = [];
        scope.customFieldsMove = function(moveTo){
            if(moveTo === 'right'){
                angular.forEach(scope.customField.definedValuesSelected,function(value){
                    scope.customField.savedValues.push(scope.customField.definedValues.splice(scope.customField.definedValues.indexOf(value),1)[0]);
                });
                scope.customField.definedValuesSelected = [];
            }else if(moveTo === 'left'){
                angular.forEach(scope.customField.savedValuesSelected,function(value){
                    scope.customField.definedValues.push(scope.customField.savedValues.splice(scope.customField.savedValues.indexOf(value),1)[0]);
                });
                scope.customField.savedValuesSelected = [];
            }else if(moveTo === 'rightAll'){
                scope.customField.savedValues = scope.customField.savedValues.concat(scope.customField.definedValues.splice(0));
            }else if(moveTo === 'leftAll'){
                scope.customField.definedValues = scope.customField.definedValues.concat(scope.customField.savedValues.splice(0));
            }
        }
    }
  };
});
