(function(){
    'use strict';
    
    //Main Module
    var app = angular.module('bcBoletin');
    
    //Debug Tools
    var debugMode = true;
    
    
    /*
    |   HTTP CALLS FACTORY
    |   * Expects key for http call  
    */
    
    app.factory('HttpFactory', ['$http', '$q', '$log', function($http, $q, $log){
        
        function makeCall(key)
        {
            var call = $q.defer();
            
            $http.get('/boletin?key='+key+'')
                .then(function success(response){
                
                if(debugMode){$log.debug('Http Response', response)} //debug
                
                call.resolve(response.data);
                
            }, function error(err){
                
                if(debugMode){$log.warn('Http Error', err.statusText)}
                
                swal('Error', 'Archivo no encontrado..', 'error')
                call.resolve(err)
                
            });
            
            return call.promise;
        }
        
        return{
            makeCall:makeCall
        }
        
    }]);
    
    
    
    
    
}());