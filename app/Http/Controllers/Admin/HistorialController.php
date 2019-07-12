<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Historial;
use Illuminate\Http\Request;

class HistorialController extends Controller
{
    public function index()
    {
        $years = Historial::orderBy('anio', 'DESC')->get(['id', 'anio']);

        return response()->json(['years' => $years]);
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
