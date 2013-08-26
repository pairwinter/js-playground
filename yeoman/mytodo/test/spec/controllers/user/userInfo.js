'use strict';

describe('Controller: UserUserinfoCtrl', function () {

  // load the controller's module
  beforeEach(module('mytodoApp'));

  var UserUserinfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserUserinfoCtrl = $controller('UserUserinfoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
