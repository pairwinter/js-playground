'use strict';

//the app/scripts/main.js file, which defines our RequireJS config
require.config({
    paths: {
        angular: 'vendor/angular.min',
        jquery: 'vendor/jquery',
        domReady: 'vendor/require/domReady',
        twitter: 'vendor/bootstrap',
        angularResource: 'vendor/angular-resource.min'
    },
    shim: {
        'twitter/js/bootstrap': {
            deps: ['jquery/jquery']
        },
        angular: {
            deps: ['jquery/jquery', 'twitter/js/bootstrap'],
            exports: 'angular'
        },
        angularResource: {
            deps: ['angular']
        }
    }
});

require([
    'app',
    //Note this is not Twitter Bootstrap
    //but our AngularJS bootstrap
    'bootstrap',
    'controllers/mainControllers',
    'services/searchServices',
    'directives/ngbkFocus'
    //Any individual controller, service, directive or filter file
    //that you add will need to be pulled in here.
    //This will have to be maintained by hand.
],
    function(angular, app){
        'use strict';

        app.config(['$routeProvider',
            function($routeProvider){
                //define your Routes here
            }
        ]);
    }
);
