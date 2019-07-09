<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HaberDescuento;
use App\Models\Pago;
use Illuminate\Http\Request;
use PDF;

class ReporteController extends Controller
{
    public function searchByYear(Request $request)
    {
        $request->validate([
            'dni' => 'required',
            'anio' => 'required',
        ]);
        $haberes = array();
        $descuentos = array();
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
            'dni' => 'required',
            'anio' => 'required',
        ]);
        $haberes = array();
        $descuentos = array();
        $pago = Pago::where('anio', $request->anio)
            ->whereHas('persona', function ($query) use ($request) {
                $query->where('dni', 'like', "%{$request->dni}%");
            })->first();

        if ($pago) {
            if ($pago->monto_liquido != '0.00') {
                // Detalles por mes
                $meses = $this->getMesesAndCount($request->anio, $request->dni);
                
                // Detalles por haberes y descuentos
                $haberes = $this->getAllDetailsByType($request->anio, $request->dni, 'haber');
                $descuentos = $this->getAllDetailsByType($request->anio, $request->dni, 'descuento');
    
                // Detalles totales
                $total_haberes = $this->getTotalByYear($request->anio, $request->dni, 'haberes');
                $total_descuentos = $this->getTotalByYear($request->anio, $request->dni, 'descuentos');
                $total_liquidos = $this->getTotalByYear($request->anio, $request->dni, 'liquidos');
                $total_imponibles = $this->getTotalByYear($request->anio, $request->dni, 'imponibles');
    
                // $array_test = array([
                //     "nombre_haber"=> "reunifica",
                //     "monto_enero1"=> "150.00",  
                //     "monto_enero2"=> "128.00", 
                //     "monto_febrero1"=> "20.00", 
                //     "monto_marzo1"=> "0.00"
                // ]);
                // return $haberes;    
            
                $pdf = PDF::loadView('reporte.anio', [
                    'pago' => $pago,
                    'haberes' => (object)$haberes,
                    'descuentos' => (object)$descuentos,
                    'total_haberes' => (object)$total_haberes,
                    'total_descuentos' => (object)$total_descuentos,
                    'liquidos' => (object)$total_liquidos,
                    'imponibles' => (object)$total_imponibles,
                    'meses' => $meses,
                ]);
                $pdf->setPaper('a4', 'landscape');
                return $pdf->stream();
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
        
        $meses_and_count = $this->getMesesAndCount($anio, $dni);
        $new_duplicates = [];
        //Get names
        $only_names = $this->getNames($item_array);
        // Get count by values
        $count_names = array_count_values($only_names);
        $collect = collect($item_array);

        $duplicates = $this->getDuplicatesItem($count_names, $collect); 
        if(count($duplicates) > 0){ 
            $new_duplicates = $this->getDuplicatesByYear($meses_and_count, $duplicates);
        }
        $not_duplicates = $this->getNotDuplicatesItem($count_names, $collect);
        $new_not_duplicates = $this->getNotDuplicatesByYear($meses_and_count, $not_duplicates);
                    
        // return $new_duplicates;
        return array_merge($new_duplicates, $new_not_duplicates);

    }
    public function getDuplicatesByYear($meses_and_count, $duplicates)
    {   
        $duplicates2 = array();
        $nombre = array();
        $monto = array();

        // Generar monto no duplicates add 0.00
        $unique_duplicates_items = $this->unique_multidim_array($duplicates, 'nombre');
        $unique_duplicate_name = $this->getNames($unique_duplicates_items); 
        
        // get order by name
        $duplicates_array = array();
        foreach ($unique_duplicate_name as $key => $name)
        {
            if(isset($name)){ 
                $arrayd = collect($duplicates)->filter(function($item) use ($name){
                    return $item['nombre'] === $name;
                });            
                array_push($duplicates_array, $arrayd);
            } 
        }
        // Get Join Duplicate
        foreach ($meses_and_count as $key => $month) {            
            $count_items_one_month = $month['cantidad'];            
            $nombre_mes = strtolower($month['nombre']);            
            foreach ($duplicates_array as $key => $duplicates)
            {   
                foreach ($duplicates as $key => $item) {                   
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
            
        }
        
        array_push($duplicates2, array_merge($nombre, $monto));

        // add zero
        foreach ($meses_and_count as $key => $month) {            
            $count_items_one_month = $month['cantidad'];            
            $nombre_mes = strtolower($month['nombre']);
            // Get Join Duplicate
            foreach ($duplicates2 as $key2 => $item) {                   
                if($count_items_one_month > 0){
                    for ($j = 1; $j <= $count_items_one_month; $j++) {  
                        if(!isset($item[$nombre_mes]['monto_'.$nombre_mes.$j])){
                            // return $item[$nombre_mes]['monto_'.$nombre_mes.$num];
                            // array_push($monto, $item[$nombre_mes]);
                            $duplicates2[$key2][$nombre_mes]['monto_'.$nombre_mes.$j] = '0.00';           
                        
                        }
                    }
                }                
            }
        }      
        return $duplicates2;
    }

    public function getNotDuplicatesByYear($meses_and_count, $not_duplicates)
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
        $num = 1;
        $nombre_mes = strtolower($this->getNameMonth($mes));
        $meses_and_count = $this->getMesesAndCount($anio, $dni);
        $array_check = array();
        $array_new = array();
        // return $item_array;
        //Get names
        $only_names = $this->getNames($item_array);
        // Get count by values
        $count_names = array_count_values($only_names);
        $collect = collect($item_array);
       
        $duplicates = $this->getDuplicatesItem($count_names, $collect); 
        $not_duplicates = $this->getNotDuplicatesItem($count_names, $collect); 
        
        // Generar monto no duplicates add 0.00
        $unique_duplicates_items = $this->unique_multidim_array($duplicates, 'nombre');
        $unique_duplicate_name = $this->getNames($unique_duplicates_items); 

        foreach ($meses_and_count as $key => $month) {
            if($mes === $month['numero']){
                $count_items_this_month = $month['cantidad']; 

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

        // Join Duplicate
        $nombre = array();
        $monto = array();
        $duplicates_array = array();
        foreach ($unique_duplicate_name as $key => $name)
        {
            if(isset($name)){ 
                $arrayd = collect($duplicates)->filter(function($item) use ($name){
                    return $item['nombre'] === $name;
                });  
                // return $arrayd;            
                
                foreach ($arrayd as $key => $item)
                {
                    $nombre['nombre'] = $item['nombre'];
                    // if(isset($item['monto']['monto_'.$nombre_mes.$num]))
                    if(isset($item[$nombre_mes]['monto_'.$nombre_mes.$num]))
                        $monto[$nombre_mes]['monto_'.$nombre_mes.$num] = $item[$nombre_mes]['monto_'.$nombre_mes.$num];
                    // $result [$i]["enero"]= $item->name;                   
                    $num++;
                }

                array_push($duplicates_array, array_merge($nombre, $monto));

            } 
        }        
        return array_merge($duplicates_array, $not_duplicates);
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

    public function getDuplicatesItem($count_names, $collect)
    {
        $array_duplicates = [];        
        foreach ($count_names as $key => $count){
            // if count > 1 item duplicate
            if($count > 1){
                // Search text
                if($key != ''){
                    $text = $key;
                    $array_duplicates = $collect->filter(function ($item) use ($text) {
                        if(isset($item['nombre']))            
                            return $item['nombre'] === $text;
                    })->values();
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
        
        foreach($array as $value) { 
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
            'dni' => 'required',
            // 'anio' => 'required|exists:periodos, anio',
            'anio' => 'required',
            'mes' => 'required',
        ]);

        $pago = Pago::where('anio', $request->anio)->mes($request->mes)
            ->whereHas('persona', function ($query) use ($request) {
                $query->where('dni', 'like', "%{$request->dni}%");
            })->first();
                
        if ($pago) {
            if ($pago->monto_liquido != '0.00') {

                $total_pagos = Pago::where('anio', $request->anio)->mes($request->mes)
                                    ->whereHas('persona', function ($query) use ($request) {
                                        $query->where('dni', 'like', "%{$request->dni}%");
                                    })->count();

                //detalles de haberes y descuentos 
                $haberes = $this->getOneDetailsByType($request->anio, $request->mes, $request->dni, 'haber');
                $descuentos = $this->getOneDetailsByType($request->anio, $request->mes, $request->dni, 'descuento');
                
                //totales
                $total_haberes = $this->getTotalByMes($request->anio, $request->dni, 'haberes', $request->mes);
                $total_descuentos = $this->getTotalByMes($request->anio, $request->dni, 'descuentos', $request->mes);
                $total_liquidos = $this->getTotalByMes($request->anio, $request->dni, 'liquidos', $request->mes);
                $total_imponibles = $this->getTotalByMes($request->anio, $request->dni, 'imponibles', $request->mes);
                
                $nombre_mes = strtoupper($this->getNameMonth($request->mes));
                // return    $descuentos;                     
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
                ]);
                $pdf->setPaper('a4');
                return $pdf->stream();
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
            'dni' => 'required',
            // 'anio' => 'required|exists:periodos, anio',
            'anio' => 'required',
            'mes' => 'required',
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
