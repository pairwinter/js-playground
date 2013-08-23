'use strict';

describe("Search Results", function(){

  beforeEach(function(){
    browser().navigateTo("/course/5/5-3/tests/list.html");
  });
  it("Should filter results", function(){
    input("todo").enter("jacksparrow");
    element(":button").click();
    expect(repeater("ul li").count()).toEqual(1);

    input("todo").enter("jacksparrow");
    element(":button").click();
    expect(repeater("ul li").count()).toEqual(1);

    input("todo").enter("jacksparrow");
    element(":button").click();
    expect(repeater("ul li").count()).toEqual(1);

    input("todo").enter("jacksparrow");
    element(":button").click();
    expect(repeater("ul li").count()).toEqual(1);
  });
});