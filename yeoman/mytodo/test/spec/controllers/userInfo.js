'use strict';

describe('Controller: UserinfoCtrl', function () {

  // load the controller's module
  beforeEach(module('mytodoApp'));

  var UserinfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserinfoCtrl = $controller('UserinfoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
