/**
 * 定义模块
 * @type {*}
 */
var todomvc = angular.module('todomvc',[]);


/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('TodoCtrl', function TodoCtrl($scope, $location, todoStorage, filterFilter) {
    var todos = $scope.todos = todoStorage.get();

    $scope.newTodo = '';
    $scope.editedTodo = null;

    $scope.$watch('todos', function () {
        $scope.remainingCount = filterFilter(todos, { completed: false }).length;
        $scope.completedCount = todos.length - $scope.remainingCount;
        $scope.allChecked = !$scope.remainingCount;
        todoStorage.put(todos);
    }, true);

    if ($location.path() === '') {
        $location.path('/');
    }

    $scope.location = $location;

    $scope.$watch('location.path()', function (path) {
        $scope.statusFilter = (path === '/active') ?
        { completed: false } : (path === '/completed') ?
        { completed: true } : null;
    });

    $scope.addTodo = function () {
        var newTodo = $scope.newTodo.trim();
        if (!newTodo.length) {
            return;
        }

        todos.push({
            title: newTodo,
            completed: false
        });

        $scope.newTodo = '';
    };

    $scope.editTodo = function (todo) {
        $scope.editedTodo = todo;
    };

    $scope.doneEditing = function (todo) {
        $scope.editedTodo = null;
        todo.title = todo.title.trim();

        if (!todo.title) {
            $scope.removeTodo(todo);
        }
    };

    $scope.removeTodo = function (todo) {
        todos.splice(todos.indexOf(todo), 1);
    };

    $scope.clearCompletedTodos = function () {
        $scope.todos = todos = todos.filter(function (val) {
            return !val.completed;
        });
    };

    $scope.markAll = function (completed) {
        todos.forEach(function (todo) {
            todo.completed = completed;
        });
    };
});


/**
 *持久化todos数据
 */

todomvc.factory('todoStorage',function(){
    var STORAGE_ID = 'todos-angularjs';
    return {
        get : function(){
            return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
        },
        put : function(todos){
            localStorage.setItem(STORAGE_ID,JSON.stringify(todos));
        }
    }
});

/**
 * directives ,添加事件处理
 */
todomvc.directive('todoBlur',function(){
    return function(scope,elem,attrs){
        elem.bind('blur',function(){
            scope.$apply(attrs.todoBlur);
        })
    }
});
//Directive that places focus on the element it is applied to when the expression it binds to evaluates to true
todomvc.directive('todoFocus',function todoFocus($timeout){
    return function(scope,elem,attrs){
        scope.$watch(attrs.todoFocus,function(newVal){
            if(newVal){
                $timeout(function(){
                    elem[0].focus();
                },0,false);
            }
        })
    }
});
