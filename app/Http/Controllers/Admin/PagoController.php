<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pago;

class PagoController extends Controller
{
    public function index()
    {
        $pagos = Pago::orderBy('created_at', 'desc')->With(['detalles', 'persona'])->get();

        return response()->json(['pagos' => $pagos], 200);
    }

}