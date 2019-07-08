@extends('layouts.auth')
@section('title', 'Iniciar sesion')

@section('content')
    <div class="row no-margin">
        <div class="col-md-6 col-xs-12 no-padding d-flex justify-center align-center">
            <div class="d-flex flex-column padding-small" style="max-width: 400px">
                <h2 class="text-center mdc-typography--headline5"><b>Iniciar sesión</b> </h2>
                <h5 class="mdc-typography--subtitle1 center-xs">Ingrese al sistema para realizar operaciones.</h5>
                <form method="POST" action="{{ route('login') }}">
                    @csrf

                    <div class="w-100 mdc-text-f mdc-text-field mdc-text-field--outlined @error('dni') mdc-text-field--invalid  @enderror" data-mdc-auto-init="MDCTextField">
                        <input type="text" id="dni" class="mdc-text-field__input " name="dni" maxlength="8" value="{{ old('dni') }}" required>
                        <div class="mdc-notched-outline">
                            <div class="mdc-notched-outline__leading"></div>
                            <div class="mdc-notched-outline__notch">
                                <label for="dni" class="mdc-floating-label">{{ __('Ingrese su DNI') }}</label>
                            </div>
                            <div class="mdc-notched-outline__trailing"></div>
                        </div>                        
                    </div>
                    @error('dni')
                        <span class="text-error">{{ $message }}</span>
                    @enderror
                        
                    <div class="mt-2 w-100 mdc-text-f mdc-text-field mdc-text-field--outlined @error('password') mdc-text-field--invalid  @enderror" data-mdc-auto-init="MDCTextField">
                        <input type="password" id="password" class="mdc-text-field__input" name="password" value="{{ old('password') }}" required>
                        <div class="mdc-notched-outline">
                            <div class="mdc-notched-outline__leading"></div>
                            <div class="mdc-notched-outline__notch">
                                <label for="password" class="mdc-floating-label">{{ __('Contraseña') }}</label>
                            </div>
                            <div class="mdc-notched-outline__trailing"></div>
                        </div>                        
                    </div>
                    @error('password')
                        <span class="text-error">{{ $message }}</span>
                    @enderror   
                    
                    <div class="mt-1">
                        <div class="mdc-form-field">
                            <div class="mdc-checkbox" data-mdc-auto-init="MDCCheckBox">
                                <input type="checkbox"
                                        class="mdc-checkbox__native-control"
                                        id="remember" 
                                        name="remember" 
                                        {{ old('remember') ? 'selected': ''}}/>
                                <div class="mdc-checkbox__background">
                                    <svg class="mdc-checkbox__checkmark"
                                        viewBox="0 0 24 24">
                                    <path class="mdc-checkbox__checkmark-path"
                                            fill="none"
                                            d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
                                    </svg>
                                    <div class="mdc-checkbox__mixedmark"></div>
                                </div>
                            </div>
                            <label for="remember"><b> {{ __('Recordarme') }}</b> </label>
                        </div>
                    </div>
                    
                    <div class="pt-3">
                        <button class="foo-button mdc-button mdc-button--raised w-100" type="submit">{{ __('Ingresar') }}</button> 
                    </div>       
                </form>
            </div>
        </div>
        <div class="col-md-6 col-xs-12 no-padding h-100vh" style="background-image: url({{asset('img/local_drea.png')}}); background-size: cover; background-position: center">
            <div style="background: rgba(0, 0, 0,0.75)" class="h-100vh d-flex flex-column justify-center align-center">
                <img src="{{ asset('img/LogoDREA.png') }}" alt="Logo DREA" width="200">
                <h1 class="text-white uppercase">SISTEMA DE CONSTANCIA DE PAGOS</h1>
            </div>
        </div>
    </div>         
@endsection