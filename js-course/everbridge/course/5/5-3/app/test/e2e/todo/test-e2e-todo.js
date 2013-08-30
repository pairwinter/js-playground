'use strict';

describe("Test Todo", function(){
  beforeEach(function(){
    browser().navigateTo("/course/5/5-3/app/views/main.html#todo");
    sleep(1);
  });
  it("Should filter results", function(){
    input("todo").enter("jacksparrow");
    element(":button").click();
    expect(repeater("ul li").count()).toEqual(1);

    input("todo").enter("jacksparrow");
    element(":button").click();
    expect(repeater("ul li").count()).toEqual(1);
  });
});