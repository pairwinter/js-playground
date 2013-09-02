'use strict';

describe("Test Todo", function () {
  beforeEach(function () {
    browser().navigateTo("/course/5/5-3/app/views/main.html");
  });
  describe('todo', function () {
    beforeEach(function () {
      browser().navigateTo('#/todo');
      sleep(0.5);
    });

    it('should render view1 when user navigates to /todo', function () {
      input("todo").enter("jacksparrow");
      element("[ng-view] :button").click();
      expect(repeater("ul li").count()).toEqual(4);
      element('[ng-view] .btn:first').click();
      expect(repeater("ul li").count()).toEqual(3);
      input("todo").enter("");
      expect(repeater("ul li").count()).toEqual(3);
    });
  });
});