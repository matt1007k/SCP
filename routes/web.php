<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Auth::routes();
Route::get('/users/sign_in', 'Auth\SignInController@showLoginForm')->name('users.signin');
Route::post('/users/sign_in', 'Auth\SignInController@login')->name('users.signin');
Route::post('/users/logout', 'Auth\SignInController@logout')->name('users.logout');

Route::get('/', function () {
    return redirect()->route('login');
});

Route::namespace ('Pages')->group(function () {
    Route::middleware(['auth', 'role:docente'])->group(function () {
        Route::get('consulta-pagos', 'ConsultaController@consulta')->name('consulta.index');
    });
});

Route::namespace ('Admin')->group(function () {
    Route::redirect('/home', '/admin', 302);

    Route::middleware(['auth'])->group(function () {
        Route::get('/admin/{any?}', 'DashboardController@index')
            ->where('any', '.*');

        Route::resource('usuarios', 'UserController')
            ->except(['show', 'create', 'edit']);
        Route::resource('roles', 'RoleController')
            ->except(['show', 'create', 'edit']);
        Route::resource('permisos', 'PermissionController')
            ->except(['show', 'create', 'edit']);
        Route::resource('personas', 'PersonaController')
            ->except(['show', 'create', 'edit']);
        Route::resource('descuentos', 'DescuentoController')
            ->except(['show', 'create', 'edit']);
        Route::resource('haberes', 'HaberController')
            ->except(['show', 'create', 'edit']);
        Route::resource('pagos', 'PagoController')
            ->except(['show', 'create']);

        Route::get('/search-personas', 'PersonaController@search')->name('personas.search');
        Route::get('/search-descuentos', 'DescuentoController@search')->name('descuentos.search');

        Route::get('/getRoles', 'RoleController@getRoles')->name('getRoles');
        Route::get('/getPermissions', 'PermissionController@getPermissions')->name('getPermissions');

        Route::post('/importar/personas', 'ImportarController@personas')->name('admin.importar.personas');
        Route::post('/importar/descuentos', 'ImportarController@descuentos')->name('admin.importar.descuentos');

        Route::get('/search/por-anio', 'ReporteController@searchByYear')->name('admin.search.poranio');
        Route::get('/search/por-mes', 'ReporteController@searchByYearAndMonth')->name('admin.search.poranio');

        Route::get('/reporte/por-anio', 'ReporteController@porAnio')->name('admin.reporte.poranio');
        Route::get('/reporte/por-mes', 'ReporteController@porMes')->name('admin.reporte.pormes');

    });

});
