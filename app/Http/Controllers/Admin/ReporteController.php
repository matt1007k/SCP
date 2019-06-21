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
                ], 200);
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
                $meses = $this->getMeses($request->anio, $request->dni);
                
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
    
                // $array_test2 = array([
                //     ["res_enero1"=> "1261.00"],
                //     ["res_enero2"=> "128.00"],             
                // ]);
    
            
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



    public function addItemToArray($array, $item_array, $mes)
    {
        $i = 0;
        $mes_nombre = strtolower($this->getNameMonth($mes));

        foreach ($item_array as $key => $item)
        {
            $array[$i][$mes_nombre] = $item;
            // $result [$i]["enero"]= $item->name;
            $i++;
        }
        return $array;
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
    public function getNameDetails($anio, $dni, $tipo)
    {
        $pago = Pago::where('anio', $anio)
                ->whereHas('persona', function ($query) use ($dni) {
                    $query->where('dni', 'like', "%{$dni}%");
                })->first();

        $nombre_detalles = array();
        foreach ($pago->detalles->sortByDesc('hd_id') as $key => $detalle) {
            $hd = HaberDescuento::findOrfail($detalle->hd_id);
            // return $hd->descripcion_simple;
            if ($hd->tipo == $tipo) {
                array_push($nombre_detalles, [
                    'nombre_' . $tipo => $hd->descripcion_simple,
                ]);
            }

        }

        return $nombre_detalles;
    }

    public function getDetalleByMes($anio, $mes, $tipo, $dni)
    {
        $haberes = array();
        $haber_item = array();
        $descuentos = array();
        $descuento_item = array();

        $pagos = Pago::where('anio', $anio)->mes($mes)
                    ->whereHas('persona', function ($query) use ($dni) {
                        $query->where('dni', 'like', "%{$dni}%");
                    })->get();
        // return $pagos;
        $mes_nombre = strtolower($this->getNameMonth($mes));

        if ($pagos->count() > 0) {
            foreach ($pagos as $key_mes => $pago) {
                $i = 0;
                $i2 = 0;
                foreach ($pago->detalles->sortByDesc('hd_id') as $detalle) {
                    $hd = HaberDescuento::findOrfail($detalle->hd_id);
                   
                    if ($hd->tipo == 'haber') {
                        $haberes[$i]["monto_" . $mes_nombre . ($key_mes + 1)] = $detalle->monto;
                        $i++;
                    } elseif ($hd->tipo == 'descuento') {
                        $descuentos[$i2]["monto_" . $mes_nombre . ($key_mes + 1)] = $detalle->monto;
                        $i2++;
                    }
                }
            }
            // Add detalles
            // array_push($haberes, $haber_item);
            // array_push($descuentos, $descuento_item);

        } else {
            if ($tipo == 'haber') {
                array_push($haber_item, [
                    "monto_" . $mes_nombre . '1' => '0.00',
                ]);
            } elseif ($tipo == 'descuento') {
                array_push($descuento_item, [
                    "monto_" . $mes_nombre . '1' => '0.00',
                ]);
            }
            // Add detalles
            array_push($haberes, $haber_item);
            array_push($descuento_item, $descuento_item);
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
        $nombres = $this->getNameDetails($anio, $dni, $tipo);
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

        $enero = $this->addItemToArray($nombres, $enero_monto, '01');
        $febrero = $this->addItemToArray($enero, $febrero_monto, '02');
        $marzo = $this->addItemToArray($febrero, $marzo_monto, '03');
        $abril = $this->addItemToArray($marzo, $abril_monto, '04');
        $mayo = $this->addItemToArray($abril, $mayo_monto, '05');
        $junio = $this->addItemToArray($mayo, $junio_monto, '06');
        $julio = $this->addItemToArray($junio, $julio_monto, '07');
        $agosto = $this->addItemToArray($julio, $agosto_monto, '08');
        $septiembre = $this->addItemToArray($agosto, $septiembre_monto, '09');
        $octubre = $this->addItemToArray($septiembre, $octubre_monto, '10');
        $noviembre = $this->addItemToArray($octubre, $noviembre_monto, '11');
        $diciembre = $this->addItemToArray($noviembre, $diciembre_monto, '12');


        return $diciembre;
    }

    public function getOneDetailsByType($anio, $mes, $dni, $tipo)
    {
        $nombres = $this->getNameDetails($anio, $dni, $tipo);
        $items_by_month = $this->getDetalleByMes($anio, $mes, $tipo, $dni);
        $items = $this->addItemToArray($nombres, $items_by_month, $mes);

        return $items;
    }

    public function getMeses($anio, $dni)
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
                    'pagos' => ['pago' => $pago],
                ], 200);
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
}
