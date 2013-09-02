'use strict';

define(['angularMocks','d/direc'],function(){
  describe('ngbkFocus Directive', function() {
    beforeEach(module('directives'));

    // These will be initialized before each spec (each it(), that is),
    // and reused
    var elem;
    beforeEach(inject(function($rootScope, $compile) {
      elem = $compile('<input type=”text” ngbk-focus>')($rootScope);
    }));

    it('should have focus immediately', function() {
      expect(elem.hasClass('focus')).toBeTruthy();
    });
  });
});


