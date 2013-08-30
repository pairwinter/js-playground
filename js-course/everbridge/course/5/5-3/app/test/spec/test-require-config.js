'use strict';

'use strict';

//the app/scripts/main.js file, which defines our RequireJS config
require.config({
//    enforceDefine:true,
  baseUrl:'/base/',
  paths: {
    jquery: 'bower_components/jquery/jquery',
    domReady: 'bower_components/requirejs-domready/domReady',
    angular: 'bower_components/angular/angular',
    angularUi : 'bower_components/angular-ui/build/angular-ui',
    angularResource: 'bower_components/angular-resource/angular-resource',
    angularMocks: 'bower_components/angular-mocks/angular-mocks',
    c:'scripts/controllers',
    d:'scripts/directives',
    f:'scripts/filters',
    s:'scripts/services',
    routeDependencyResolveService : 'scripts/services/RouteDependencyResolve',
    configModuleBaseService : 'scripts/services/ConfigModuleBase',
    v:'scripts/views',
    tsc:'test/spec/controllers'
  },
  shim:{
    angularUi:{
      deps : ['angular']
    },
    angularResource:{
      deps : ['angular']
    },
    angularMocks:{
      deps : ['angular']
    }
  }
});
var list = [
  'domReady',
  'angularMocks',
  'tsc/todo/spec-controller-todo'
]
require(list,function(domReady){
  domReady(function(){
    window.__karma__.start();
  })
});