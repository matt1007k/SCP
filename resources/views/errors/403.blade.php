@extends('layouts.auth')
@section('title', 'Sin Autorización')

@section('content')
<div class="h-100vh no-margin w-100" style="background-image: url({{asset('img/dre-ayacucho.png')}}); background-size: cover; background-position: center">
    <div style="background: rgba(21, 96, 216,0.7)" class="h-100vh w-100 d-flex justify-center align-center">
        
        <div class=" d-flex justify-center flex-column align-center" >

            <h1 class="text-primary mdc-fz-2 no-margin">403</h1>
            <h2 class="text-primary mdc-typography--headline2 no-margin">Sin Autorización</h2>
            <h3 class="text-primary">No tienes autorizado haber esta operación.</h3>
            
            <a href="{{ url('/') }}" class="foo-button mdc-button mdc-button--raised mdc-theme--secondary-bg">Regresar a inicio</a>
                
           
        </div>
    </div>
        
</div>
                    
                
@endsection