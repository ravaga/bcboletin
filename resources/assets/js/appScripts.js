

var TARGET_DIV = '.WordSection1';
var RESULTS_DIV = '#results';



function init()
{
    $('.clearBtn').hide();
    $('#placeHolder .loadingText').hide();
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



function liveSearch()
{
    var elementID = '#search';
    var searchIn = 'table tr'; 
    var searchFor = '.fileNo > p';
    $(elementID).on('keyup', function(){
        var value = $(this).val();
        $(searchIn).each(function(index){
            
            if(index != 0)
            {
                $row = $(this);
                var id = $row.find(searchFor).text();
                
                if(id.indexOf(value) != 0)
                {
                    $row.hide()
                }
                else
                {
                    $row.show()
                }
            }
            if(id == value && value != '')
            {
                swal('Its a match!!', $row.find('.fileText').text() , 'success')
                $row.addClass('success');
            }
            
        });
        
    });
}


/*
| SEARCH AND UPDATE
|
*/
function searching()
{
    
    $('#navForm select').attr('disabled', 'disabled');
    $('#navForm input').attr('disabled', 'disabled');
    $('.searchBtn').hide();
    $('.clearBtn').show();
    $('#placeHolder .welcomeText').hide();
    $('#placeHolder .loadingText').show();

}

function doneSearching()
{
    $('#placeHolder').hide();
    $('#boletin').show();
}


function newSearch()
{
    $('#boletin').hide()
    $(RESULTS_DIV).children().remove();
    $('#placeHolder').show();
    $('#placeHolder .welcomeText').show();
    $('#placeHolder .loadingText').hide();
    $('#navForm select').val(function(){
        $(this).removeAttr('disabled')
        return
    });
    $('#navForm input').val(function(){
        $(this).removeAttr('disabled')
        return
    });
    $('.searchBtn').show();
    $('.clearBtn').hide();
    
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
function todayKey()
{
    var date = new Date();
    return ''+date.getYear()-100+''+(date.getMonth() + 1)+''+function(){
            if(date.getDate() < 10){return '0'+date.getDate()}
            else{return date.getDate()}
        }() + ''
}

/*
|   FORMATTING
*/

//apply bootstrap class to tables
function bootstrapTables()
{
    $(TARGET_DIV).find('table').each(function(){
        $(this).wrap('<div class="table-responsive"></div>')
        $(this).addClass('table table-striped table-hover');
        $('tr > td:nth-child(1)', this).addClass('fileIndex');
        $('tr > td:nth-child(2)', this).addClass('fileNo');
        $('tr > td:nth-child(3)', this).addClass('fileText');
    });

    $(TARGET_DIV).find('div').each(function(){

        if(!$(this).hasClass('table-responsive'))
        {
            $(this).addClass('parent').css('background', 'red !important');
        }

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
    
    
    
