@extends('layouts.auth')
@section('title', 'Iniciar sesion')

@section('content')
<div class="h-100vh no-margin w-100" style="background-image: url({{asset('img/dre-ayacucho.png')}}); background-size: cover; background-position: center">
    <div style="background: rgba(21, 96, 216,0.7)" class="h-100vh w-100 d-flex justify-center align-center">
        
        <div class=" d-flex justify-center flex-column align-center" >

            <h1 class="text-white mdc-typography--headline1 no-margin">404</h1>
            <h4 class="text-white mdc-typography--headline4 no-margin">Página no encontrada</h4>
            <h3 class="text-white">Está página no existe verifique la ruta exista.</h3>
            @can('permission:admin.index')
                <a href="{{ url('/') }}" class="foo-button mdc-button mdc-button--raised mdc-theme--secondary-bg">Regresar a inicio</a>
            @else
                <a href="{{ route('consulta.index') }}" class="foo-button mdc-button mdc-button--raised mdc-theme--secondary-bg">Regresar atrás</a>
            @endcan
        </div>
    </div>
        
</div>
                    
                
@endsection