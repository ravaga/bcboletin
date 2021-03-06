const elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {
    mix.sass('app.scss')
       .webpack(['app.js', 'controllers.js', 'services.js', 'factories.js']);
    
    
    
    //Dependencies
    mix.scripts(
        [
            '../../../bower_components/jquery/dist/jquery.js',
            '../../../bower_components/bootstrap/dist/js/bootstrap.js',
            '../../../bower_components/angular/angular.js',
            '../../../bower_components/moment/moment.js',
            '../../../bower_components/angular-route/angular-route.js',
            '../../../node_modules/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
            '../../../node_modules/angular-bootstrap-datetimepicker/src/js/datetimepicker.templates.js',
            '../../../bower_components/sweetalert/dist/sweetalert-dev.js',
        ], 
        'public/js/scripts.js');
    
    mix.scripts('appScripts.js', 'public/js/plugin.js');
    
        
    mix.copy(['node_modules/bootstrap-sass/assets/fonts', 'bower_components/font-awesome/fonts'], 'public/fonts');
    
    
    
});
