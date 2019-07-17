<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Historial;
use Illuminate\Http\Request;

class HistorialController extends Controller
{
    public function index()
    {
        $historiales = Historial::orderBy('created_at', 'DESC')->get();

        return response()->json(['historiales' => $historiales]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'anio' => 'required|numeric|unique:periodos, anio',
        ]);

        Historial::create($request->all());

        return response()->json(['created' => true]);
    }
}
