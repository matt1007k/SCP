<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Periodo;
use Illuminate\Http\Request;

class PeriodoController extends Controller
{
    public function __construct()
    {

    }

    public function index()
    {
        $years = Periodo::orderBy('anio', 'DESC')->get(['id', 'anio']);

        return response()->json(['years' => $years]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'anio' => 'required|numeric|min:4|unique:periodos,anio',
        ]);

        Periodo::create($request->all());

        return response()->json(['created' => true]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'anio' => 'required|numeric|min:4|unique:periodos,anio,' . $id,
        ]);

        Periodo::findOrfail($id)->update($request->all());

        return response()->json(['updated' => true]);
    }

    public function destroy($id)
    {
        Periodo::findOrfail($id)->delete();

        return response()->json(['deleted' => true]);
    }
}
