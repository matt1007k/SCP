<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HaberDescuento;
use Auth;
use Illuminate\Http\Request;

class HaberDescuentoController extends Controller
{
    public function index(Request $request)
    {
        $tipo = $request->get('tipo') ?? $request->get('tipo');
        $descuentos = HaberDescuento::all();
        if ($tipo !== 'Todos') {
            $descuentos = HaberDescuento::where('tipo', $tipo)->get();

        }

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

        if ($request->tipo == "haber") {
            $codigo = "H" . (string) ($totalPorTipo + 1);
        } elseif ($request->tipo == "descuento") {
            $codigo = "D" . (string) ($totalPorTipo + 1);

        }

        $haberDescuento = new HaberDescuento();
        $haberDescuento->nombre = $request->nombre;
        $haberDescuento->codigo = $codigo;
        $haberDescuento->tipo = $request->tipo;
        $haberDescuento->descripcion = $request->descripcion;
        $haberDescuento->descripcion_simple = $request->descripcion_simple;
        $haberDescuento->user_id = Auth::id();

        if ($haberDescuento->save()) {
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
        $haberDescuento = HaberDescuento::findOrFail($id);
        $haberDescuento->nombre = $request->nombre;
        $haberDescuento->codigo = $request->codigo;
        $haberDescuento->tipo = $request->tipo;
        $haberDescuento->descripcion = $request->descripcion;
        $haberDescuento->descripcion_simple = $request->descripcion_simple;
        $haberDescuento->user_id = Auth::id();

        if ($haberDescuento->save()) {
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
        $haberDescuento = HaberDescuento::findOrFail($id);

        if ($haberDescuento->estado === 'activo') {
            $persona->estado = 'inactivo';
        } else if ($persona->estado === 'inactivo') {
            $persona->estado = 'activo';
        }

        if ($persona->save()) {
            return response()->json([
                'persona' => $persona,
            ]);
        }
    }

}