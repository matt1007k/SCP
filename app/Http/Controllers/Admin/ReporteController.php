<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HaberDescuento;
use App\Models\Pago;
use Illuminate\Http\Request;
use PDF;

class ReporteController extends Controller
{

    public function porAnio(Request $request)
    {
        $request->validate([
            'persona_id' => 'required',
            'anio' => 'required',
        ]);
        $haberes = array();
        $descuentos = array();
        $pago = Pago::where('anio', $request->anio)
            ->where('persona_id', $request->persona_id)->first();

        // Detalles por mes
        $meses = $this->getMeses($request->anio, $request->persona_id);
        
        $haberes = $this->getAllDetailsByType($request->anio, $request->persona_id, 'haber');
        $descuentos = $this->getAllDetailsByType($request->anio, $request->persona_id, 'descuento');

        $total_haberes = $this->getTotalByYear($request->anio, $request->persona_id, 'haberes');
        $total_descuentos = $this->getTotalByYear($request->anio, $request->persona_id, 'descuentos');
        $total_liquidos = $this->getTotalByYear($request->anio, $request->persona_id, 'liquidos');
        $total_imponibles = $this->getTotalByYear($request->anio, $request->persona_id, 'imponibles');

        
        
        // $array_test = array([
        //     "nombre_haber"=> "reunifica",
        //     "monto_enero1"=> "150.00",  
        //     "monto_enero2"=> "128.00", 
        //     "monto_febrero1"=> "20.00", 
        //     "monto_marzo1"=> "0.00"
        // ]);

        // $array_test2 = array([
        //     ["total_haber_enero1"=> "1261.00"],
        //     ["total_haber_enero2"=> "128.00"],             
        // ]);
        
        
       

       
        // $total_haber = array_merge($array_test[0], $array_test33[0], $array_test22[0]);
        
        
        

        // return $total_haber;

        
        if ($pago) {
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
        } else {
            return response()->json([
                'msg' => 'Pago no ha sido encontrado',
            ], 404);
        }

    }



    public function addItemToArray($array, $item_array, $mes)
    {
        $i = 0;
        $mes_nombre = '';
        foreach ($this->getNameMeses() as $item_mes) {
            if ($mes == $item_mes['numero']) {
                $mes_nombre = strtolower($item_mes['nombre']);
            }
        }
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
    public function getNameDetails($anio, $persona_id, $tipo)
    {
        $pago = Pago::where('persona_id', $persona_id)
            ->where('anio', $anio)->first();

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

    public function getDetalleByMes($anio, $mes, $tipo, $persona_id)
    {
        $mes_nombre = '';
        $haberes = array();
        $haber_item = array();
        $descuentos = array();
        $descuento_item = array();

        $pagos = Pago::where('persona_id', $persona_id)
            ->where('anio', $anio)->mes($mes)->get();
        // return $pagos;
        foreach ($this->getNameMeses() as $item_mes) {
            if ($mes == $item_mes['numero']) {
                $mes_nombre = strtolower($item_mes['nombre']);
            }
        }

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

    public function getTotalByMes($anio, $persona_id, $tipo, $mes)
    {
        $mes_nombre = '';
        $total_haberes = array();
        $total_descuentos = array();
        $total_liquidos = array();
        $total_imponibles = array();

        $pagos = Pago::where('persona_id', $persona_id)
            ->where('anio', $anio)->mes($mes)->get();
        // return $pagos;
        foreach ($this->getNameMeses() as $item_mes) {
                    
            if ($mes == $item_mes['numero']) {
                $mes_nombre = strtolower($item_mes['nombre']);
                
            }
        }

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

    public function getTotalByYear($anio, $persona_id, $tipo)
    {
        $total_enero = $this->getTotalByMes($anio, $persona_id, $tipo, '01');
        $total_febrero = $this->getTotalByMes($anio, $persona_id, $tipo, '02');
        $total_marzo = $this->getTotalByMes($anio, $persona_id, $tipo, '03');
        $total_abril = $this->getTotalByMes($anio, $persona_id, $tipo, '04');
        $total_mayo = $this->getTotalByMes($anio, $persona_id, $tipo, '05');
        $total_junio = $this->getTotalByMes($anio, $persona_id, $tipo, '06');
        $total_julio = $this->getTotalByMes($anio, $persona_id, $tipo, '07');
        $total_agosto = $this->getTotalByMes($anio, $persona_id, $tipo, '08');
        $total_septiembre = $this->getTotalByMes($anio, $persona_id, $tipo, '09');
        $total_octubre = $this->getTotalByMes($anio, $persona_id, $tipo, '10');
        $total_noviembre = $this->getTotalByMes($anio, $persona_id, $tipo, '11');
        $total_diciembre = $this->getTotalByMes($anio, $persona_id, $tipo, '12');
        
        $total = array_merge(
                    $total_enero, $total_febrero, $total_marzo, $total_abril, 
                    $total_mayo, $total_junio, $total_julio, $total_agosto,
                    $total_septiembre, $total_octubre, $total_noviembre, $total_diciembre);

        return $total;
    }

    public function getAllDetailsByType($anio, $persona_id, $tipo){
        $nombres = $this->getNameDetails($anio, $persona_id, $tipo);
        $enero_monto = $this->getDetalleByMes($anio, '01', $tipo, $persona_id);
        $febrero_monto = $this->getDetalleByMes($anio, '02', $tipo, $persona_id);
        $marzo_monto = $this->getDetalleByMes($anio, '03', $tipo, $persona_id);
        $abril_monto = $this->getDetalleByMes($anio, '04', $tipo, $persona_id);
        $mayo_monto = $this->getDetalleByMes($anio, '05', $tipo, $persona_id);
        $junio_monto = $this->getDetalleByMes($anio, '06', $tipo, $persona_id);
        $julio_monto = $this->getDetalleByMes($anio, '07', $tipo, $persona_id);
        $agosto_monto = $this->getDetalleByMes($anio, '08', $tipo, $persona_id);
        $septiembre_monto = $this->getDetalleByMes($anio, '09', $tipo, $persona_id);
        $octubre_monto = $this->getDetalleByMes($anio, '10', $tipo, $persona_id);
        $noviembre_monto = $this->getDetalleByMes($anio, '11', $tipo, $persona_id);
        $diciembre_monto = $this->getDetalleByMes($anio, '12', $tipo, $persona_id);

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

    public function getMeses($anio, $persona_id)
    {
        $enero_count = Pago::where('persona_id', $persona_id)->where('anio', $anio)->where('mes', '01')->count();
        $febrero_count = Pago::where('persona_id', $persona_id)->where('anio', $anio)->where('mes', '02')->count();
        $marzo_count = Pago::where('persona_id', $persona_id)->where('anio', $anio)->where('mes', '03')->count();
        $abril_count = Pago::where('persona_id', $persona_id)->where('anio', $anio)->where('mes', '04')->count();
        $mayo_count = Pago::where('persona_id', $persona_id)->where('anio', $anio)->where('mes', '05')->count();
        $junio_count = Pago::where('persona_id', $persona_id)->where('anio', $anio)->where('mes', '06')->count();
        $julio_count = Pago::where('persona_id', $persona_id)->where('anio', $anio)->where('mes', '07')->count();
        $agosto_count = Pago::where('persona_id', $persona_id)->where('anio', $anio)->where('mes', '08')->count();
        $septiembre_count = Pago::where('persona_id', $persona_id)->where('anio', $anio)->where('mes', '09')->count();
        $octubre_count = Pago::where('persona_id', $persona_id)->where('anio', $anio)->where('mes', '10')->count();
        $noviembre_count = Pago::where('persona_id', $persona_id)->where('anio', $anio)->where('mes', '11')->count();
        $diciembre_count = Pago::where('persona_id', $persona_id)->where('anio', $anio)->where('mes', '12')->count();

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

    public function porMes(Request $request)
    {
        $request->validate([
            'persona_id' => 'required',
            'anio' => 'required|exists:periodos, anio',
            'mes' => 'required',
        ]);

        $pago = Pago::where('anio', $request->anio)
            ->mes($request->mes)
            ->where('persona_id', $request->persona_id)
            ->first();
        if ($pago) {
            $pdf = PDF::loadView('reporte.mes', [
                'pago' => $pago,
            ]);
            $pdf->setPaper('a4');
            return $pdf->stream();
        } else {
            return response()->json([
                'msg' => 'Pago no ha sido encontrado',
            ], 404);
        }
    }
}
