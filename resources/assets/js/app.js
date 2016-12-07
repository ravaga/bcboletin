

(function(){
    'use strict';
    
    var app = angular.module('bcBoletin', ['ngRoute', 'ui.bootstrap.datetimepicker']);
    
    var debugMode = false;

    
    
    app.config(['$routeProvider' ,function($routeProvider){

        $routeProvider
        .when('/' , {
            templateUrl: 'views/index.html',
            controller:'mainController'
        })

        .otherwise({redirectTo:'/'});


    }]);

    
    
})();


