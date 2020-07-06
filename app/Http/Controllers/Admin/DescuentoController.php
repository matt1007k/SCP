<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DescuentoCreatedRequest;
use App\Models\HaberDescuento;
use Auth;
use Illuminate\Http\Request;

class DescuentoController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:pagos.consultar')->only(['search']);
        $this->middleware('can:descuentos.index')->only(['index']);
        $this->middleware('can:descuentos.create')->only(['store']);
        $this->middleware('can:descuentos.edit')->only(['update']);
        $this->middleware('can:descuentos.destroy')->only(['destroy']);
    }

    public function search()
    {
        $tipo = request('tipo') ?? request('tipo');
        $descuentos = HaberDescuento::orderBy('nombre', 'DESC')
            ->where('tipo', $tipo)
            ->search(request('q'))
            ->get();

        return response()->json(['descuentos' => $descuentos], 200);
    }

    public function index()
    {
        $descuentos = HaberDescuento::where('tipo', 'descuento')->get();

        return response()->json(['descuentos' => $descuentos], 200);
    }

    public function store(DescuentoCreatedRequest $request)
    {
        $codigo = "";
        $totalPorTipo = HaberDescuento::where('tipo', $request->tipo)->get()->count();

        $codigo = "D" . (string) ($totalPorTipo + rand(2000, 9000));

        $descuento = new HaberDescuento();
        $descuento->nombre = $request->nombre;
        $descuento->codigo = $codigo;
        $descuento->tipo = $request->tipo;
        $descuento->descripcion = $request->descripcion;
        $descuento->descripcion_simple = $request->descripcion_simple;
        $descuento->user_id = Auth::id();

        if ($descuento->save()) {
            return response()->json([
                'created' => true,
            ]);
        } else {
            return response()->json([
                'created' => false,
            ]);
        }
    }

    public function update(DescuentoCreatedRequest $request, $id)
    {
        $descuento = HaberDescuento::findOrFail($id);
        $descuento->nombre = $request->nombre;
        $descuento->codigo = $request->codigo;
        $descuento->tipo = $request->tipo;
        $descuento->descripcion = $request->descripcion;
        $descuento->descripcion_simple = $request->descripcion_simple;
        $descuento->user_id = Auth::id();

        if ($descuento->save()) {
            return response()->json([
                'updated' => true,
            ]);
        } else {
            return response()->json([
                'updated' => false,
            ]);
        }
    }

    public function destroy($id)
    {
        $descuento = HaberDescuento::findOrFail($id);

        if ($descuento->delete()) {
            return response()->json([
                'descuento' => $descuento,
            ]);
        }
    }

}
