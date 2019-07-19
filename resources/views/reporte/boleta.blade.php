<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">    
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Boleta de pago por mes</title>
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
        font-size: 13px;
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
        height: 20px;
    }
    .fs-header{        
        font-size: 13px;
    }
    </style>
</head>
<body>
    <div>
            @foreach ($years as $anio)
            <h4 class="text-center" style="text-decoration: underline">{{$anio}}</h4>
            
            @endforeach
    </div>
        
        

    
</body>
</html>