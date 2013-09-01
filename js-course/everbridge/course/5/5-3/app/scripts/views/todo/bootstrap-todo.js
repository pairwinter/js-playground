define(['v/todo/module-todo','domReady'], function(module,domReady) {
  window.name = '';
  domReady(function(){
    angular.bootstrap(document, ['mytodoApp']);
  });
});