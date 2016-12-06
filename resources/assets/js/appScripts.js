 
function init()
{
    var height = $('.topNav').css('height');
    var navHeight = 100;
    if(parseInt(height) >= 150){navHeight = 250}
    $('body').css('padding-top', ''+navHeight+'px');
}
    
//Validate form
function validate(form)
{
    if(form == undefined)
        return {valid:false,title:'Error', message:'Algo anda mal.. intentalo de nuevo'}
    if(form.city == undefined)
        return {valid:false, title:'Error', message:'Selecciona una ciudad'}
    else
    {
        return {
            valid:true, 
            message:'Buscando archivo...', 
            key:function(){
                
                if(form.date != undefined){return genKey(form.city, customKey(form.date))}
                else{return genKey(form.city, todayKey())}
                
            }()
        }
    }
}
/*
| SEARCH AND UPDATE
|
*/
function searching(bool = true)
{
    if(bool)
    {
        $('#navForm select').attr('disabled', 'disabled');
        $('#navForm input').attr('disabled', 'disabled');
        $('#navForm button').html('Nueva');
        $('#emptyBoletin').children().remove()
        $('#emptyBoletin').append('<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span class="sr-only">Loading...</span>');
    }
}

function boletinReady()
{
    $('#boletin').css('visibility', 'visible');
    $('#emptyBoletin').hide();
    bootstrapTables()
}

//return key string combining city and date
function genKey(city, date)
{
    return city+date
}

//return custom date string 
function customKey(date)
{
    var arr = date.split('-')
    return ''+(parseInt(arr[0]) - 2000)+''+arr[1]+''+arr[2];
}


//return today's date string 
function todayKey(date = new Date())
{
    return ''+date.getYear()-100+''+(date.getMonth() + 1)+''+function(){
            if(date.getDate() < 10){return '0'+date.getDate()}
            else{return date.getDate()}
        }() + ''
}

/*
|   FORMATTING
*/

//apply bootstrap class to tables
var TARGET_DIV = '.WordSection1';
var RESULTS_DIV = '#results';

function bootstrapTables()
{
    $(TARGET_DIV).find('table').each(function(){
        $(this).wrap('<div class="table-responsive"></div>')
        $(this).addClass('table table-striped table-hover');
        $('tr > td:nth-child(2)', this).addClass('fileNo');
    });
}

//clear unwanted attributes
function clearAttributes()
{
    $(TARGET_DIV).find('*').each(function(){
        $(this).removeAttributes();
        $(this).filter(function(){return $(this).text().trim().length==0}).remove()
                        
    });
                
    $(TARGET_DIV).find('span').replaceWith(function(){ 
        return $(this).contents();
    });
                        
    $(TARGET_DIV).find('i').replaceWith(function(){
        return $(this).contents();
    })
                
    $('o\\:p').remove()
}

//Make it DOM accesible 
function printHtml($html)
{
    var resultDiv = $(RESULTS_DIV)
    resultDiv.append($html);            
    return true
}



/*
| Jquery Plugin's
*/

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
    
    
