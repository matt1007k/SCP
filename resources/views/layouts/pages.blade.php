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
        @yield('content')
    </div>
    
    
    <script>
        @isset(Auth::user()->roles)
        window.user = @json(
        [
            'user' => Auth::user(),
            'roles' => Auth::user()->roles,
            'permissions' => Auth::user()->permissions
        ]
        )
        @endisset
    </script>

    <script src="{{ asset('client/js/client.js') }}"></script>
</body>

</html>