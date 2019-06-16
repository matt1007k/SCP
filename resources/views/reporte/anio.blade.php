<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Reporte por anos</title>
    <style>
    *{
        font-family: Arial, Helvetica, sans-serif;
    }
    .w-20{
        width: 20%;
    }
    .w-80{
        width: 80%;
    }
    .body table{
        border-collapse: collapse;
        /* width: 100%; */
    }
    .body .body-row td{   
        border: 1px solid #c2c2c2;
    }
    .text-center{
        text-align: center;
    }
    .text-right{
        text-align: right;
    }
    .spacer{
        height: 20px;
    }
    </style>
</head>
<body>
    <header>
        <h3 class="text-center">CONSTANCIA DE PAGOS DE HABERES Y DESCUENTOS</h3>
        <table>
            <tbody>
                <tr>
                    <td class="text-right">
                        <b>DNI:</b>
                    </td>
                    <td>{{$pago->persona->dni}}</td>
                    <td class="text-right">
                        <b>CARGO:</b>
                    </td>
                    <td>{{$pago->persona->cargo}}</td>
                </tr>
                <tr>
                    <td class="text-right">
                        <b>APELLIDOS Y NOMBRES:</b>
                    </td>
                    <td>{{$pago->persona->apellido_paterno}} {{$pago->persona->apellido_materno}}, {{$pago->persona->nombre}}</td>
                </tr>
                <tr>
                    <td class="text-right"class="text-right">
                        <b>AÑO:</b>
                    </td>
                    <td>{{$pago->anio}}</td>
                </tr>
            </tbody>
        </table>

    </header>
    <div class="spacer"></div>
    <div class="body">
        <table>
            <tbody>
                <tr class="body-row">
                    <td class="text-center">
                        <b>Haberes</b>
                    </td>
                    @foreach ($meses as $mes)
                        <td class="text-center" colspan="{{$mes['cantidad']}}">
                            <b>{{$mes['nombre']}}</b>
                        </td>
                    @endforeach
                </tr>
                
                @foreach ($enero as $haber)
                
                <tr class="body-row">
                    
                        
                    <td >{{$haber['nombre_descuento'][2]}}</td>
                    <td class="text-right">{{$haber['monto_enero']}}</td>
                    <td class="text-right">{{$haber['monto_febrero']}}</td>
                 
                </tr>
                
                @endforeach
                {{-- @endforeach
                <tr class="body-row">
                    <td><b>Total Haber</b></td>
                    <td class="text-right">{{$detalle['total_haber']}}</td>
                </tr>
                @endforeach  --}}
                {{-- <tr class="body-row">
                    <td class="text-center">
                        <b>Descuentos</b>
                    </td>
                    <td>
                        
                    </td>
                </tr> --}}
                
                {{-- <tr class="body-row">
                    @foreach ($detalle['descuentos'] as $key => $descuento)
                    
                    
                    <td class="text-center">{{$descuento['descripcion_simple']}}</td>
                    
                    <td class="text-right">
                        {{$descuento['monto']}}
                    </td>
                    @endforeach
                </tr> --}}
                
                
                {{-- <tr class="body-row">
                    <td><b>Total Descuento</b></td>
                    <td class="text-right">{{$detalle['total_descuento']}}</td>
                </tr>
                <tr class="body-row">
                    <td><b>Total Liquido</b></td>
                    <td class="text-right">{{$detalle['monto_liquido']}}</td>
                </tr>
                <tr class="body-row">
                    <td><b>Imponible</b></td>
                    <td class="text-right">{{$detalle['monto_imponible']}}</td>
                </tr> --}}
                
            </tbody>
        </table>
        {{-- descuentos --}}
    </div>

</body>
</html>