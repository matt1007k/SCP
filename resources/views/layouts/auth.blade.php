<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Sistema de Constancia de Pago | @yield('title')</title>

    <!-- Scripts -->
    {{-- <script src="{{ asset('js/material.min.js') }}" defer></script> --}}

    <!-- Fonts -->
    
    <link href="{{asset('css/material-components-web.min.css')}}" rel="stylesheet">
    <link href="{{asset('css/flexboxgrid.min.css')}}" rel="stylesheet">
             
    <!-- Styles -->
    {{-- <link href="{{ asset('css/material.blue-red.min.css') }}" rel="stylesheet"> --}}
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body class="no-margin">
    <div id="app">
        @yield('content')
    </div>
    <script src="{{ asset('js/material-components-web.min.js') }}"></script>
    <script>
        mdc.ripple.MDCRipple.attachTo(document.querySelector('.foo-button'));
        // mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-f'));
        // mdc.select.MDCSelect.attachTo(document.querySelector('.mdc-select'));
        // <div class="mdc-select demo-width-class" data-mdc-auto-init="MDCSelect">
        
        mdc.autoInit();
    </script>
</body>

</html>