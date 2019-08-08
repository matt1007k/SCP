<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Detalle;
use App\Models\HaberDescuento;
use App\Models\Pago;
use Auth;
use Illuminate\Http\Request;

class PagoController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:pagos.index')->only(['index']);
        $this->middleware('permission:pagos.create')->only(['store']);
        $this->middleware('permission:pagos.edit')->only(['update', 'edit']);
        $this->middleware('permission:pagos.destroy')->only(['destroy']);
    }
    public function index()
    {
        $anio = request('anio');
        $mes = request('mes');        
        if ($anio && $mes) {
            $pagos = Pago::where('anio', $anio)->where('mes', $mes)
                ->orderBy('created_at', 'desc')
                ->With(['persona'])->get();
        } else {
            $pagos = Pago::orderBy('created_at', 'desc')
                ->With(['persona'])->get();
        }
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

        $detalles = array_merge($request->haberes, $request->descuentos);

        $pago = new Pago();
        $pago->persona_id = $request->persona['id'];
        $pago->anio = $request->anio;
        $pago->mes = $request->mes;
        $pago->total_haber = $request->total_haber;
        $pago->total_descuento = $request->total_descuento;
        $pago->monto_liquido = $request->monto_liquido;
        $pago->monto_imponible = $request->monto_imponible;
        $pago->user_id = Auth::user()->id;

        if ($pago->save()) {

            foreach ($detalles as $detalle) {
                $detalle_db = new Detalle();
                $detalle_db->pago_id = $pago->id;
                $detalle_db->hd_id = $detalle['id'];
                $detalle_db->monto = $detalle['monto'];
                $detalle_db->save();
            }

            return response()->json([
                'created' => true,
            ], 201);
        } else {
            return response()->json([
                'created' => false,
            ], 404);
        }

    }

    public function edit($id)
    {
        $pago = Pago::findOrfail($id);
        // $anio = substr($pago->periodo, 0, 4);
        // $mes = substr($pago->periodo, -2);
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
                    "es_imponible" => $hd->es_imponible,
                    "created_at" => $hd->created_at,
                    "updated_at" => $hd->updated_at,
                    "hd_id" => $hd->id,
                    "monto" => $detalle->monto,
                    "detalle_id" => $detalle->id,
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
                    "es_imponible" => $hd->es_imponible,
                    "created_at" => $hd->created_at,
                    "updated_at" => $hd->updated_at,
                    "hd_id" => $hd->id,
                    "monto" => $detalle->monto,
                    "detalle_id" => $detalle->id,
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
            'anio' => $pago->anio,
            'mes' => $pago->mes,
        ];

        return response()->json([
            'form' => $form,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'persona_id' => 'required|exists:personas,id',
            'mes' => 'required',
            'anio' => 'required',
            'total_haber' => 'required',
            'total_descuento' => 'required',
            'monto_liquido' => 'required',
            'monto_imponible' => 'required',
            'haberes' => 'required',
            'descuentos' => 'required',
        ]);

        $detalles = array_merge($request->haberes, $request->descuentos);

        $pago = Pago::findOrfail($id);

        $pago->persona_id = $request->persona_id;
        $pago->anio = $request->anio;
        $pago->mes = $request->mes;
        $pago->total_haber = $request->total_haber;
        $pago->total_descuento = $request->total_descuento;
        $pago->monto_liquido = $request->monto_liquido;
        $pago->monto_imponible = $request->monto_imponible;
        $pago->user_id = Auth::user()->id;

        if ($pago->save()) {
            $updatedIds = [];
            $newItems = [];
            // 1. filter and update
            foreach ($detalles as $detalle) {
                $detalle_db = Detalle::where('hd_id', $detalle['hd_id'])
                    ->where('pago_id', $pago->id)->first();
                if ($detalle_db) {
                    $detalle_db->pago_id = $pago->id;
                    $detalle_db->hd_id = $detalle['hd_id'];
                    $detalle_db->monto = $detalle['monto'];
                    $detalle_db->save();
                    $updatedIds[] = $detalle_db->id;
                } else {
                    $newItems[] = $detalle;
                }

            }

            // 2. delete non-updated items
            $detalle_delete = Detalle::whereNotIn('id', $updatedIds)
                ->where('pago_id', $pago->id)
                ->delete();

            // 3. save new items
            if (count($newItems)) {
                foreach ($newItems as $key => $detalle_new) {
                    $detalle = new Detalle();
                    $detalle->pago_id = $pago->id;
                    $detalle->hd_id = $detalle_new['hd_id'];
                    $detalle->monto = $detalle_new['monto'];
                    $detalle->save();
                }
            }

            return response()->json([
                'updated' => true,
            ], 201);
        }
    }

    public function destroy($id)
    {
        $pago = Pago::findOrfail($id);

        if ($pago->delete()) {
            return response()->json([
                'deleted' => true,
            ], 200);
        } else {
            return response()->json([
                'deleted' => false,
            ], 404);
        }
    }
}
