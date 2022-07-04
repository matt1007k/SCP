<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Auth::routes();

Route::get('/', function () {
    return redirect()->route('login');
});

Route::namespace ('Admin')->group(function () {
    Route::redirect('/home', '/admin', 302);

    Route::get('/boleta/por-mes/{params_code}', 'ReporteController@byMesApi')->name('admin.reporte.bymesapi');

    Route::middleware(['auth'])->group(function () {
        Route::get('/admin/{any?}', 'DashboardController@index')
            ->where('any', '.*');

        Route::get('/getCount', 'DashboardController@getCount')->name('admin.count');
        Route::get('/getTotalPagos', 'DashboardController@getTotalPagos')->name('admin.total_pagos');
        Route::get('/getTotalPersonas', 'DashboardController@getTotalPersonas')->name('admin.total_personas');
        Route::get('/getTotalConstancias', 'DashboardController@getTotalConstancias')->name('admin.total_constancias');
        Route::get('/getTotalConstanciasByUsers', 'DashboardController@getTotalConstanciasByUsers')->name('admin.total_constancias_by_users');

        Route::resource('periodos', 'PeriodoController')
            ->except(['show', 'create', 'edit']);
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

        Route::resource('historiales', 'HistorialController')
            ->only(['index', 'destroy', 'update']);

        Route::get('/search-personas', 'PersonaController@search')->name('personas.search');
        Route::get('/search-descuentos', 'DescuentoController@search')->name('descuentos.search');

        Route::get('/getRoles', 'RoleController@getRoles')->name('getRoles');
        Route::get('/getPermissions', 'PermissionController@getPermissions')->name('getPermissions');

        Route::post('/importar/personas', 'ImportarController@personas')->name('admin.importar.personas');
        Route::post('/importar/update-people', 'ImportarController@updateDataPersonas')->name('admin.importar.update-personas');

        Route::post('/importar/descuentos', 'ImportarController@descuentos')->name('admin.importar.descuentos');
        Route::post('/importar/judiciales', 'ImportarController@judiciales')->name('admin.importar.judiciales');

        Route::get('/search/por-anios', 'ReporteController@searchByYears')->name('admin.search.poranios');
        Route::get('/search/por-anio', 'ReporteController@searchByYear')->name('admin.search.poranio');
        Route::get('/search/por-mes', 'ReporteController@searchByYearAndMonth')->name('admin.search.poranio');
        Route::get('/search/por-judicial', 'ReporteController@searchByJudicial')->name('admin.search.porjudicial');

        Route::get('/reporte/por-anios/{params_code}', 'ReporteController@porAnios')->name('admin.reporte.poranios');
        Route::get('/reporte/por-anio/{params_code}', 'ReporteController@porAnio')->name('admin.reporte.poranio');
        Route::get('/reporte/por-mes/{params_code}', 'ReporteController@porMes')->name('admin.reporte.pormes');
        Route::get('/reporte/judicial/{params_code}', 'ReporteController@byJudicial')->name('admin.reporte.porjudicial');

        Route::get('/unread-notifications', 'DashboardController@getUnReadNotifications');
        Route::get('/mark-all-read', 'DashboardController@markAllNotifications');

        Route::get('/get-my-total-constancias', 'DashboardController@getMyTotalConstancias');
        Route::put('/usuario/{id}', 'UserController@editarAuth');
        Route::put('/password-reset/{id}', 'UserController@passwordReset');
    });
});
