<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HaberDescuento;
use App\Models\Pago;
use App\Models\Historial;
use Illuminate\Http\Request;
use PDF;

class ReporteController extends Controller
{
    public function searchByYears(Request $request)
    {
        $request->validate([
            'dni' => 'required|exists:personas,dni',
            'anio_anterior' => 'required|exists:periodos,anio',
            'anio_actual' => 'required|exists:periodos,anio',
            'certificado' => 'required|numeric|unique:historiales,certificado',
        ]);
        
        $pagos = Pago::whereBetween('anio', [$request->anio_anterior, $request->anio_actual])
            ->whereHas('persona', function ($query) use ($request) {
                $query->where('dni', 'like', "%{$request->dni}%");
            })->orderBy('anio', 'DESC')->get();
        $years_exist_unique = $this->getYearsUnique($pagos);         

        if (count($years_exist_unique) > 0) {             
            return response()->json([
                'pagos' => collect($years_exist_unique),
                'status' => true,
            ], 200);
        } else {
            return response()->json([
                'msg' => 'No se han encontrado pagos registros.',
                'pagos' => (object)[],
                'status' => false,
            ], 200);
        }
    }

    public function porAnios(Request $request)
    {
        $request->validate([
            'dni' => 'required|exists:personas,dni',
            'anio_anterior' => 'required|exists:periodos,anio',
            'anio_actual' => 'required|exists:periodos,anio',
            'certificado' => 'required|numeric',
            'ver' => 'required|numeric',
        ]);

        $anio_anterior = $request->anio_anterior;
        $anio_actual = $request->anio_actual;
        $ver = $request->ver;
        $certificado = $request->certificado;

        $pagos = Pago::whereBetween('anio', [$anio_anterior, $anio_actual])
            ->whereHas('persona', function ($query) use ($request) {
                $query->where('dni', 'like', "%{$request->dni}%");
            })->orderBy('anio', 'DESC')->get();
        $years_exist_unique = $this->getYearsUnique($pagos);
        // return $pagos;
        if (count($years_exist_unique) > 0) {
            $pagos_with_detalles = array();
        
            foreach ($years_exist_unique as $key => $year) {                            
                $pago = Pago::With(['persona'])->where('anio', $year)
                                ->whereHas('persona', function ($query) use ($request) {
                                    $query->where('dni', 'like', "%{$request->dni}%");
                                })->first();
                // Detalles por mes
                $meses = $this->getMesesAndCount($year, $request->dni);
                
                // Detalles por haberes y descuentos
                $haberes = $this->getAllDetailsByType($year, $request->dni, 'haber');
                $descuentos = $this->getAllDetailsByType($year, $request->dni, 'descuento');
    
                // Detalles totales
                $total_haberes = $this->getTotalByYear($year, $request->dni, 'haberes');
                $total_descuentos = $this->getTotalByYear($year, $request->dni, 'descuentos');
                $total_liquidos = $this->getTotalByYear($year, $request->dni, 'liquidos');
                $total_imponibles = $this->getTotalByYear($year, $request->dni, 'imponibles');
    
                array_push($pagos_with_detalles, [                    
                    'pago' => $pago,
                    'haberes' => (object)$haberes,
                    'descuentos' => (object)$descuentos,
                    'total_haberes' => (object)$total_haberes,
                    'total_descuentos' => (object)$total_descuentos,
                    'liquidos' => (object)$total_liquidos,
                    'imponibles' => (object)$total_imponibles,
                    'meses' => $meses,
                    'certificado' => $certificado                    
                ]);
            }  
            
            if ($ver == 0) {
                //create historial
                Historial::create([
                    'anio' => $anio_anterior.'-'.$anio_actual,
                    'meses' => '01-12',
                    'dni' => $request->dni,
                    'certificado' => $certificado,
                    'tipo' => 'rango',
                ]);  

                // return $pagos_with_detalles;
                $pdf = PDF::loadView('reporte.anios', ['pagos' => $pagos_with_detalles]);
                $pdf->setPaper('a4', 'landscape');
                
                return $pdf->stream();

            }elseif ($ver == 1) { 
                $historial = Historial::where('certificado', $certificado)->first();
                if($historial){
                    $pdf = PDF::loadView('reporte.anios', ['pagos' => $pagos_with_detalles]);
                    $pdf->setPaper('a4', 'landscape');
                    
                    return $pdf->stream();
                }else{
                    return response()->json([
                        'msg' => 'El número de certificado es inválido o no existe',
                    ], 404);        
                }
            }else{
                return response()->json([
                    'msg' => 'Ver es inválido',
                ], 404);
            }
        } else {
            return response()->json([
                'msg' => 'Pago no ha sido encontrado',
            ], 404);
        }

    }
    

    public function getYearsUnique($pagos)
    {
        $years_exist = array();
        $years_exist_unique = array();

        foreach ($pagos as $key => $value) {
            array_push($years_exist, ['anio' => $value['anio']]);
        }

        $pagos_unique_year = $this->unique_multidim_array($years_exist, 'anio');
        foreach ($pagos_unique_year as $key => $value) {
            array_push($years_exist_unique, ['anio' => $value['anio']]);
        }

        return $years_exist_unique;
    }
    
    public function searchByYear(Request $request)
    {
        $request->validate([
            'dni' => 'required|exists:personas,dni',
            'anio' => 'required|exists:periodos,anio',
            'certificado' => 'required|numeric|unique:historiales,certificado',
        ]);
        
        $pago = Pago::where('anio', $request->anio)
            ->whereHas('persona', function ($query) use ($request) {
                $query->where('dni', 'like', "%{$request->dni}%");
            })->first();
         
        if ($pago) {
            if ($pago->monto_liquido != '0.00') {                
                return response()->json([
                    'pagos' => $pago,
                    'status' => true,
                ], 200);
            }else {
                return response()->json([
                    'msg' => 'El pago no tiene datos.',
                ], 404);
            }
        } else {
            return response()->json([
                'msg' => 'El pago no ha sido encontrado',
                'pagos' => (object)[],
                'status' => false,
            ], 200);
        }
    }


    public function porAnio(Request $request)
    {
        $request->validate([
            'dni' => 'required|exists:personas,dni',
            'anio' => 'required|exists:periodos,anio',
            'certificado' => 'required|numeric',
            'ver' => 'required|numeric',
        ]);

        $mes = $request->mes;
        $anio = $request->anio;
        $ver = $request->ver;
        $certificado = $request->certificado;

        $haberes = array();
        $descuentos = array();

        $pago = Pago::where('anio', $request->anio)
            ->whereHas('persona', function ($query) use ($request) {
                $query->where('dni', 'like', "%{$request->dni}%");
            })->first();

        if ($pago) {
            if ($pago->monto_liquido != '0.00') {
                // Detalles por mes
                $meses = $this->getMesesAndCount($anio, $request->dni);
                
                // Detalles por haberes y descuentos
                $haberes = $this->getAllDetailsByType($anio, $request->dni, 'haber');
                $descuentos = $this->getAllDetailsByType($anio, $request->dni, 'descuento');
    
                // Detalles totales
                $total_haberes = $this->getTotalByYear($anio, $request->dni, 'haberes');
                $total_descuentos = $this->getTotalByYear($anio, $request->dni, 'descuentos');
                $total_liquidos = $this->getTotalByYear($anio, $request->dni, 'liquidos');
                $total_imponibles = $this->getTotalByYear($anio, $request->dni, 'imponibles');
    
                
                // $array_test = array([
                //     "nombre_haber"=> "reunifica",
                //     "monto_enero1"=> "150.00",  
                //     "monto_enero2"=> "128.00", 
                //     "monto_febrero1"=> "20.00", 
                //     "monto_marzo1"=> "0.00"
                // ]);
                // return $haberes; 
                
                if ($ver == 0) {
                    //create historial
                    Historial::create([
                        'anio' => $anio,
                        'meses' => '01-12',
                        'dni' => $request->dni,
                        'certificado' => $certificado,
                        'tipo' => 'anio',
                    ]);  
                
                    $pdf = PDF::loadView('reporte.anio', [
                        'pago' => $pago,
                        'haberes' => (object)$haberes,
                        'descuentos' => (object)$descuentos,
                        'total_haberes' => (object)$total_haberes,
                        'total_descuentos' => (object)$total_descuentos,
                        'liquidos' => (object)$total_liquidos,
                        'imponibles' => (object)$total_imponibles,
                        'meses' => $meses,
                        'certificado' => $certificado
                    ]);
                    $pdf->setPaper('a4', 'landscape');
                    
                    return $pdf->stream();
    
                }elseif ($ver == 1) {     
                    $historial = Historial::where('certificado', $certificado)->first();
                    if($historial){
                        $pdf = PDF::loadView('reporte.anio', [
                            'pago' => $pago,
                            'haberes' => (object)$haberes,
                            'descuentos' => (object)$descuentos,
                            'total_haberes' => (object)$total_haberes,
                            'total_descuentos' => (object)$total_descuentos,
                            'liquidos' => (object)$total_liquidos,
                            'imponibles' => (object)$total_imponibles,
                            'meses' => $meses,
                            'certificado' => $certificado
                        ]);
                        $pdf->setPaper('a4', 'landscape');
                        
                        return $pdf->stream();
                    }else{
                        return response()->json([
                            'msg' => 'El número de certificado es inválido o no existe',
                        ], 404);        
                    }
                    
                }else{
                    return response()->json([
                        'msg' => 'Ver es inválido',
                    ], 404);
                }
                
            }else {
                return response()->json([
                    'msg' => 'Pago no tiene datos.',
                ], 404);
            }
        } else {
            return response()->json([
                'msg' => 'Pago no ha sido encontrado',
            ], 404);
        }

    }



    public function orderMontoByYear($item_array, $anio, $dni)
    {
        // return $item_array;
        $meses_and_count = $this->getMesesAndCount($anio, $dni);
        $new_duplicates = [];
        //Get names
        $only_names = $this->getNames($item_array);
        // Get count by values
        $count_names = array_count_values($only_names);
        $collect = collect($item_array);

        $duplicates = $this->getDuplicatesItemByYear($count_names, $collect, $meses_and_count);
        $new_duplicates = $this->addZeroDuplicatesByYear($meses_and_count, $duplicates);
        
        $not_duplicates = $this->getNotDuplicatesItem($count_names, $collect);
        $new_not_duplicates = $this->addZeroNotDuplicatesByYear($meses_and_count, $not_duplicates);
                    
        return array_merge($new_duplicates, $new_not_duplicates);

    }
    public function addZeroDuplicatesByYear($meses_and_count, $duplicates)
    {   
        // add zero
        foreach ($meses_and_count as $key => $month) {            
            $count_items_one_month = $month['cantidad'];            
            $nombre_mes = strtolower($month['nombre']);
            // Get Join Duplicate
            foreach ($duplicates as $key2 => $item) {                   
                if($count_items_one_month > 0){
                    for ($j = 1; $j <= $count_items_one_month; $j++) {  
                        if(!isset($item[$nombre_mes]['monto_'.$nombre_mes.$j])){
                            // return $item[$nombre_mes]['monto_'.$nombre_mes.$num];
                            // array_push($monto, $item[$nombre_mes]);
                            $duplicates[$key2][$nombre_mes]['monto_'.$nombre_mes.$j] = '0.00';           
                        
                        }
                    }
                }                
            }
        }      
        return $duplicates;
    }

    public function addZeroNotDuplicatesByYear($meses_and_count, $not_duplicates)
    {
        foreach ($meses_and_count as $key => $month) {
            
            $count_items_one_month = $month['cantidad']; 
            
            $nombre_mes = strtolower($month['nombre']);
            // Get not Duplicate 
            foreach ($not_duplicates as $key => $value) {
                if($count_items_one_month > 0){
                    for ($j = 1; $j <= $count_items_one_month; $j++) {                       
                        if(!isset($value[$nombre_mes]['monto_'.$nombre_mes.$j])){
                            // return $value['monto']['monto_'.$nombre_mes.$j]; 
                            $not_duplicates[$key][$nombre_mes]['monto_'.$nombre_mes.$j] = '0.00';
                        }
                    }
                }else{
                    $not_duplicates[$key][$nombre_mes]['monto_'.$nombre_mes.'1'] = '0.00';
                }
                
            }
              
        }
        return $not_duplicates;
    }

    public function orderMontoByMonth($item_array, $anio, $mes, $dni)
    {
        $nombre_mes = strtolower($this->getNameMonth($mes));
        $meses_and_count = $this->getMesesAndCount($anio, $dni);      
        $count_items_this_month = 0;

        foreach ($meses_and_count as $key => $month) {
            if($mes === $month['numero']){
                $count_items_this_month = $month['cantidad']; 
            }
        }

        //Get names
        $only_names = $this->getNames($item_array);
        // Get count by values
        $count_names = array_count_values($only_names);
        $collect = collect($item_array);
       
        $duplicates = $this->getDuplicatesItem($count_names, $collect, $count_items_this_month, $nombre_mes); 
        $not_duplicates = $this->getNotDuplicatesItem($count_names, $collect); 
        
        // return $duplicates;
        // add monto no duplicates field 0.00
        foreach ($meses_and_count as $key => $month) {
            if($mes === $month['numero']){                
                foreach ($not_duplicates as $key => $value) {
                    for ($j = 1; $j <= $count_items_this_month; $j++) {                       
                        if(!isset($value[$nombre_mes]['monto_'.$nombre_mes.$j])){
                            // return $value['monto']['monto_'.$nombre_mes.$j]; 
                            $not_duplicates[$key][$nombre_mes]['monto_'.$nombre_mes.$j] = '0.00';
                        }
                    }                    
                }
            }                
        }                

        // add 0.00 Duplicates
        foreach ($meses_and_count as $key => $month) {
            if($mes === $month['numero']){
                foreach ($duplicates as $key => $value) {
                    for ($j = 1; $j <= $count_items_this_month; $j++) {                       
                        if(!isset($value[$nombre_mes]['monto_'.$nombre_mes.$j])){
                            // return $value['monto']['monto_'.$nombre_mes.$j]; 
                            $duplicates[$key][$nombre_mes]['monto_'.$nombre_mes.$j] = '0.00';
                        }
                    }                    
                }
            }                
        }   
        return array_merge($duplicates, $not_duplicates);
    }

    public function addItemToArray($array, $item_array, $mes)
    {
        $i = 0;
        $nombre_mes = strtolower($this->getNameMonth($mes));
        foreach ($item_array as $key => $item)
        {
            $array[$i][$nombre_mes] = $item;
            // $result [$i]["enero"]= $item->name;
            $i++;
            
        }        
        return $array;
    }

    public function getDuplicatesItem($count_names, $collect, $count_items_one_month, $nombre_mes)
    {
        $array_duplicates = []; 
        $i = 0;
        foreach ($count_names as $key => $count){
            // if count > 1 item duplicate
            if($count > 1){
                // Search text
                if($key !== ''){
                    $text = $key;
                    $duplicate = $collect->filter(function ($item) use ($text) {
                        if(isset($item['nombre']))            
                            return $item['nombre'] === $text;
                    })->values();

                    $monto = array();
                    $nombre = array();
                    foreach ($duplicate as $key => $item)
                    {
                        $nombre['nombre'] = $item['nombre'];
                        if($count_items_one_month > 0){
                            for ($j = 1; $j <= $count_items_one_month; $j++) {  
                                if(isset($item[$nombre_mes]['monto_'.$nombre_mes.$j])){
                                    $monto[$nombre_mes]['monto_'.$nombre_mes.$j] = $item[$nombre_mes]['monto_'.$nombre_mes.$j];           
                                }
                            }
                        }else{
                            $monto[$nombre_mes]['monto_'.$nombre_mes.'1'] = '0.00';
                        }
                    }

                    $array_duplicates[$i] = array_merge($nombre, $monto);
                    $i++;
                }
            }
            
       }
       return $array_duplicates; 
    }

    public function getDuplicatesItemByYear($count_names, $collect, $meses_and_count)
    {
        $array_duplicates = []; 
        $i = 0;
        if(count($collect) > 0){
            foreach ($count_names as $key => $count){
                // if count > 1 item duplicate
                if($count > 1){
                    // Search text
                    if($key !== ''){
                        $text = $key;
                        $duplicate = $collect->filter(function ($item) use ($text) {
                            if(isset($item['nombre']))            
                                return $item['nombre'] === $text;
                        })->values();
                        $monto = array();
                        $nombre = array();
                        foreach ($meses_and_count as $key => $month) {
                            $count_items_one_month = $month['cantidad'];            
                            $nombre_mes = strtolower($month['nombre']);
                            foreach ($duplicate as $key => $item) {
                                $nombre['nombre'] = $item['nombre'];
                                if($count_items_one_month > 0){
                                    for ($j = 1; $j <= $count_items_one_month; $j++) {  
                                        if(isset($item[$nombre_mes]['monto_'.$nombre_mes.$j])){
                                            $monto[$nombre_mes]['monto_'.$nombre_mes.$j] = $item[$nombre_mes]['monto_'.$nombre_mes.$j];           
                                        }
                                    }
                                }else{
                                    $monto[$nombre_mes]['monto_'.$nombre_mes.'1'] = '0.00';
                                }
                            }
                        }                   
                        
                        $array_duplicates[$i] = array_merge($nombre, $monto);
                        // $array_duplicates[$i] = $duplicate;
                        $i++;
                    }
                }
                
           }
        }
        
        return $array_duplicates; 
    }

    public function getNotDuplicatesItem($count_names, $collect)
    {
        $array_not_duplicates = array();
        $i = 0;
        foreach ($count_names as $key => $count){
            // if count <= 1 item no duplicate
            if($count <= 1){
                // Search text is not null
                if($key != ''){
                    $text = $key;
                    $array = $collect->filter(function ($item) use ($text) {
                        if(isset($item['nombre']))            
                            return $item['nombre'] == $text;
                    })->values();
                    $array_not_duplicates[$i] = $array[0];
                    $i++; 
                }
            }
            
       }
       return $array_not_duplicates; 
    }

    public function getNames($array)
    {
        $array_names = array();
        foreach($array as $k => $v)
            if(isset($v["nombre"]))
                $array_names[$k] = $v["nombre"];
    
        return $array_names;
    }


    function unique_multidim_array($array, $key) { 
        $i = 0; 
        $array_unique = array(); 
        $key_array = array();

        foreach($array as $ix => $value) {
            // return $value[0][$key]; 
            if (!in_array($value[$key], $key_array)) { 
                $key_array[$i] = $value[$key]; 
                $array_unique[$i] = $value; 
            } 
            $i++; 
        } 
        return $array_unique; 
    }
    
    public function transposeData($data)
    {
        $retData = array();
        foreach ($data as $row => $columns) {
            foreach ($columns as $row2 => $column2) {
                $retData[$row2][] = $column2;
            }
        }
        return $retData;
    }
    
    public function getDetalleByMes($anio, $mes, $tipo, $dni)
    {
        $haberes = array();
        $descuentos = array();

        $pagos = Pago::where('anio', $anio)->mes($mes)
                    ->whereHas('persona', function ($query) use ($dni) {
                        $query->where('dni', 'like', "%{$dni}%");
                    })->get();
        // return $pagos->detalles->count();
        $nombre_mes = strtolower($this->getNameMonth($mes));
        $monto = [];
        if ($pagos->count() > 0) {
            foreach ($pagos as $key_mes => $pago) {
                $i = 0;
                $i2 = 0;
                // return $pago->detalles->sortByDesc('hd_id');
                foreach ($pago->detalles->sortByDesc('hd_id') as $key => $detalle) {
                   
                    $hd = HaberDescuento::findOrfail($detalle->hd_id);
                   
                    if($hd){
                        if ($hd->tipo == 'haber') {
                            // $haberes[($key_mes + $i)]["nombre"] = $hd->descripcion_simple;
                            // $haberes[($key_mes + $i)][$nombre_mes]["monto_" . $nombre_mes . ($key_mes + 1)] = $detalle->monto;
                            // $i++;
                            array_push($haberes, [
                                "nombre" => $hd->descripcion_simple,
                                $nombre_mes => [
                                    "monto_" . $nombre_mes . ($key_mes + 1) => $detalle->monto
                                ]
                            ]);
                        } elseif ($hd->tipo == 'descuento') {                            
                            // $descuentos[($key_mes + $i2)]["nombre"] = $hd->descripcion_simple;
                            // $descuentos[($key_mes + $i2)]["monto"]["monto_" . $nombre_mes . ($key_mes + 1)] = $detalle->monto;
                            // $i2++;
                            array_push($descuentos, [
                                "nombre" => $hd->descripcion_simple,
                                $nombre_mes => [
                                    "monto_" . $nombre_mes . ($key_mes + 1) => $detalle->monto
                                ]
                            ]);
                        }
                    }
                    
                }
            }
        } else {
            if ($tipo == 'haber') {
                
                $haberes[0]["nombre"] = '';
                $haberes[0]["monto"]["monto_" . $nombre_mes . '1'] = '0.00';
              
            } elseif ($tipo == 'descuento') {
                
                $descuentos[0]["nombre"] = '';
                $descuentos[0]["monto"]["monto_" . $nombre_mes . '1'] = '0.00';
                
            }
        }

        if ($tipo == 'haber') {
            return $haberes;
        } elseif ($tipo == 'descuento') {
            return $descuentos;
        }
    }

    public function getTotalByMes($anio, $dni, $tipo, $mes)
    {
        $total_haberes = array();
        $total_descuentos = array();
        $total_liquidos = array();
        $total_imponibles = array();

        $pagos = Pago::where('anio', $anio)->mes($mes)
                    ->whereHas('persona', function ($query) use ($dni) {
                        $query->where('dni', 'like', "%{$dni}%");
                    })->get();
        // return $pagos;
        $mes_nombre = strtolower($this->getNameMonth($mes));

        if ($pagos->count() > 0) {
            $i = 0;
            foreach ($pagos->sortByDesc('mes') as $key_mes => $pago) {
                $total_haberes[$i]["total_haber_" . $mes_nombre . ($key_mes + 1)] = $pago->total_haber;
                $total_descuentos[$i]["total_descuento_" . $mes_nombre . ($key_mes + 1)] = $pago->total_descuento;
                $total_liquidos[$i]["monto_liquido_" . $mes_nombre . ($key_mes + 1)] = $pago->monto_liquido;
                $total_imponibles[$i]["monto_imponible_" . $mes_nombre . ($key_mes + 1)] = $pago->monto_imponible;
                $i++;
            }

        }else{
            $total_haberes[0]["total_haber_" . $mes_nombre . 1] = '0.00';
            $total_descuentos[0]["total_descuento_" . $mes_nombre . 1] = '0.00';
            $total_liquidos[0]["monto_liquido_" . $mes_nombre . 1] = '0.00';
            $total_imponibles[0]["monto_imponible_" . $mes_nombre . 1] = '0.00';
           
        }
        if($tipo == 'haberes'){
            return $total_haberes;

        }elseif ($tipo == 'descuentos') 
        {
            return $total_descuentos;
        }
        elseif ($tipo == 'liquidos') 
        {
            return $total_liquidos;
        }
        elseif ($tipo == 'imponibles') {
            return $total_imponibles;
        }
    }

    public function getTotalByYear($anio, $dni, $tipo)
    {
        $total_enero = $this->getTotalByMes($anio, $dni, $tipo, '01');
        $total_febrero = $this->getTotalByMes($anio, $dni, $tipo, '02');
        $total_marzo = $this->getTotalByMes($anio, $dni, $tipo, '03');
        $total_abril = $this->getTotalByMes($anio, $dni, $tipo, '04');
        $total_mayo = $this->getTotalByMes($anio, $dni, $tipo, '05');
        $total_junio = $this->getTotalByMes($anio, $dni, $tipo, '06');
        $total_julio = $this->getTotalByMes($anio, $dni, $tipo, '07');
        $total_agosto = $this->getTotalByMes($anio, $dni, $tipo, '08');
        $total_septiembre = $this->getTotalByMes($anio, $dni, $tipo, '09');
        $total_octubre = $this->getTotalByMes($anio, $dni, $tipo, '10');
        $total_noviembre = $this->getTotalByMes($anio, $dni, $tipo, '11');
        $total_diciembre = $this->getTotalByMes($anio, $dni, $tipo, '12');
        
        $total = array_merge(
                    $total_enero, $total_febrero, $total_marzo, $total_abril, 
                    $total_mayo, $total_junio, $total_julio, $total_agosto,
                    $total_septiembre, $total_octubre, $total_noviembre, $total_diciembre);

        return $total;
    }

    public function getAllDetailsByType($anio, $dni, $tipo){
        $enero_monto = $this->getDetalleByMes($anio, '01', $tipo, $dni);        
        $febrero_monto = $this->getDetalleByMes($anio, '02', $tipo, $dni);
        $marzo_monto = $this->getDetalleByMes($anio, '03', $tipo, $dni);
        $abril_monto = $this->getDetalleByMes($anio, '04', $tipo, $dni);
        $mayo_monto = $this->getDetalleByMes($anio, '05', $tipo, $dni);
        $junio_monto = $this->getDetalleByMes($anio, '06', $tipo, $dni);
        $julio_monto = $this->getDetalleByMes($anio, '07', $tipo, $dni);
        $agosto_monto = $this->getDetalleByMes($anio, '08', $tipo, $dni);
        $septiembre_monto = $this->getDetalleByMes($anio, '09', $tipo, $dni);
        $octubre_monto = $this->getDetalleByMes($anio, '10', $tipo, $dni);
        $noviembre_monto = $this->getDetalleByMes($anio, '11', $tipo, $dni);
        $diciembre_monto = $this->getDetalleByMes($anio, '12', $tipo, $dni);
        // Join array monto
        $monto_by_year = array_merge($enero_monto, $febrero_monto, $marzo_monto, $abril_monto, 
                            $mayo_monto, $junio_monto, $julio_monto, $agosto_monto, 
                            $septiembre_monto, $octubre_monto, $noviembre_monto, $diciembre_monto);
        // return $enero;
        $orderMontoByYear = $this->orderMontoByYear($monto_by_year, $anio, $dni);
        return $orderMontoByYear;
    }

    public function getOneDetailsByType($anio, $mes, $dni, $tipo)
    {
        $items_by_month = $this->getDetalleByMes($anio, $mes, $tipo, $dni);        
        $items = $this->orderMontoByMonth($items_by_month, $anio, $mes, $dni);

        return $items;
    }

    public function getMesesAndCount($anio, $dni)
    {
        $enero_count = Pago::where('anio', $anio)->where('mes', '01')
                        ->whereHas('persona', function ($query) use ($dni) {
                            $query->where('dni', 'like', "%{$dni}%");
                        })->count();
        $febrero_count = Pago::where('anio', $anio)->where('mes', '02')
                        ->whereHas('persona', function ($query) use ($dni) {
                            $query->where('dni', 'like', "%{$dni}%");
                        })->count();
        $marzo_count = Pago::where('anio', $anio)->where('mes', '03')
                        ->whereHas('persona', function ($query) use ($dni) {
                            $query->where('dni', 'like', "%{$dni}%");
                        })->count();
        $abril_count = Pago::where('anio', $anio)->where('mes', '04')
                        ->whereHas('persona', function ($query) use ($dni) {
                            $query->where('dni', 'like', "%{$dni}%");
                        })->count();
        $mayo_count = Pago::where('anio', $anio)->where('mes', '05')
                        ->whereHas('persona', function ($query) use ($dni) {
                            $query->where('dni', 'like', "%{$dni}%");
                        })->count();
        $junio_count = Pago::where('anio', $anio)->where('mes', '06')
                        ->whereHas('persona', function ($query) use ($dni) {
                            $query->where('dni', 'like', "%{$dni}%");
                        })->count();
        $julio_count = Pago::where('anio', $anio)->where('mes', '07')
                        ->whereHas('persona', function ($query) use ($dni) {
                            $query->where('dni', 'like', "%{$dni}%");
                        })->count();
        $agosto_count = Pago::where('anio', $anio)->where('mes', '08')
                        ->whereHas('persona', function ($query) use ($dni) {
                            $query->where('dni', 'like', "%{$dni}%");
                        })->count();
        $septiembre_count = Pago::where('anio', $anio)->where('mes', '09')
                        ->whereHas('persona', function ($query) use ($dni) {
                            $query->where('dni', 'like', "%{$dni}%");
                        })->count();
        $octubre_count = Pago::where('anio', $anio)->where('mes', '10')
                        ->whereHas('persona', function ($query) use ($dni) {
                            $query->where('dni', 'like', "%{$dni}%");
                        })->count();
        $noviembre_count = Pago::where('anio', $anio)->where('mes', '11')
                        ->whereHas('persona', function ($query) use ($dni) {
                            $query->where('dni', 'like', "%{$dni}%");
                        })->count();
        $diciembre_count = Pago::where('anio', $anio)->where('mes', '12')
                        ->whereHas('persona', function ($query) use ($dni) {
                            $query->where('dni', 'like', "%{$dni}%");
                        })->count();

        return [
            ['numero' => '01', 'nombre' => 'Enero', 'cantidad' => $enero_count],
            ['numero' => '02', 'nombre' => 'Febrero', 'cantidad' => $febrero_count],
            ['numero' => '03', 'nombre' => 'Marzo', 'cantidad' => $marzo_count],
            ['numero' => '04', 'nombre' => 'Abril', 'cantidad' => $abril_count],
            ['numero' => '05', 'nombre' => 'Mayo', 'cantidad' => $mayo_count],
            ['numero' => '06', 'nombre' => 'Junio', 'cantidad' => $junio_count],
            ['numero' => '07', 'nombre' => 'Julio', 'cantidad' => $julio_count],
            ['numero' => '08', 'nombre' => 'Agosto', 'cantidad' => $agosto_count],
            ['numero' => '09', 'nombre' => 'Septiembre', 'cantidad' => $septiembre_count],
            ['numero' => '10', 'nombre' => 'Octubre', 'cantidad' => $octubre_count],
            ['numero' => '11', 'nombre' => 'Noviembre', 'cantidad' => $noviembre_count],
            ['numero' => '12', 'nombre' => 'Diciembre', 'cantidad' => $diciembre_count],
        ];
    }

    public function getNameMeses()
    {
        return [
            ['numero' => '01', 'nombre' => 'Enero'],
            ['numero' => '02', 'nombre' => 'Febrero'],
            ['numero' => '03', 'nombre' => 'Marzo'],
            ['numero' => '04', 'nombre' => 'Abril'],
            ['numero' => '05', 'nombre' => 'Mayo'],
            ['numero' => '06', 'nombre' => 'Junio'],
            ['numero' => '07', 'nombre' => 'Julio'],
            ['numero' => '08', 'nombre' => 'Agosto'],
            ['numero' => '09', 'nombre' => 'Septiembre'],
            ['numero' => '10', 'nombre' => 'Octubre'],
            ['numero' => '11', 'nombre' => 'Noviembre'],
            ['numero' => '12', 'nombre' => 'Diciembre'],
        ];
    }

    public function getNameMonth($mes)
    {
        $nombre = '';
        foreach ($this->getNameMeses() as $item_mes) {
            if ($mes == $item_mes['numero']) {
                $nombre = $item_mes['nombre'];
            }
        }

        return $nombre;
    }

    public function porMes(Request $request)
    {
        $request->validate([
            'dni' => 'required|exists:personas,dni',
            'anio' => 'required|exists:periodos,anio',
            'mes' => 'required',
            'certificado' => 'required|numeric',
            'ver' => 'required|numeric',
        ]);

        $mes = $request->mes;
        $anio = $request->anio;
        $dni = $request->dni;
        $ver = $request->ver;
        $certificado = $request->certificado;

        $pago = Pago::where('anio', $anio)->mes($mes)
            ->whereHas('persona', function ($query) use ($request) {
                $query->where('dni', 'like', "%{$request->dni}%");
            })->first();
                
        if ($pago) {
            if ($pago->monto_liquido != '0.00') {

                $total_pagos = Pago::where('anio', $anio)->mes($mes)
                                    ->whereHas('persona', function ($query) use ($dni) {
                                        $query->where('dni', 'like', "%{$dni}%");
                                    })->count();

                //detalles de haberes y descuentos 
                $haberes = $this->getOneDetailsByType($anio, $mes, $dni, 'haber');
                $descuentos = $this->getOneDetailsByType($anio, $mes, $dni, 'descuento');
                
                //totales
                $total_haberes = $this->getTotalByMes($anio, $dni, 'haberes', $mes);
                $total_descuentos = $this->getTotalByMes($anio, $dni, 'descuentos', $mes);
                $total_liquidos = $this->getTotalByMes($anio, $dni, 'liquidos', $mes);
                $total_imponibles = $this->getTotalByMes($anio, $dni, 'imponibles', $mes);
                
                $nombre_mes = strtoupper($this->getNameMonth($mes));
                // return $descuentos;
                
                if ($ver == 0) {
                    //create historial
                    Historial::create([
                        'anio' => $anio,
                        'meses' => $mes,
                        'dni' => $request->dni,
                        'certificado' => $certificado,
                        'tipo' => 'mes',
                    ]);  
    
                    // return $pagos_with_detalles;
                    $pdf = PDF::loadView('reporte.mes', [
                        'pago' => $pago,
                        'nombre_mes' => $nombre_mes,
                        'total_pagos' => $total_pagos,
                        'haberes' => $haberes,
                        'descuentos' => $descuentos,
                        'total_haberes' => $total_haberes,
                        'total_descuentos' => $total_descuentos,
                        'liquidos' => $total_liquidos,
                        'imponibles' => $total_imponibles,
                        'certificado' => $certificado
                    ]);
                    $pdf->setPaper('a4');
                    return $pdf->stream();
    
                }elseif ($ver == 1) {   
                    $historial = Historial::where('certificado', $certificado)->first();

                    if($historial)   {
                        $pdf = PDF::loadView('reporte.mes', [
                            'pago' => $pago,
                            'nombre_mes' => $nombre_mes,
                            'total_pagos' => $total_pagos,
                            'haberes' => $haberes,
                            'descuentos' => $descuentos,
                            'total_haberes' => $total_haberes,
                            'total_descuentos' => $total_descuentos,
                            'liquidos' => $total_liquidos,
                            'imponibles' => $total_imponibles,
                            'certificado' => $certificado
                        ]);
                        $pdf->setPaper('a4');
                        return $pdf->stream();
                    } else{
                        return response()->json([
                            'msg' => 'El número de certificado es inválido o no existe.',
                        ], 404);
                    }             
                    
                }else{
                    return response()->json([
                        'msg' => 'Ver es inválido',
                    ], 404);
                }

            }else {
                return response()->json([
                    'msg' => 'Pago no tiene datos.',
                ], 404);
            }
        } else {
            return response()->json([
                'msg' => 'Pago no ha sido encontrado',
            ], 404);
        }
    }

    public function searchByYearAndMonth(Request $request)
    {
        $request->validate([
            'dni' => 'required|exists:personas,dni',
            'anio' => 'required|exists:periodos,anio',
            'mes' => 'required',
            'certificado' => 'required|numeric|unique:historiales,certificado',
        ]);

        $pago = Pago::With(['persona'])->where('anio', $request->anio)->mes($request->mes)
            ->whereHas('persona', function ($query) use ($request) {
                $query->where('dni', 'like', "%{$request->dni}%");
            })->first();
                
        if ($pago) {
            if ($pago->monto_liquido != '0.00') {
                return response()->json([
                    'pagos' => $pago,
                ], 200);
            }else {
                return response()->json([
                    'msg' => 'Pago no tiene datos.',
                ], 404);
            }
        } else {
            return response()->json([
                'msg' => 'Pago no ha sido encontrado',
                'pagos' => (object)[],
            ], 200);
        }
    }



}
