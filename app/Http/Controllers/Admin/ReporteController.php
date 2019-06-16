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

        $enero_haberes = $this->getDetalleByMes($request->anio, '01', 'haber', $request->persona_id);
        $febrero_haberes = $this->getDetalleByMes($request->anio, '02', 'haber', $request->persona_id);
        $pago = Pago::where('anio', $request->anio)
            ->where('persona_id', $request->persona_id)->first();
        $nombres_descuento = $this->getNameDetails($request->anio, $request->persona_id, 'descuento');
        $nombres_haber = $this->getNameDetails($request->anio, $request->persona_id, 'haber');

        $detalles_haberes = array();
        $detalles_descuentos = array();

        // $arry = $this->addItemToArray($nombres_descuento, ["nombre_descuento"=> "maroon"]);
        $new_array = $this->addItemToArray($detalles_descuentos, $nombres_descuento);
        // return $enero_haberes;
        return $this->transposeData($enero_haberes);

        if ($pago) {
            $pdf = PDF::loadView('reporte.anio', [
                'pago' => $pago,
                'detalles_haberes' => $this->transposeData($detalles_haberes),
                'meses' => $this->getMeses(),
            ]);
            $pdf->setPaper('a4', 'landscape');
            return $pdf->stream();
        } else {
            return response()->json([
                'msg' => 'Pago no ha sido encontrado',
            ], 404);
        }

    }

    public function addItemToArray($array, $item_array)
    {
        array_splice($array, count($array), 0, $item_array);

        return $array;
    }

    public function transposeData($data)
    {
        $retData = array();
        foreach ($data as $row => $columns) {
            foreach ($columns as $row2 => $column2) {
                $retData[$row2][$row] = $column2;
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
                array_push($nombre_detalles, ['nombre_' . $tipo => $hd->descripcion_simple]);
            }

        }

        return $nombre_detalles;
    }

    public function getDetalleByMes($anio, $mes, $tipo, $persona_id)
    {
        $mes_nombre = '';
        $haberes = array();
        $descuentos = array();
        
        $pagos = Pago::where('persona_id', $persona_id)
            ->where('anio', $anio)->mes($mes)->get();
        // return $pagos;
        foreach ($pagos as $key_mes => $pago) {

            foreach ($this->getMeses() as $item_mes) {
                if ($pago->mes == $item_mes['numero']) {
                    $mes_nombre = strtolower($item_mes['nombre']);
                }
            }
            foreach ($pago->detalles->sortByDesc('hd_id') as $detalle) {
                $hd = HaberDescuento::findOrfail($detalle->hd_id);
                
                if ($hd->tipo == 'descuento') {

                    array_push($haberes, [
                        "monto_" . $mes_nombre.($key_mes + 1) => $detalle->monto,
                    ]);
                } elseif ($hd->tipo == 'descuento') {
                    array_push($descuentos, [
                        "monto_" . $mes_nombre.($key_mes + 1) => $detalle->monto,

                        // 'total_haber' => $pago->total_haber,
                        // 'total_descuento' => $pago->total_descuento,
                        // 'monto_liquido' => $pago->monto_liquido,
                        // 'monto_imponible' => $pago->monto_imponible,
                    ]);
                }

            }

        }

        if ($tipo == 'haber') {
            return $haberes;
        } elseif ($tipo == 'descuento') {
            return $descuentos;
        }
    }

    public function getMeses()
    {
        return [
            ['numero' => '01', 'nombre' => 'Enero', 'cantidad' => 2],
            ['numero' => '02', 'nombre' => 'Febrero', 'cantidad' => 1],
            ['numero' => '03', 'nombre' => 'Marzo', 'cantidad' => 1],
            ['numero' => '04', 'nombre' => 'Abril', 'cantidad' => 1],
            ['numero' => '05', 'nombre' => 'Mayo', 'cantidad' => 1],
            ['numero' => '06', 'nombre' => 'Junio', 'cantidad' => 1],
            ['numero' => '07', 'nombre' => 'Julio', 'cantidad' => 1],
            ['numero' => '08', 'nombre' => 'Agosto', 'cantidad' => 1],
            ['numero' => '09', 'nombre' => 'Septiembre', 'cantidad' => 1],
            ['numero' => '10', 'nombre' => 'Octubre', 'cantidad' => 1],
            ['numero' => '11', 'nombre' => 'Noviembre', 'cantidad' => 1],
            ['numero' => '12', 'nombre' => 'Diciembre', 'cantidad' => 1],
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
