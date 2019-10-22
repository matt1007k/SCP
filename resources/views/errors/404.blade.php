@extends('layouts.auth')
@section('title', 'Página no encontrada')

@section('content')
<div class="h-100vh no-margin w-100">
    <div  class="h-100vh w-100 d-flex justify-center align-center">
        
        <div class="d-flex justify-center flex-column align-center" >

            <h1 class="text-primary mdc-fz-2 no-margin">404</h1>
            <h4 class="text-primary mdc-typography--headline2 no-margin">Página no encontrada</h4>
            <h3 class="text-primary">Está página no existe, verifique que la ruta sea correcta.</h3>
           
            <a href="{{ url('/') }}" class="foo-button mdc-button mdc-button--raised mdc-theme--secondary-bg">Regresar a inicio</a>
            
        </div>
    </div>
        
</div>
                    
                
@endsection