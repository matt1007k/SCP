<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HaberDescuento;
use Auth;
use Illuminate\Http\Request;

class DescuentoController extends Controller
{
    public function search()
    {
        $tipo = request('tipo') ?? request('tipo');
        $descuentos = HaberDescuento::orderBy('nombre', 'DESC')
            ->where('tipo', $tipo)
            ->search(request('q'))
            ->limit(6)
            ->get();

        return response()->json(['descuentos' => $descuentos], 200);
    }

    public function index()
    {
        $descuentos = HaberDescuento::where('tipo', 'descuento')->get();

        return response()->json(['descuentos' => $descuentos], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            // 'codigo' => 'required|min:6|unique:haber_descuentos, codigo',
            'tipo' => 'required|string',
            'descripcion' => 'required',
            'descripcion_simple' => 'required',
        ]);
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

    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required',
            'tipo' => 'required',
            'descripcion' => 'required',
            'descripcion_simple' => 'required',
        ]);
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
