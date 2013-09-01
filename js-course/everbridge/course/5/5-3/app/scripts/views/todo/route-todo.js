'use strict';
define(function(){
  return {
    defaultRoutePath:'/',
    routes:{
      '/todo':{
        templateUrl:'/course/5/5-3/app/views/todo/todo.html',
        dependencies:['c/todo/controller-todo']
      }
    }
  }
});