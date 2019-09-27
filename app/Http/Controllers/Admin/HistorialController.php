<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Historial;

class HistorialController extends Controller
{
    public function index()
    {
        if (auth()->user()->hasRole('Admin')) {
            $historiales = Historial::orderBy('created_at', 'ASC')->get();

        } else {
            $historiales = Historial::where('estado', 'creado')->orderBy('created_at', 'ASC')->get();
        }

        return response()->json(['historiales' => $historiales]);
    }

    public function destroy($id)
    {
        $historial = Historial::findOrFail($id);
        $historial->estado = 'eliminado';
        if ($historial->save()) {
            return response()->json(['deleted' => true], 200);
        }
    }
}
