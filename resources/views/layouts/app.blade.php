<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Sistema de Constancia de Pago | @yield('title')</title>

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    
</head>

<body>
    <div id="app">
    </div>
    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    @if (session('message'))
        <div class="d-flex justify-center align-center w-100 h-100vh">
            <div class="alert alert-info">
                <h1>Mensaje de operación</h1>
                <h2>{{ session('message') }}</h2>
            </div>
        </div>
    @endif
    <script>
        @isset(Auth::user()->roles)
        window.user = @json(
        [
            'user' => Auth::user()->load('notifications'),
            'roles' => Auth::user()->roles,
            'permissions' => Auth::user()->permissions
        ]
        )
        @endisset
    </script>
</body>

</html>