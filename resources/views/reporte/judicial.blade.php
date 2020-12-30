<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Boleta Electrónica</title>
    <style>
    *{
        font-family: Arial, Helvetica, sans-serif;
        box-sizing: border-box;
    }
    .w-20{
        width: 20%;
    }
    .w-80{
        width: 80%;
    }
    .w-50{
        width: 50% !important;
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
        padding: 2px;
    }
    .text-center{
        text-align: center;
    }
    .text-right{
        text-align: right;
    }
    .text-left{
        text-align: left;
    }
    .spacer{
        height: 10px;
    }
    .fs-header-sm{        
        font-size: 9px;
    }
    .fs-header-smx{        
        font-size: 10px;
    }
    .fs-header-sm b{
        margin: 0;
    }
    .fs-header-sm p{
        margin: 0; 
        color:rgba(0,0,0,.7);
    }
    .fs-header{        
        font-size: 12px;
    }
    .fs-header b{
        margin: 0;
    }
    .fs-header p{
        margin: 0; 
        color:rgba(0,0,0,.7);
    }
    .text-md{
        font-size: 12px;
    }
    .fs-header2{        
        font-size: 16px;
    }
    .fs-total{
        font-size: 12px;
    }
    .fw-bold{
        font-weight: bold;
    }
    .text-uppercase{
        text-transform: uppercase;
    }    
    .bb-1{
        border-bottom: 1px solid #000;
    }
    .position-absolute{
        position: absolute;
    }
    .position-relative{
        position: relative;
    }
    .header-cert{
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
        margin-bottom: 20px;
        margin-top: 5px;
    }
    footer {
        position: fixed; 
        bottom: 20px; 
        left: 0px; 
        right: 0px;
        height: 50px; 

        /** Extra personal styles **/
        text-align: right;
        line-height: 35px;
    }
    .head-page{
        position: relative;
    }
    .head-page img{
        position: absolute;
        left: 0;
    }
    .head-page .title{
        /* position: absolute; */
        left: 10%;
        top: 0;
        right: 0;
        margin-bottom: 10px;
        /* padding: 14px; */
    }
    .head-page h4 .boleta{
        color: white;
        background: #228CDB;
        padding: 14px;
        font-size: 18px;
    }
    .head-page h4 .periodo{
        margin-left: 15px;
        color: rgba(0,0,0,.4);
        font-size: 25px;
        font-weight: 700;
    }
    .border-tl-sm{
        border-top-left-radius: 8px;
    }
    .border-tr-sm{
        border-top-right-radius: 8px;
    }
    .border-br-sm{
        border-top-right-radius: 8px;
    }
    .border-bl-sm{
        border-top-right-radius: 8px;
        
    }
    .border{
        border-bottom: 1px solid rgba(0,0,0,.25);
        border-top: 1px solid rgba(0,0,0,.25); 
        padding: 10px;
        margin: 0;
    }
    .border-sm{
        border-bottom: 1px solid rgba(0,0,0,.25);
        border-top: 1px solid rgba(0,0,0,.25); 
        padding: 5px;
        margin: 0;
    }
    .p-sm{
        /* border-top: 1px solid rgba(0,0,0,.25);  */
        padding: 3px;
        margin: 0;
    }
    .p-md{
        padding: 5px 10px;
    }
    .pr-1{
        padding-right: 10px;
    }
    .pr-2{
        padding-right: 15px;
    }
    .pl-1{
        padding-left: 10px;
    }
    .pl-2{
        padding-left: 15px;
    }
    p{
        color:rgba(0,0,0,.7);
    }
    .float-f{
        float: left;
    }
    .float-r{
        float: right;
    }
    .bg-1{
        background: #228CDB;
    }
    .bg-2{
        background: #cfe3fa;
    }
    .bg-3{
        background: #f3f4f5;
    }
    .row__parent{
        position: relative;
        width: 100%;
    }
    
    .column__child__left{
        display: block;
        width: 50%;
        margin-right: -50%;
        float: left;
        page-break-inside: avoid;
    }
    .column__child__right{
        display: block;
        margin-left: 50%;
        padding-left: 10px;
        width: 50%;
        
    }
    .mount__item__left{
        display: block;
        margin-left: 48%;
        text-align: right;
        width: 50%;
    }
    .mount__item__left__2{
        display: block;
        margin-left: 44%;
        text-align: right;
        width: 50%;
    }
    </style>
</head>
<body>
    <header>        
        <div class="head-page">
            <img src="{{public_path().'/img/LogoDREA.png'}}" width="70" alt="">
            <div class="title">
                <h4 class="text-center">
                    <span class="boleta" style="padding: 20px">REPORTE DE DESCUENTOS JUDICIALES</span>    
                    <span class="periodo">{{ $nombre_mes.' '.$anio }}</span>
                </h4>
            </div>
        </div>            
            
        <table class="position-relative w-100" style="margin-left: 10%">
            <thead>
                <tr style="margin-bottom: 50px;">
                    <td class="fw-bold text-md">DATOS PERSONALES DEL TITULAR</td>
                    <td></td>
                    <td class="text-right fs-header">
                        <b>ESTADO</b>
                        <span class="text-uppercase" style="margin-left: 10px;">{{ $judicial->persona->estado }}</span>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-left fs-header-sm border-sm">
                        <b>APELLIDOS Y NOMBRES</b>
                        <p>{{ $judicial->persona->full_name }}</p>
                    </td>
                    <td class="text-left fs-header-sm border-sm">
                        <b>DNI</b>
                        <p>{{ $judicial->persona->dni }}</p>
                    </td>
                    <td class="text-left fs-header-sm border-sm">
                        <b>COD. MODULAR</b>
                        <p class="text-uppercase">{{ $judicial->persona->codigo_modular }}-{{ $judicial->persona->numero_cargo }}</p>
                    </td> 
                </tr>
                <tr>
                    <td class="text-left fs-header-sm border-sm">
                        <b>FECHA DE NACIMIENTO</b>
                        <p>{{ $judicial->persona->fecha_nac }}</p>
                    </td>
                    <td class="text-left fs-header-sm border-sm">
                        <b>TIPO DE SERVIDOR</b>
                        <p class="text-uppercase">{{ $judicial->persona->tipo_servidor }}</p>
                    </td> 
                    <td class="text-left fs-header-sm border-sm">
                        <b>TIEMPO DE SERVICIO</b>
                        <p>{{ $judicial->persona->tiempo_servicio }}</p>
                    </td>
                </tr>                
                <tr>
                    <td class="text-left fs-header-sm border-sm">
                        <b>INSTITUCIÓN</b>
                        <p>{{ $judicial->persona->establecimiento }} / {{ $judicial->persona->codigo_establecimiento }}</p>
                    </td>
                    <td class="text-left fs-header-sm border-sm">
                        <b>CARGO</b>
                        <p>{{ $judicial->persona->cargo }}</p>
                    </td>
                    <td class="text-left fs-header-sm border-sm">
                        <b>REGIMEN LABORAL</b>
                        <p class="text-uppercase">{{ $judicial->persona->regimen_laboral }}</p>
                    </td> 
                </tr>                
                <tr>
                    <td class="text-left fs-header-sm border-sm">
                        <b>FECHA DE REGISTRO</b>
                        <p>
                            <span>
                                Inicio: {{ $judicial->persona->fecha_in }}
                            </span>     
                            <span>
                                Termino: {{ $judicial->persona->fecha_fi }}
                            </span>     
                        </p>
                    </td>
                    <td class="text-left fs-header-sm border-sm">
                        <b>CTA TELEAHORRO o NRO CHEQUE</b>
                        <p>CTA - {{ $judicial->persona->numero_cuenta }}</p>
                    </td>
                    <td class="text-left fs-header-sm border-sm">
                        <b>NIV.MAG./GRUPO OCUP./HORAS</b>
                        <p class="text-uppercase">
                            {{ $judicial->persona->nivel_magisterial }}/{{ $judicial->persona->grupo_ocupacion }}/{{ $judicial->persona->horas }}
                        </p>
                    </td> 
                </tr>                
                <tr>
                    <td class="text-left fs-header-sm border-sm">
                        <b>LEYENDA PERMANENTE</b>
                        <p class="text-uppercase">{{ $judicial->persona->leyenda_permanente }}</p>
                    </td> 

                    <td class="text-left fs-header-sm border-sm">
                        <b>REG. PENSIONARIO</b>
                        <p class="text-uppercase">
                            <div>
                                <span>
                                    {{ $judicial->persona->codigo_fiscal }} {{ $judicial->persona->afp_boleta }}/{{ $judicial->persona->codigo_afp }}
                                </span>     
                                <div>
                                    <b>CFija:</b> {{ $judicial->cfija }}
                                </div>     
                            </div>
                        </p>
                    </td> 
                    <td class="text-left fs-header-sm border-sm">
                        <p class="text-uppercase">
                            <div>
                                <span>
                                    <b>FAfilia.:</b> {{ $judicial->persona->f_afil }}
                                </span>     
                                <span>
                                    <b>CVaria.:</b> {{ $judicial->cvariable }}
                                </span>     
                            </div>
                            <div>
                                <span>
                                    <b>FDeven.:</b> {{ $judicial->persona->f_dev }}
                                </span>     
                                <span>
                                    <b>Seguro:</b> {{ $judicial->seguro }}
                                </span>     
                            </div>
                        </p>
                    </td>
                </tr>                
            </tbody>
        </table>
        <table class="position-relative w-100" style="margin-left: 10%">
            <thead>
                <tr style="margin-bottom: 50px;">
                    <td class="fw-bold text-md">DATOS PERSONALES DEL BENEFICIARIO</td>
                    
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-left fs-header-sm border-sm">
                        <b>APELLIDOS Y NOMBRES</b>
                        <p>{{ $judicial->full_name }}</p>
                    </td>

                </tr> 
                <tr>
                    <td class="text-left fs-header-sm border-sm">
                        <b>DNI</b>
                        <p>{{ $judicial->b_dni }}</p>
                    </td>
                    <td class="text-left fs-header-sm border-sm">
                        <b>FECHA DE NACIMIENTO</b>
                        <p class="text-uppercase">{{ $judicial->fecha_nac }}</p>
                    </td> 
                </tr>              
            </tbody>
        </table>
    </header>
    <div class="spacer"></div>
    
    <table class="w-100" style="table-layout: fixed">
        <tr class="bg-3">
            <td class="text-lg fw-bold text-center border">TOTAL JUDICIAL</td>     
            <td class="text-lg fw-bold text-center border">S/. {{ $judicial->total }}</td>     
        </tr>     
    </table>

    <footer>
        <table class="w-100">
            <tbody>
                <tr>                 
                    <td class="text-right">
                        <img class="position-absolute" style=" right: 0; border: 1px solid #000" src="data:image/png;base64, {!! base64_encode(QrCode::format('png')->size(74)->generate('periodo:'.$nombre_mes.' '.$judicial->anio.'|'.$judicial->persona->dni.'|'.date('d/m/Y H:i:s'))) !!} ">
                    </td>
                    <td>
                        <tr>
                            <td class="fs-header">
                                {{-- <span class="position-absolute" style="width: 200px; margin-top: -20px; right: 60">{{date('d/m/Y H:i')}} &nbsp;</span> --}}
                                <h4 style="margin: 0">Mensaje:</h4>
                                Para mayor información puede contactarse con nosotros a través de: www.dreayacucho.gob.pe .
                            </td>
                        </tr>
                        
                    </td>
                </tr>
            </tbody>
        </table>
    </footer>
    <script type="text/php">
        if (isset($pdf)) {
            $x = 540;
            $y = 10;
            $text = "Página {PAGE_NUM}";
            $font = null;
            $size = 10;
            $color = array(0,0,0);
            $word_space = 0.0;  //  default
            $char_space = 0.0;  //  default
            $angle = 0.0;   //  default
            $pdf->page_text($x, $y, $text, $font, $size, $color, $word_space, $char_space, $angle);
        }

        
    </script>
    <script  type="text/javascript">
        app.alert({cMsg:"Message", cTitle: "Title"});

    </script>
</body>
</html>