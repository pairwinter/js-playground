define(['v/todo/module-todo','domReady'], function(module,domReady) {
  domReady(function() {
    angular.bootstrap(document, [module.name]);
    document.body.setAttribute('ng-app',module.name)
  });
});