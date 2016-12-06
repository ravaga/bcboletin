

(function(){
    
    var app = angular.module('bcBoletin', ['ngRoute', 'ui.bootstrap.datetimepicker', 'angular-loading-bar']);
    
    var debugMode = false;

    
    
    app.config(function($routeProvider){

        $routeProvider
        .when('/' , {
            templateUrl: 'views/index.html',
            controller:'indexController'
        })

        .otherwise({redirectTo:'/'});


    });


    app.controller('indexController', [
        '$scope', 
        '$log',
        'HttpFactory',
        'CleanUpService',
        'FormatService',
        function($scope, $log, HttpFactory, CleanUpService,FormatService){
            
            $('#emptyBoletin').show()
            
            var date = new Date();
            var year = date.getYear() - 100;
            var month= date.getMonth() + 1;
            var day = date.getDate();
        
            $scope.today = date;

            $scope.search = function(file)
            {
                
                if(day < 10)
                {
                    day = '0'+day
                }

                if(file == undefined){swal('Selecciona una ciudad'); return false}
                if(file.city == undefined){swal('Choose City'); return false}
                if(file.date != undefined)
                {
                    var arr = file.date.split('-');
                    year = arr[0]
                    month = arr[1]
                    day = arr[2]

                }
                
                var key = file.city+year+month+day
                //ti161202
                $('#emptyBoletin').children().remove()
                $('#emptyBoletin').append('<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span class="sr-only">Loading...</span>');
                
                HttpFactory.get(key).then(function success(response){
                    //$('#emptyBoletin').hide();
                    var WordSection1 = CleanUpService.parseMainDiv(response.content)
                    var CleanedDiv = CleanUpService.cleanHtml(WordSection1)
                    if(CleanedDiv)
                    {
                        FormatService.formatTables();
                        $('#boletin').css('visibility', 'visible');
                        $('#emptyBoletin').hide();
                    }
                });

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
    
    
    app.service('FormatService', ['$log', function($log){
        
        function getTitle()
        {
            if(debugMode){$log.debug('Setting Title Classes')}
            
            var format = $('.formatedResults')
            var title = '';
            var subtitle = '';
            var dateNo = '';
            
            var mainTitle  = $('.WordSection1 > div').first()
            mainTitle.find('h1').each(function(){
                title += $(this).text() + ' ';
            });
            mainTitle.find('h2').each(function(){
                subtitle += $(this).text() + ' ';
            });
            mainTitle.find('p').each(function(){
                dateNo += $(this).html()+ ' ';
            });
            
            format.append('<div class="row text-center" id="boletin_title"><h1>'+title+'</h1><h2>'+ subtitle +'</h2><p>'+dateNo+'<p></div>')
            mainTitle.remove()
        }
        
        
        function getHeader()
        {
            var format = $('.formatedResults')
            var header = ''
            
            var ps6 = $('.WordSection1 > p:lt(6)').each(function(){
                header += $(this).html() + '<br/> '
            });
            
            format.append('<div class="row boletin_header"><div class="col-md-6 col-md-offet-3">'+ header +'</div></div>')
            ps6.remove()
        }
        
        
        function formatTables()
        {
           $('.WordSection1').find('table').each(function(){
                $(this).wrap('<div class="table-responsive"></div>')
               $(this).addClass('table table-striped table-hover');
               $('tr > td:nth-child(2)', this).addClass('fileNo');
           });

        }
        
        return{
            getTitle:getTitle,
            getHeader:getHeader,
            formatTables:formatTables
        }
        
        
        
    }]);
    
/**
|
|   Cleanup Html Service
|
*/    
    app.service('CleanUpService', ['$log', function($log){
        

        
        function parseMainDiv($html)
        {
            if(debugMode){$log.info('ParseMainDiv')}
            
            var parser = $($.parseHTML($html));
            var mainDiv = []
            angular.forEach(parser, function(o, i){
                
                if(o.className == 'WordSection1')
                {
                     mainDiv.push(o.outerHTML);
                }
                
            });
            
            return mainDiv[0];
        }
        
        
        function cleanHtml($html)
        {
            if(debugMode){$log.info('cleanHtml')}
            
            if(printHtml($html))
            {
                $('.WordSection1').find('*').each(function(){
                    $(this).removeAttributes();
                    $(this).filter(function(){return $(this).text().trim().length==0}).remove()
                    
                });
                
                
                
                $('.WordSection1').find('span').replaceWith(function(){ 
                    return $(this).contents();
                });
                
                $('.WordSection1').find('i').replaceWith(function(){
                    
                    return $(this).contents();
                })
                
                $('o\\:p').remove()
            
            }
            $log.info('Done')
            return true;
        }
        
        
        function printHtml($html)
        {
            if(debugMode){$log.info('PrintHtml')}
            
            var resultDiv = $('#results')
            
            resultDiv.append($html);
            
            return true
        }
        
        return{
            cleanHtml: cleanHtml,
            parseMainDiv:parseMainDiv
        }
    }]);
    
/**
|
|   Http Calls Factory
|
*/   
    app.factory('HttpFactory', ['$http', '$q','$log', 'CleanUpService', function($http, $q, $log, CleanUpService){
        
        
        function get(key)
        {
            $that = $q.defer();
        
            $http.get('/boletin?key='+key+'').then(function success(response){

                $log.debug('HttpFactory response', response)
                //swal('Yei!', 'Archivo no encontrado :)', 'success')
                $that.resolve(response.data);

            }, function error(err){

                $log.warn('HttpFactory error', err)
                swal('404', 'Archivo no encontrado :(', 'error')

            });

            return $that.promise;    
        }
        
        return{
            get:get
        }
        
    }]);
    
    // Remove Attributes Plugin
    jQuery.fn.removeAttributes = function() 
        {
            return this.each(function() {
                
                var attributes = $.map(this.attributes, function(item) {
                    return item.name;
                });
                
                var element = $(this);
                $.each(attributes, function(i, item) {
                    element.removeAttr(item);
                });
            });
        }
    
    
})();


