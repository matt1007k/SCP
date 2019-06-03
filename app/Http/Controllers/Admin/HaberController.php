<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HaberDescuento;
use Auth;
use Illuminate\Http\Request;

class HaberController extends Controller
{
    public function search()
    {
        $es_imponible = request('imponible') ?? request('imponible');
        $haberes = HaberDescuento::orderBy('nombre', 'DESC')
            ->where('es_imponible', $es_imponible)
            ->search(request('q'))
            ->limit(6)
            ->get();

        return response()->json(['haberes' => $haberes], 200);
    }

    public function index(Request $request)
    {
        $es_imponible = request('imponible') ?? request('imponible');
        $haberes = HaberDescuento::where('tipo', 'haber')->get();
        if ($es_imponible !== 'Todos') {
            $haberes = HaberDescuento::where('tipo', 'haber')
                ->where('es_imponible', $es_imponible)->get();

        }

        return response()->json(['haberes' => $haberes], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            // 'codigo' => 'required|min:6|unique:haber_descuentos, codigo',
            'tipo' => 'required|string',
            'descripcion' => 'required',
            'descripcion_simple' => 'required',
            'es_imponible' => 'required',
        ]);
        $codigo = "";
        $totalPorTipo = HaberDescuento::where('tipo', $request->tipo)->get()->count();

        $codigo = "H" . (string) ($totalPorTipo + rand(100, 1000));

        $haber = new HaberDescuento();
        $haber->nombre = $request->nombre;
        $haber->codigo = $codigo;
        $haber->tipo = $request->tipo;
        $haber->descripcion = $request->descripcion;
        $haber->descripcion_simple = $request->descripcion_simple;
        $haber->es_imponible = $request->es_imponible;
        $haber->user_id = Auth::id();

        if ($haber->save()) {
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
            'es_imponible' => 'required',
        ]);
        $haber = HaberDescuento::findOrFail($id);
        $haber->nombre = $request->nombre;
        $haber->codigo = $request->codigo;
        $haber->tipo = $request->tipo;
        $haber->descripcion = $request->descripcion;
        $haber->descripcion_simple = $request->descripcion_simple;
        $haber->es_imponible = $request->es_imponible;
        $haber->user_id = Auth::id();

        if ($haber->save()) {
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
        $haber = HaberDescuento::findOrFail($id);

        if ($haber->es_imponible == 1) {
            $haber->es_imponible = 0;
        } else if ($haber->es_imponible == 0) {
            $haber->es_imponible = 1;
        }

        if ($haber->save()) {
            return response()->json([
                'haber' => $haber,
            ]);
        }
    }

}
