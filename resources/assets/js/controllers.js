(function(){
    
    //Main Module
    var app = angular.module('bcBoletin');
    
    //Debug Tools
    var debugMode = true;
    
    
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
                boletinService.getBoletin(form.key)
                
                if(debugMode){$log.debug(file, form)} //debug
                
            }
            
            $scope.clear = function()
            {
                $('#search').val('');
            }
            
            $("#search").on("keyup", function() {
                var value = $(this).val();
                $("table tr").each(function(index) {
                    if (index != 0) {

                        $row = $(this);

                        var id = $row.find(".fileNo > p").text();
                        
                        if (id.indexOf(value) != 0) {
                            $(this).hide();
                        }
                        else {
                            $(this).show();
                        }
                    }
                });
            });
            
            
    }]);
    
    
}());