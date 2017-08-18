<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/
use Goutte\Client;
use Illuminate\Http\Request;


Route::get('/', function () {
    return view('app');
});



Route::get('/goute', function(){
    
    $client = new Client();
    $crawler = $client->request('GET', 'http://www.pjbc.gob.mx/boletinj/2017/my_html/ti170426.htm');
    $result = [];

    //http://www.pjbc.gob.mx/boletinj/2017/my_html/ti170426.htm
    
    $crawler->filter('div[class="WordSection1"]')->first();
    

    foreach ($crawler as $domElement) 
    {
        print_r($domElement->firstChild->nextSibling->nodeValue);
    }


    return $result;
});


Route::get('/boletin', function(Request $request){
   
    $curl = new anlutro\cURL\cURL;
    
    $key = $request->input('key');
    
    $response = $curl->get('http://www.pjbc.gob.mx/boletinj/2017/my_html/'.$key.'.htm');
    
    if($response->statusCode == '200')
    {

        $that = mb_convert_encoding($response->body, 'HTML-ENTITIES', 'windows-1252');
    
    
        $group = ['title'=> $key,'date'=> $key ,'content'=> $that];
    
        return $group;
        
    }else
    {
        return abort(404);
    }
    
    
    
    
});