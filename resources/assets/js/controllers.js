(function(){
    'use strict';
    
    //Main Module
    var app = angular.module('bcBoletin');
    
    //Debug Tools
    var debugMode = false;
    
    
    //Main Controller
    app.controller('mainController', [
        '$scope', 
        '$log',
        'HttpFactory',
        'CleanUpService',
        'FormatService',
        'boletinService',
        function($scope, $log, HttpFactory, CleanUpService,FormatService, boletinService){
            
            
            init()
            $scope.today = new Date();
            
            
            $scope.search = function(file)
            {
                var form = validate(file);
                if(!form.valid)
                {
                    swal(form.title,form.message,  'error')
                    return false
                }
                //form is valid remove elements and disable input
                searching()
                //make call and get boletin
                boletinService.getBoletin(form.key)
                
                //activate livesearch
                liveSearch()
                
                if(debugMode){$log.debug(file, form)} //debug
                
            }
            
            $scope.clear = function()
            {
                $scope.file = {}
                newSearch()
            }
            
            
            
    }]);
    
    
}());