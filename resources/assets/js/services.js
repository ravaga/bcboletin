(function(){
    
    // Main Module
    var app = angular.module('bcBoletin');
    
    // Debug Tools
    var debugMode = true;
    
    //Target Div
    var TARGET_DIV = 'WordSection1';
    
    /*  GET BOLETIN
    |   
    */
    
    app.service('boletinService', ['$log', 'HttpFactory', 'CleanUpService', function($log, HttpFactory, CleanUpService){
        
        function getBoletin(key)
        {
            return HttpFactory.makeCall(key)
                .then(function success(res){
                
                var CleanedDiv = CleanUpService.cleanHtml(CleanUpService.parseMainDiv(res.content))
                if(CleanedDiv)
                {
                    boletinReady()
                }
                
            });
        }
        
        return{
            getBoletin:getBoletin
        }
        
    }])
    
    /*  HTML CLEANUP
    |   * Receives xml string
    |   * Convert to jquery object
    |   * Removes unecesary & empty html tags
    */
    
    app.service('CleanUpService', ['$log', function($log){
            
        //Parse main string
        function parseMainDiv($html)
        {
            
            if(debugMode){$log.info('ParseMainDiv')} // debug
            
            var parser = $($.parseHTML($html));
            var mainDiv = []
            angular.forEach(parser, function(o, i){
                
                if(o.className == TARGET_DIV)
                {
                     mainDiv.push(o.outerHTML);
                }
                
            });
            return mainDiv[0];
        }
        
        //Remove empty tags
        function cleanHtml($html)
        {
            if(debugMode){$log.info('cleanHtml', TARGET_DIV)} // debug
            
            if(printHtml($html))
            {
                clearAttributes();
            }
            return true;
        }
        
        return{
            cleanHtml: cleanHtml,
            parseMainDiv:parseMainDiv
        }
    }]);
    
    

    /*  FORMAT SERVICE
    |   * Receives cleaned html
    |   * Applies new html&css formating
    */

    app.service('FormatService', ['$log', function($log){
        
        //Gets first div asuming its the boletin title
        function getTitle()
        {
            if(debugMode){$log.debug('Setting Title Class')} // debug
            
            var format = $('.formatedResults')
            var title = '';
            var subtitle = '';
            var dateNo = '';
            
            var mainTitle  = $('.'+TARGET_DIV+''+' > div').first()
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
            if(debugmode){$log.debug('Setting Header Class')} //debug
            var format = $('.formatedResults')
            var header = ''
            var ps6 = $(''+TARGET_DIV+' > p:lt(6)').each(function(){
                header += $(this).html() + '<br/> '
            });
            
            format.append('<div class="row boletin_header"><div class="col-md-6 col-md-offet-3">'+ header +'</div></div>')
            ps6.remove()
        }
        
        
        function formatTables()
        {
            if(debugMode){$log.debug('Applying table classes')} //debug
            
            bootstrapTables()

        }
        
        return{
            getTitle:getTitle,
            getHeader:getHeader,
            formatTables:formatTables
        }
        
        
        
    }]);
    
}());