'use strict';
angular.module('mytodoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.todos = ['todo 1', 'todo 2', 'todo 3','todo 4'];
    /*
     var todosInStore = localStorageService.get('todos');
     $scope.todos = todosInStore && todosInStore.split('\n') || [];
     $scope.$watch(function(){
     localStorageService.add('todos',$scope.todos.join('\n'));
     });
     */
    $scope.addTodo = function () {
      if (!$scope.todo || !$scope.todo.trim()) {
        return;
      }
      $scope.todos.push($scope.todo);
      $scope.todo = '';
    };
    $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
    };
  });