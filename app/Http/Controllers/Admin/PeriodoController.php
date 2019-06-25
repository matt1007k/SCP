<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Periodo;
use Illuminate\Http\Request;

class PeriodoController extends Controller
{
    public function index()
    {
        $years = Periodo::orderBy('anio', 'DESC')->get(['id', 'anio']);

        return response()->json(['years' => $years]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'anio' => 'required|numeric|unique:periodos, anio',
        ]);

        Periodo::create($request->all());

        return response()->json(['created' => true]);
    }
}
