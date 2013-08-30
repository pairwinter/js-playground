'use strict';

define(['angularMocks','v/todo/module-todo','c/todo/controller-todo'],function(){
  describe('todo controller',function(){
    beforeEach(module('mytodoApp'));
    var TodoCtrl, scope;
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      TodoCtrl = $controller('TodoController', {
        $scope: scope
      });
    }));
    it('should attach a list of todo itmes to the scope', function () {
      expect(scope.todos.length).toBe(3);
    });
  });
});


