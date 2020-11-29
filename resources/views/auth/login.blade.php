@extends('layouts.auth')
@section('title', 'Iniciar sesion')

@section('content')
    <div class="auth__wrapper">
        <div class="auth__content">
            <h1>SISTEMA DE CONSTANCIAS DE PAGO</h1>
            <p>Gestiona los procesos en la entrega de constancias de pago.</p>
            <img src="{{ asset('img/payment-card.png') }}" alt="payment card">
        </div>
        <div class="auth__form">
                <img src="{{ asset('img/logo-scp-light.png') }}" alt="Logo DREA">
                <h4>Iniciar sesión</h4>
                <form method="POST" action="{{ route('login') }}">
                    @csrf

                    <div class="mb-2">
                        <input type="text" id="dni" class="form__control @error('dni') input__invalid  @enderror" name="dni" maxlength="8" value="{{ old('dni') }}" placeholder="Ingrese su DNI" required>
                        @error('dni')
                            <span class="text__error mt-1">{{ $message }}</span>
                        @enderror
                    </div>
                        
                    <div class="mb-2">
                        <input type="password" id="password" class="form__control @error('password') input__invalid  @enderror" name="password" value="{{ old('password') }}" placeholder="Ingrese su Contraseña" required>
                        @error('password')
                            <span class="text__error">{{ $message }}</span>
                        @enderror   
                    </div>
                    
                    <div class="mt-1">
                        <input type="checkbox"
                                    class="mdc-checkbox__native-control"
                                    id="remember" 
                                    name="remember" 
                                    {{ old('remember') ? 'selected': ''}}/>
                        <label for="remember">{{ __('Recordarme') }}</label>
                    </div>
                    
                    <div class="auth__actions pt-3">
                        <button class="btn btn__primary" type="submit">{{ __('Ingresar') }}</button> 
                    </div>       

                    
                </form>
        </div>
    </div>         
@endsection