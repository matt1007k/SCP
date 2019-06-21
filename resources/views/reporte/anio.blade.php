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
    .w-100{
        width: 100%;
    }
    .body table{
        border-collapse: collapse;
        /* width: 100%; */
    }
    .body .body-row td{   
        border: 1px solid #c2c2c2;
        font-size: 10px;
    }
    .text-center{
        text-align: center;
    }
    .text-center{
        text-align: center;
    }
    .text-left{
        text-align: left;
    }
    .text-uppercase{
        text-transform: uppercase;
    }
    .text-w-bold{
        font-weight: bold;
    }
    .spacer{
        height: 20px;
    }
    .fs-header{        
        font-size: 10px;
    }
    .no-margin{
        margin: 0;
    }
    </style>
</head>
<body>
    <header>
        <h5 class="text-center" style="margin-top: -20px">CONSTANCIA DE PAGOS DE HABERES Y DESCUENTOS</h5>
        <table>
            <tbody>
                <tr>
                    <td class="text-left fs-header">
                        <b>DNI:</b>
                    </td>
                    <td class="fs-header">{{$pago->persona->dni}}</td>
                    <td class="text-left fs-header">
                        <b>CARGO:</b>
                    </td>
                    <td class="fs-header">{{$pago->persona->cargo}}</td>
                </tr>
                <tr>
                    <td class="text-left fs-header">
                        <b>APELLIDOS Y NOMBRES:</b>
                    </td>
                    <td class="fs-header">{{$pago->persona->apellido_paterno}} {{$pago->persona->apellido_materno}}, {{$pago->persona->nombre}}</td>
                </tr>
                <tr>
                    <td class="text-left fs-header">
                        <b>AÑO:</b>
                    </td>
                    <td class="fs-header">{{$pago->anio}}</td>
                </tr>
            </tbody>
        </table>

    </header>
    <div class="spacer"></div>
    <div class="body">
        <table class="w-100">
            <tbody>
                <tr class="body-row">
                    <td class="text-center">
                        <b>HABERES</b>
                    </td>
                    @foreach ($meses as $mes)
                        @if ($mes['cantidad'] > 0)
                            <td class="text-center text-uppercase" colspan="{{$mes['cantidad']}}">
                                <b>{{ $mes['nombre']}}</b>
                            </td>
                        @else
                            <td class="text-center text-uppercase">
                                <b>{{$mes['nombre']}}</b>
                            </td>
                        @endif
                        
                    @endforeach
                </tr>
                
                <?php foreach ($haberes as $key => $haber) :?>
                <tr class="body-row">
                    @if(isset($haber['nombre_haber']))
                        <td class="text-left"><?php echo $haber['nombre_haber']?></td>
                    @else
                        <td class="text-left"><?php echo ''?></td>
                    @endif
                    {{-- Monto enero --}}
                    @if(isset($haber['enero']['monto_enero1']))
                        <td class="text-center"><?php echo $haber['enero']['monto_enero1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($haber['enero']['monto_enero2']))
                        <td class="text-center"><?php echo $haber['enero']['monto_enero2']?></td>
                    @endif
                    @if(isset($haber['enero']['monto_enero3']))
                        <td class="text-center"><?php echo $haber['enero']['monto_enero3']?></td>
                    @endif

                    {{-- Monto febrero --}}
                    @if(isset($haber['febrero']['monto_febrero1']))
                        <td class="text-center"><?php echo $haber['febrero']['monto_febrero1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($haber['febrero']['monto_febrero2']))
                        <td class="text-center"><?php echo $haber['febrero']['monto_febrero2']?></td>
                    @endif 
                    @if(isset($haber['febrero']['monto_febrero3']))
                        <td class="text-center"><?php echo $haber['febrero']['monto_febrero3']?></td>
                    @endif                   
                  
                    {{-- Monto marzo --}}
                    @if(isset($haber['marzo']['monto_marzo1']))
                        <td class="text-center"><?php echo $haber['marzo']['monto_marzo1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($haber['marzo']['monto_marzo2']))
                        <td class="text-center"><?php echo $haber['marzo']['monto_marzo2']?></td>
                    @endif 
                    @if(isset($haber['marzo']['monto_marzo3']))
                        <td class="text-center"><?php echo $haber['marzo']['monto_marzo3']?></td>
                    @endif 

                    {{-- Monto abril --}}
                    @if(isset($haber['abril']['monto_abril1']))
                        <td class="text-center"><?php echo $haber['abril']['monto_abril1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($haber['abril']['monto_abril2']))
                        <td class="text-center"><?php echo $haber['abril']['monto_abril2']?></td>
                    @endif 
                    @if(isset($haber['abril']['monto_abril3']))
                        <td class="text-center"><?php echo $haber['abril']['monto_abril3']?></td>
                    @endif 

                    {{-- Monto mayo --}}
                    @if(isset($haber['mayo']['monto_mayo1']))
                        <td class="text-center"><?php echo $haber['mayo']['monto_mayo1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($haber['mayo']['monto_mayo2']))
                        <td class="text-center"><?php echo $haber['mayo']['monto_mayo2']?></td>
                    @endif 
                    @if(isset($haber['mayo']['monto_mayo3']))
                        <td class="text-center"><?php echo $haber['mayo']['monto_mayo3']?></td>
                    @endif

                    {{-- Monto junio --}}
                    @if(isset($haber['junio']['monto_junio1']))
                        <td class="text-center"><?php echo $haber['junio']['monto_junio1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($haber['junio']['monto_junio2']))
                        <td class="text-center"><?php echo $haber['junio']['monto_junio2']?></td>
                    @endif
                    @if(isset($haber['junio']['monto_junio3']))
                        <td class="text-center"><?php echo $haber['junio']['monto_junio3']?></td>
                    @endif

                    {{-- Monto julio --}}
                    @if(isset($haber['julio']['monto_julio1']))
                        <td class="text-center"><?php echo $haber['julio']['monto_julio1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($haber['julio']['monto_julio2']))
                        <td class="text-center"><?php echo $haber['julio']['monto_julio2']?></td>
                    @endif
                    @if(isset($haber['julio']['monto_julio3']))
                        <td class="text-center"><?php echo $haber['julio']['monto_julio3']?></td>
                    @endif

                    {{-- Monto agosto --}}
                    @if(isset($haber['agosto']['monto_agosto1']))
                        <td class="text-center"><?php echo $haber['agosto']['monto_agosto1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($haber['agosto']['monto_agosto2']))
                        <td class="text-center"><?php echo $haber['agosto']['monto_agosto2']?></td>
                    @endif
                    @if(isset($haber['agosto']['monto_agosto3']))
                        <td class="text-center"><?php echo $haber['agosto']['monto_agosto3']?></td>
                    @endif

                    {{-- Monto septiembre --}}
                    @if(isset($haber['septiembre']['monto_septiembre1']))
                        <td class="text-center"><?php echo $haber['septiembre']['monto_septiembre1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($haber['septiembre']['monto_septiembre2']))
                        <td class="text-center"><?php echo $haber['septiembre']['monto_septiembre2']?></td>
                    @endif
                    @if(isset($haber['septiembre']['monto_septiembre3']))
                        <td class="text-center"><?php echo $haber['septiembre']['monto_septiembre3']?></td>
                    @endif

                    {{-- Monto octubre --}}
                    @if(isset($haber['octubre']['monto_octubre1']))
                        <td class="text-center"><?php echo $haber['octubre']['monto_octubre1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($haber['octubre']['monto_octubre2']))
                        <td class="text-center"><?php echo $haber['octubre']['monto_octubre2']?></td>
                    @endif
                    @if(isset($haber['octubre']['monto_octubre3']))
                        <td class="text-center"><?php echo $haber['octubre']['monto_octubre3']?></td>
                    @endif

                    {{-- Monto noviembre --}}
                    @if(isset($haber['noviembre']['monto_noviembre1']))
                        <td class="text-center"><?php echo $haber['noviembre']['monto_noviembre1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($haber['noviembre']['monto_noviembre2']))
                        <td class="text-center"><?php echo $haber['noviembre']['monto_noviembre2']?></td>
                    @endif
                    @if(isset($haber['noviembre']['monto_noviembre3']))
                        <td class="text-center"><?php echo $haber['noviembre']['monto_noviembre3']?></td>
                    @endif

                    {{-- Monto diciembre --}}
                    @if(isset($haber['diciembre']['monto_diciembre1']))
                        <td class="text-center"><?php echo $haber['diciembre']['monto_diciembre1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($haber['diciembre']['monto_diciembre2']))
                        <td class="text-center"><?php echo $haber['diciembre']['monto_diciembre2']?></td>
                    @endif
                    @if(isset($haber['diciembre']['monto_diciembre3']))
                    <td class="text-center"><?php echo $haber['diciembre']['monto_diciembre3']?></td>
                    @endif
                </tr>
                <?php endforeach;?>
                <tr class="body-row">
                    <td class="text-center"><b>DESCUENTOS</b></td>
                    @foreach ($meses as $mes)
                        @if ($mes['cantidad'] > 0)
                            <td class="text-center" colspan="{{$mes['cantidad']}}">                                
                            </td>
                        @else
                            <td class="text-center">
                            </td>
                        @endif
                        
                    @endforeach
                </tr>
                <?php foreach ($descuentos as $key => $descuento) :?>
                <tr class="body-row">
                    @if(isset($descuento['nombre_descuento']))
                        <td class="text-left"><?php echo $descuento['nombre_descuento']?></td>
                    @else
                        <td class="text-left"><?php echo ''?></td>
                    @endif
                    {{-- Monto enero --}}
                    @if(isset($descuento['enero']['monto_enero1']))
                        <td class="text-center"><?php echo $descuento['enero']['monto_enero1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($descuento['enero']['monto_enero2']))
                        <td class="text-center"><?php echo $descuento['enero']['monto_enero2']?></td>
                    @endif
                    @if(isset($descuento['enero']['monto_enero3']))
                        <td class="text-center"><?php echo $descuento['enero']['monto_enero3']?></td>
                    @endif

                    {{-- Monto febrero --}}
                    @if(isset($descuento['febrero']['monto_febrero1']))
                        <td class="text-center"><?php echo $descuento['febrero']['monto_febrero1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($descuento['febrero']['monto_febrero2']))
                        <td class="text-center"><?php echo $descuento['febrero']['monto_febrero2']?></td>
                    @endif 
                    @if(isset($descuento['febrero']['monto_febrero3']))
                        <td class="text-center"><?php echo $descuento['febrero']['monto_febrero3']?></td>
                    @endif                   
                  
                    {{-- Monto marzo --}}
                    @if(isset($descuento['marzo']['monto_marzo1']))
                        <td class="text-center"><?php echo $descuento['marzo']['monto_marzo1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($descuento['marzo']['monto_marzo2']))
                        <td class="text-center"><?php echo $descuento['marzo']['monto_marzo2']?></td>
                    @endif 
                    @if(isset($descuento['marzo']['monto_marzo3']))
                        <td class="text-center"><?php echo $descuento['marzo']['monto_marzo3']?></td>
                    @endif 

                    {{-- Monto abril --}}
                    @if(isset($descuento['abril']['monto_abril1']))
                        <td class="text-center"><?php echo $descuento['abril']['monto_abril1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($descuento['abril']['monto_abril2']))
                        <td class="text-center"><?php echo $descuento['abril']['monto_abril2']?></td>
                    @endif 
                    @if(isset($descuento['abril']['monto_abril3']))
                        <td class="text-center"><?php echo $descuento['abril']['monto_abril3']?></td>
                    @endif 

                    {{-- Monto mayo --}}
                    @if(isset($descuento['mayo']['monto_mayo1']))
                        <td class="text-center"><?php echo $descuento['mayo']['monto_mayo1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($descuento['mayo']['monto_mayo2']))
                        <td class="text-center"><?php echo $descuento['mayo']['monto_mayo2']?></td>
                    @endif 
                    @if(isset($descuento['mayo']['monto_mayo3']))
                        <td class="text-center"><?php echo $descuento['mayo']['monto_mayo3']?></td>
                    @endif

                    {{-- Monto junio --}}
                    @if(isset($descuento['junio']['monto_junio1']))
                        <td class="text-center"><?php echo $descuento['junio']['monto_junio1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($descuento['junio']['monto_junio2']))
                        <td class="text-center"><?php echo $descuento['junio']['monto_junio2']?></td>
                    @endif
                    @if(isset($descuento['junio']['monto_junio3']))
                        <td class="text-center"><?php echo $descuento['junio']['monto_junio3']?></td>
                    @endif

                    {{-- Monto julio --}}
                    @if(isset($descuento['julio']['monto_julio1']))
                        <td class="text-center"><?php echo $descuento['julio']['monto_julio1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($descuento['julio']['monto_julio2']))
                        <td class="text-center"><?php echo $descuento['julio']['monto_julio2']?></td>
                    @endif
                    @if(isset($descuento['julio']['monto_julio3']))
                        <td class="text-center"><?php echo $descuento['julio']['monto_julio3']?></td>
                    @endif

                    {{-- Monto agosto --}}
                    @if(isset($descuento['agosto']['monto_agosto1']))
                        <td class="text-center"><?php echo $descuento['agosto']['monto_agosto1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($descuento['agosto']['monto_agosto2']))
                        <td class="text-center"><?php echo $descuento['agosto']['monto_agosto2']?></td>
                    @endif
                    @if(isset($descuento['agosto']['monto_agosto3']))
                        <td class="text-center"><?php echo $descuento['agosto']['monto_agosto3']?></td>
                    @endif

                    {{-- Monto septiembre --}}
                    @if(isset($descuento['septiembre']['monto_septiembre1']))
                        <td class="text-center"><?php echo $descuento['septiembre']['monto_septiembre1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($descuento['septiembre']['monto_septiembre2']))
                        <td class="text-center"><?php echo $descuento['septiembre']['monto_septiembre2']?></td>
                    @endif
                    @if(isset($descuento['septiembre']['monto_septiembre3']))
                        <td class="text-center"><?php echo $descuento['septiembre']['monto_septiembre3']?></td>
                    @endif

                    {{-- Monto octubre --}}
                    @if(isset($descuento['octubre']['monto_octubre1']))
                        <td class="text-center"><?php echo $descuento['octubre']['monto_octubre1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($descuento['octubre']['monto_octubre2']))
                        <td class="text-center"><?php echo $descuento['octubre']['monto_octubre2']?></td>
                    @endif
                    @if(isset($descuento['octubre']['monto_octubre3']))
                        <td class="text-center"><?php echo $descuento['octubre']['monto_octubre3']?></td>
                    @endif

                    {{-- Monto noviembre --}}
                    @if(isset($descuento['noviembre']['monto_noviembre1']))
                        <td class="text-center"><?php echo $descuento['noviembre']['monto_noviembre1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($descuento['noviembre']['monto_noviembre2']))
                        <td class="text-center"><?php echo $descuento['noviembre']['monto_noviembre2']?></td>
                    @endif
                    @if(isset($descuento['noviembre']['monto_noviembre3']))
                        <td class="text-center"><?php echo $descuento['noviembre']['monto_noviembre3']?></td>
                    @endif

                    {{-- Monto diciembre --}}
                    @if(isset($descuento['diciembre']['monto_diciembre1']))
                        <td class="text-center"><?php echo $descuento['diciembre']['monto_diciembre1']?></td>
                    @else
                        <td class="text-center"><?php echo '0.00'?></td>
                    @endif
                    @if(isset($descuento['diciembre']['monto_diciembre2']))
                        <td class="text-center"><?php echo $descuento['diciembre']['monto_diciembre2']?></td>
                    @endif
                    @if(isset($descuento['diciembre']['monto_diciembre3']))
                    <td class="text-center"><?php echo $descuento['diciembre']['monto_diciembre3']?></td>
                    @endif
                </tr>
                <?php endforeach;?>
                
                <tr class="body-row">
                    <td class="text-center" style="height: 20px"></td>
                    @foreach ($meses as $mes)
                        @if ($mes['cantidad'] > 0)
                            <td class="text-center" colspan="{{$mes['cantidad']}}">                                
                            </td>
                        @else
                            <td class="text-center">
                            </td>
                        @endif
                        
                    @endforeach
                </tr>

                {{-- <tr class="body-row">
                    <td><b>Total Haber</b></td>
                    @foreach ($total_haberes as $total)
                    <td class="text-center">{{$total['total_haber_enero1']}}</td>
                    <td class="text-center">{{$total['total_haber_enero2']}}</td>
                    @endforeach
                </tr> --}}
                <tr class="body-row">
                    <td><b>TOTAL HABER</b></td>
                    @foreach ($total_haberes as $key => $total)
                        {{-- Monto enero --}}
                        @if(isset($total['total_haber_enero1']))
                        <td class="text-center text-w-bold">{{$total['total_haber_enero1']}}</td>
                        @endif
                        @if(isset($total['total_haber_enero2']))
                        <td class="text-center text-w-bold">{{$total['total_haber_enero2']}}</td>
                        @endif
                        @if(isset($total['total_haber_enero3']))
                        <td class="text-center text-w-bold">{{$total['total_haber_enero3']}}</td>
                        @endif

                        {{-- Monto febrero --}}
                        @if(isset($total['total_haber_febrero1']))
                        <td class="text-center text-w-bold">{{$total['total_haber_febrero1']}}</td>
                        @endif
                        @if(isset($total['total_haber_febrero2']))
                        <td class="text-center text-w-bold">{{$total['total_haber_febrero2']}}</td>
                        @endif
                        @if(isset($total['total_haber_febrero3']))
                        <td class="text-center text-w-bold">{{$total['total_haber_febrero3']}}</td>
                        @endif

                        {{-- Monto marzo --}}
                        @if(isset($total['total_haber_marzo1']))
                        <td class="text-center text-w-bold">{{$total['total_haber_marzo1']}}</td>
                        @endif
                        @if(isset($total['total_haber_marzo2']))
                        <td class="text-center text-w-bold">{{$total['total_haber_marzo2']}}</td>
                        @endif
                        @if(isset($total['total_haber_marzo3']))
                        <td class="text-center text-w-bold">{{$total['total_haber_marzo3']}}</td>
                        @endif

                        {{-- Monto abril --}}
                        @if(isset($total['total_haber_abril1']))
                        <td class="text-center text-w-bold">{{$total['total_haber_abril1']}}</td>
                        @endif
                        @if(isset($total['total_haber_abril2']))
                        <td class="text-center text-w-bold">{{$total['total_haber_abril2']}}</td>
                        @endif
                        @if(isset($total['total_haber_abril3']))
                        <td class="text-center text-w-bold">{{$total['total_haber_abril3']}}</td>
                        @endif

                        {{-- Monto mayo --}}
                        @if(isset($total['total_haber_mayo1']))
                        <td class="text-center text-w-bold">{{$total['total_haber_mayo1']}}</td>
                        @endif
                        @if(isset($total['total_haber_mayo2']))
                        <td class="text-center text-w-bold">{{$total['total_haber_mayo2']}}</td>
                        @endif
                        @if(isset($total['total_haber_mayo3']))
                        <td class="text-center text-w-bold">{{$total['total_haber_mayo3']}}</td>
                        @endif

                        {{-- Monto junio --}}
                        @if(isset($total['total_haber_junio1']))
                        <td class="text-center text-w-bold">{{$total['total_haber_junio1']}}</td>
                        @endif
                        @if(isset($total['total_haber_junio2']))
                        <td class="text-center text-w-bold">{{$total['total_haber_junio2']}}</td>
                        @endif
                        @if(isset($total['total_haber_junio3']))
                        <td class="text-center text-w-bold">{{$total['total_haber_junio3']}}</td>
                        @endif

                        {{-- Monto julio --}}
                        @if(isset($total['total_haber_julio1']))
                        <td class="text-center text-w-bold">{{$total['total_haber_julio1']}}</td>
                        @endif
                        @if(isset($total['total_haber_julio2']))
                        <td class="text-center text-w-bold">{{$total['total_haber_julio2']}}</td>
                        @endif
                        @if(isset($total['total_haber_julio3']))
                        <td class="text-center text-w-bold">{{$total['total_haber_julio3']}}</td>
                        @endif

                        {{-- Monto agosto --}}
                        @if(isset($total['total_haber_agosto1']))
                        <td class="text-center text-w-bold">{{$total['total_haber_agosto1']}}</td>
                        @endif
                        @if(isset($total['total_haber_agosto2']))
                        <td class="text-center text-w-bold">{{$total['total_haber_agosto2']}}</td>
                        @endif
                        @if(isset($total['total_haber_agosto3']))
                        <td class="text-center text-w-bold">{{$total['total_haber_agosto3']}}</td>
                        @endif

                        {{-- Monto septiembre --}}
                        @if(isset($total['total_haber_septiembre1']))
                        <td class="text-center text-w-bold">{{$total['total_haber_septiembre1']}}</td>
                        @endif
                        @if(isset($total['total_haber_septiembre2']))
                        <td class="text-center text-w-bold">{{$total['total_haber_septiembre2']}}</td>
                        @endif
                        @if(isset($total['total_haber_septiembre3']))
                        <td class="text-center text-w-bold">{{$total['total_haber_septiembre3']}}</td>
                        @endif

                        {{-- Monto octubre --}}
                        @if(isset($total['total_haber_octubre1']))
                        <td class="text-center text-w-bold">{{$total['total_haber_octubre1']}}</td>
                        @endif
                        @if(isset($total['total_haber_octubre2']))
                        <td class="text-center text-w-bold">{{$total['total_haber_octubre2']}}</td>
                        @endif
                        @if(isset($total['total_haber_octubre3']))
                        <td class="text-center text-w-bold">{{$total['total_haber_octubre3']}}</td>
                        @endif

                        {{-- Monto noviembre --}}
                        @if(isset($total['total_haber_noviembre1']))
                        <td class="text-center text-w-bold">{{$total['total_haber_noviembre1']}}</td>
                        @endif
                        @if(isset($total['total_haber_noviembre2']))
                        <td class="text-center text-w-bold">{{$total['total_haber_noviembre2']}}</td>
                        @endif
                        @if(isset($total['total_haber_noviembre3']))
                        <td class="text-center text-w-bold">{{$total['total_haber_noviembre3']}}</td>
                        @endif

                        {{-- Monto diciembre --}}
                        @if(isset($total['total_haber_diciembre1']))
                        <td class="text-center text-w-bold">{{$total['total_haber_diciembre1']}}</td>
                        @endif
                        @if(isset($total['total_haber_diciembre2']))
                        <td class="text-center text-w-bold">{{$total['total_haber_diciembre2']}}</td>
                        @endif
                        @if(isset($total['total_haber_diciembre3']))
                        <td class="text-center text-w-bold">{{$total['total_haber_diciembre3']}}</td>
                        @endif
                        
                    @endforeach
                </tr>
                <tr class="body-row">
                    <td><b>TOTAL DESCUENTO</b></td>
                    @foreach ($total_descuentos as $total)
                        {{-- Monto enero --}}
                        @if(isset($total['total_descuento_enero1']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_enero1']}}</td>
                        @endif
                        @if(isset($total['total_descuento_enero2']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_enero2']}}</td>
                        @endif
                        @if(isset($total['total_descuento_enero3']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_enero3']}}</td>
                        @endif

                        {{-- Monto febrero --}}
                        @if(isset($total['total_descuento_febrero1']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_febrero1']}}</td>
                        @endif
                        @if(isset($total['total_descuento_febrero2']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_febrero2']}}</td>
                        @endif
                        @if(isset($total['total_descuento_febrero3']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_febrero3']}}</td>
                        @endif

                        {{-- Monto marzo --}}
                        @if(isset($total['total_descuento_marzo1']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_marzo1']}}</td>
                        @endif
                        @if(isset($total['total_descuento_marzo2']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_marzo2']}}</td>
                        @endif
                        @if(isset($total['total_descuento_marzo3']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_marzo3']}}</td>
                        @endif

                        {{-- Monto abril --}}
                        @if(isset($total['total_descuento_abril1']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_abril1']}}</td>
                        @endif
                        @if(isset($total['total_descuento_abril2']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_abril2']}}</td>
                        @endif
                        @if(isset($total['total_descuento_abril3']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_abril3']}}</td>
                        @endif

                        {{-- Monto mayo --}}
                        @if(isset($total['total_descuento_mayo1']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_mayo1']}}</td>
                        @endif
                        @if(isset($total['total_descuento_mayo2']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_mayo2']}}</td>
                        @endif
                        @if(isset($total['total_descuento_mayo3']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_mayo3']}}</td>
                        @endif

                        {{-- Monto junio --}}
                        @if(isset($total['total_descuento_junio1']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_junio1']}}</td>
                        @endif
                        @if(isset($total['total_descuento_junio2']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_junio2']}}</td>
                        @endif
                        @if(isset($total['total_descuento_junio3']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_junio3']}}</td>
                        @endif

                        {{-- Monto julio --}}
                        @if(isset($total['total_descuento_julio1']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_julio1']}}</td>
                        @endif
                        @if(isset($total['total_descuento_julio2']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_julio2']}}</td>
                        @endif
                        @if(isset($total['total_descuento_julio3']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_julio3']}}</td>
                        @endif

                        {{-- Monto agosto --}}
                        @if(isset($total['total_descuento_agosto1']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_agosto1']}}</td>
                        @endif
                        @if(isset($total['total_descuento_agosto2']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_agosto2']}}</td>
                        @endif
                        @if(isset($total['total_descuento_agosto3']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_agosto3']}}</td>
                        @endif

                        {{-- Monto septiembre --}}
                        @if(isset($total['total_descuento_septiembre1']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_septiembre1']}}</td>
                        @endif
                        @if(isset($total['total_descuento_septiembre2']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_septiembre2']}}</td>
                        @endif
                        @if(isset($total['total_descuento_septiembre3']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_septiembre3']}}</td>
                        @endif

                        {{-- Monto octubre --}}
                        @if(isset($total['total_descuento_octubre1']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_octubre1']}}</td>
                        @endif
                        @if(isset($total['total_descuento_octubre2']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_octubre2']}}</td>
                        @endif
                        @if(isset($total['total_descuento_octubre3']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_octubre3']}}</td>
                        @endif

                        {{-- Monto noviembre --}}
                        @if(isset($total['total_descuento_noviembre1']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_noviembre1']}}</td>
                        @endif
                        @if(isset($total['total_descuento_noviembre2']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_noviembre2']}}</td>
                        @endif
                        @if(isset($total['total_descuento_noviembre3']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_noviembre3']}}</td>
                        @endif

                        {{-- Monto diciembre --}}
                        @if(isset($total['total_descuento_diciembre1']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_diciembre1']}}</td>
                        @endif
                        @if(isset($total['total_descuento_diciembre2']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_diciembre2']}}</td>
                        @endif
                        @if(isset($total['total_descuento_diciembre3']))
                        <td class="text-center text-w-bold">{{$total['total_descuento_diciembre3']}}</td>
                        @endif
                    @endforeach
                </tr>
                <tr class="body-row">
                    <td><b>TOTAL LIQUIDO</b></td>
                    @foreach ($liquidos as $total)
                        {{-- Monto enero --}}
                        @if(isset($total['monto_liquido_enero1']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_enero1']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_enero2']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_enero2']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_enero3']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_enero3']}}</td>
                        @endif

                        {{-- Monto febrero --}}
                        @if(isset($total['monto_liquido_febrero1']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_febrero1']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_febrero2']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_febrero2']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_febrero3']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_febrero3']}}</td>
                        @endif

                        {{-- Monto marzo --}}
                        @if(isset($total['monto_liquido_marzo1']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_marzo1']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_marzo2']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_marzo2']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_marzo3']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_marzo3']}}</td>
                        @endif

                        {{-- Monto abril --}}
                        @if(isset($total['monto_liquido_abril1']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_abril1']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_abril2']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_abril2']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_abril3']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_abril3']}}</td>
                        @endif

                        {{-- Monto mayo --}}
                        @if(isset($total['monto_liquido_mayo1']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_mayo1']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_mayo2']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_mayo2']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_mayo3']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_mayo3']}}</td>
                        @endif

                        {{-- Monto junio --}}
                        @if(isset($total['monto_liquido_junio1']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_junio1']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_junio2']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_junio2']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_junio3']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_junio3']}}</td>
                        @endif

                        {{-- Monto julio --}}
                        @if(isset($total['monto_liquido_julio1']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_julio1']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_julio2']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_julio2']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_julio3']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_julio3']}}</td>
                        @endif

                        {{-- Monto agosto --}}
                        @if(isset($total['monto_liquido_agosto1']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_agosto1']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_agosto2']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_agosto2']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_agosto3']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_agosto3']}}</td>
                        @endif

                        {{-- Monto septiembre --}}
                        @if(isset($total['monto_liquido_septiembre1']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_septiembre1']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_septiembre2']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_septiembre2']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_septiembre3']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_septiembre3']}}</td>
                        @endif

                        {{-- Monto octubre --}}
                        @if(isset($total['monto_liquido_octubre1']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_octubre1']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_octubre2']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_octubre2']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_octubre3']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_octubre3']}}</td>
                        @endif

                        {{-- Monto noviembre --}}
                        @if(isset($total['monto_liquido_noviembre1']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_noviembre1']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_noviembre2']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_noviembre2']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_noviembre3']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_noviembre3']}}</td>
                        @endif

                        {{-- Monto diciembre --}}
                        @if(isset($total['monto_liquido_diciembre1']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_diciembre1']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_diciembre2']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_diciembre2']}}</td>
                        @endif
                        @if(isset($total['monto_liquido_diciembre3']))
                        <td class="text-center text-w-bold">{{$total['monto_liquido_diciembre3']}}</td>
                        @endif
                    @endforeach
                </tr>
                <tr class="body-row">
                    <td><b>Rem. ASEGURABLE</b></td>
                    @foreach ($imponibles as $total)
                        {{-- Monto enero --}}
                        @if(isset($total['monto_imponible_enero1']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_enero1']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_enero2']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_enero2']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_enero3']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_enero3']}}</td>
                        @endif

                        {{-- Monto febrero --}}
                        @if(isset($total['monto_imponible_febrero1']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_febrero1']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_febrero2']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_febrero2']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_febrero3']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_febrero3']}}</td>
                        @endif

                        {{-- Monto marzo --}}
                        @if(isset($total['monto_imponible_marzo1']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_marzo1']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_marzo2']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_marzo2']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_marzo3']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_marzo3']}}</td>
                        @endif

                        {{-- Monto abril --}}
                        @if(isset($total['monto_imponible_abril1']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_abril1']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_abril2']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_abril2']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_abril3']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_abril3']}}</td>
                        @endif

                        {{-- Monto mayo --}}
                        @if(isset($total['monto_imponible_mayo1']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_mayo1']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_mayo2']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_mayo2']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_mayo3']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_mayo3']}}</td>
                        @endif

                        {{-- Monto junio --}}
                        @if(isset($total['monto_imponible_junio1']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_junio1']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_junio2']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_junio2']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_junio3']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_junio3']}}</td>
                        @endif

                        {{-- Monto julio --}}
                        @if(isset($total['monto_imponible_julio1']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_julio1']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_julio2']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_julio2']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_julio3']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_julio3']}}</td>
                        @endif

                        {{-- Monto agosto --}}
                        @if(isset($total['monto_imponible_agosto1']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_agosto1']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_agosto2']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_agosto2']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_agosto3']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_agosto3']}}</td>
                        @endif

                        {{-- Monto septiembre --}}
                        @if(isset($total['monto_imponible_septiembre1']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_septiembre1']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_septiembre2']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_septiembre2']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_septiembre3']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_septiembre3']}}</td>
                        @endif

                        {{-- Monto octubre --}}
                        @if(isset($total['monto_imponible_octubre1']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_octubre1']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_octubre2']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_octubre2']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_octubre3']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_octubre3']}}</td>
                        @endif

                        {{-- Monto noviembre --}}
                        @if(isset($total['monto_imponible_noviembre1']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_noviembre1']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_noviembre2']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_noviembre2']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_noviembre3']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_noviembre3']}}</td>
                        @endif

                        {{-- Monto diciembre --}}
                        @if(isset($total['monto_imponible_diciembre1']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_diciembre1']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_diciembre2']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_diciembre2']}}</td>
                        @endif
                        @if(isset($total['monto_imponible_diciembre3']))
                        <td class="text-center text-w-bold">{{$total['monto_imponible_diciembre3']}}</td>
                        @endif
                    @endforeach
                </tr>
               
                
            </tbody>
        </table>
    </div>

</body>
</html>