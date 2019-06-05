@extends('layouts.auth')
@section('title', 'Iniciar sesion')

@section('content')
<div class="h-100vh">
    <div class="mdl-grid no-padding">
        <div class="mdl-cell mdl-cell--6-col no-margin d-flex justify-center align-center h-100vh">
            <div class="d-flex flex-column padding-small" style="max-width: 400px">
                <h3 class="text-center">Iniciar sesión</h3>
                <form method="POST" action="{{ route('login') }}">
                    @csrf
            
                    <div class="w-100 mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input class="mdl-textfield__input" type="text" name="dni" maxlength="8" pattern="[0-9]*" id="dni" value="{{ old('dni') }}">
                        <label class="mdl-textfield__label" for="dni">{{ __('DNI') }}</label>
                        @error('dni')
                        <span class="text-error">{{ $message }}</span>
                        @enderror
                    </div>
    
                    <div class="pt-2 w-100 mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input class="mdl-textfield__input" type="password" name="password" id="password">
                        <label class="mdl-textfield__label" for="password">{{ __('Contraseña') }}</label>
                        @error('password')
                        <span class="text-error">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="pt-1">
                        <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="remember">
                            <input type="checkbox" id="remember" class="mdl-switch__input" {{ old('remember') ? 'checked' : '' }}>
                            <span class="mdl-switch__label">{{ __('Recordarme') }}</span>
                        </label>
                    </div>
                    
                    <div class="d-flex justify-end pt-3">
                        <button type="submit" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored w-100">
                            {{ __('Ingresar') }}
                        </button>  
                    </div>       
                </form>
            </div>
        </div>
        <div class="mdl-cell--hide-phone mdl-cell mdl-cell--6-col no-margin h-100vh w-50" style="background-image: url(https://cdn.vuetifyjs.com/images/parallax/material.jpg); background-size: cover; background-position: center">
            <div style="background: rgba(21, 96, 216,0.7)" class="h-100vh w-100 d-flex justify-center align-center">
                <h3 class="text-white">Sistema de Constancia de Pagos</h3>
            </div>
        </div>
    </div>
        
</div>
                    
                
@endsection