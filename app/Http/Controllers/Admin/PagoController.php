<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HaberDescuento;
use App\Models\Pago;

class PagoController extends Controller
{
    public function index()
    {
        $pagos = Pago::orderBy('created_at', 'desc')->With(['persona'])->get();

        return response()->json(['pagos' => $pagos], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'persona' => 'required',
            'mes' => 'required',
            'anio' => 'required',
            'total_haber' => 'required',
            'total_descuento' => 'required',
            'monto_liquido' => 'required',
            'monto_imponible' => 'required',
            'haberes' => 'required',
            'descuentos' => 'required',
        ]);
    }

    public function edit($id)
    {
        $pago = Pago::findOrfail($id);
        $anio = substr($pago->periodo, 0, 4);
        $mes = substr($pago->periodo, -2);
        $haberes = array();
        $descuentos = array();
        foreach ($pago->detalles as $detalle) {
            $hd = HaberDescuento::findOrfail($detalle->hd_id);
            if ($hd->tipo == 'haber') {
                array_push($haberes, [
                    "id" => $hd->id,
                    "codigo" => $hd->codigo,
                    "tipo" => $hd->tipo,
                    "nombre" => $hd->nombre,
                    "descripcion" => $hd->descripcion,
                    "descripcion_simple" => $hd->descripcion_simple,
                    "user_id" => $hd->user_id,
                    "created_at" => $hd->created_at,
                    "updated_at" => $hd->updated_at,
                    "monto" => $detalle->monto,
                ]);
            } elseif ($hd->tipo == 'descuento') {
                array_push($descuentos, [
                    "id" => $hd->id,
                    "codigo" => $hd->codigo,
                    "tipo" => $hd->tipo,
                    "nombre" => $hd->nombre,
                    "descripcion" => $hd->descripcion,
                    "descripcion_simple" => $hd->descripcion_simple,
                    "user_id" => $hd->user_id,
                    "created_at" => $hd->created_at,
                    "updated_at" => $hd->updated_at,
                    "monto" => $detalle->monto,
                ]);
            }
        }
        $form = [
            'persona' => $pago->persona,
            'haberes' => $haberes,
            'descuentos' => $descuentos,
            'total_haber' => $pago->total_haber,
            'total_descuento' => $pago->total_descuento,
            'monto_liquido' => $pago->monto_liquido,
            'monto_imponible' => $pago->monto_imponible,
            'anio' => $anio,
            'mes' => $mes,
        ];

        return response()->json([
            'form' => $form,
        ], 200);
    }

}
