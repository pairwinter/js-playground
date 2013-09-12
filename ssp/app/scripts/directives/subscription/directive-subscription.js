'use strict';
angular.module('sspApp').directive('sspSubscription', function(){
  return {
    restict: 'A',
    templateUrl:"/views/template/subscription/template_subscription.html",
    link: function(scope, element){
      scope.selectAllCategories = function(subscription){
        angular.forEach(subscription.nodes,function(category,i){
          category.checked = subscription.checked;
          angular.forEach(category.nodes,function(leaf,i){
            leaf.checked = category.checked;
          })
        })
      };
      scope.categoryChange = function(category,subscription){
        angular.forEach(category.nodes,function(leaf,i){
          leaf.checked = category.checked;
        });
        var checkedNum = 0;
        angular.forEach(subscription.nodes,function(category,i){
          if(!category.checked){
            subscription.checked = false;
            return false;
          }else{
            checkedNum++
          }
        });
        subscription.checked = checkedNum >0 && subscription.nodes && checkedNum == subscription.nodes.length;
      };
      scope.selectLeaf = function(category,subscription){
        var checkedNum = 0;
        angular.forEach(category.nodes,function(leaf,i){
          if(!leaf.checked){
            category.checked = false;
            return false;
          }else{
            checkedNum++
          }
        });
        category.checked = checkedNum >0 && category.nodes && checkedNum == category.nodes.length;
        if(!category.checked){
          subscription.checked = false;
        }else{
          var checkedNum = 0;
          angular.forEach(subscription.nodes,function(category,i){
            if(!category.checked){
              subscription.checked = false;
              return false;
            }else{
              checkedNum++
            }
          });
          subscription.checked = checkedNum >0 && subscription.nodes && checkedNum == subscription.nodes.length;
        }
      }
    }
  };
});
