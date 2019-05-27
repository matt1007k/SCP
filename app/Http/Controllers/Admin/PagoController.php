<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pago;

class PagoController extends Controller
{
    public function index()
    {
        $pagos = Pago::orderBy('created_at', 'desc')->With(['persona'])->get();

        return response()->json(['pagos' => $pagos], 200);
    }

    public function store(Request $request){
        $request->validate([
            'persona' => 'required',
            'mes' => 'required',
            'anio' => 'required',
            'total_haber' => 'required',
            'total_descuento' => 'required',
            'monto_liquido' => 'required',
            'monto_imponible' => 'required',
        ]);
    }

}