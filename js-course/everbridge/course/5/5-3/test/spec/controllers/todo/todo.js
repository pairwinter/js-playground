'use strict';

describe('Controller: TodoTodoCtrl', function () {

  // load the controller's module
  beforeEach(module('qweApp'));

  var TodoTodoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TodoTodoCtrl = $controller('TodoTodoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
