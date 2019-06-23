<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HaberDescuento;
use App\Models\Pago;
use App\Models\Persona;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function __construct()
    {
        $this->middleware('permission:admin.index')->only(['index']);
    }

    public function index()
    {
        return view('layouts.app');
    }

    public function getCount()
    {
        $total_pagos = Pago::count();
        $total_personas = Persona::count();
        $total_haberes = HaberDescuento::where('tipo', 'haber')->count();
        $total_descuentos = HaberDescuento::where('tipo', 'descuento')->count();

        $totales = array(
            [
                'label' => "Total de pagos",
                'color' => "error",
                'icon' => "mdi mdi-credit-card",
                'total' => $total_pagos,
            ],
            [
                'label' => "Total de personas",
                'color' => "indigo",
                'icon' => "mdi mdi-account-group",
                'total' => $total_personas,
            ],
            [
                'label' => "Total de haberes",
                'color' => "info",
                'icon' => "mdi mdi-cash-usd",
                'total' => $total_haberes,
            ],
            [
                'label' => "Total de descuentos",
                'color' => "success",
                'icon' => "mdi mdi-sale",
                'total' => $total_descuentos,
            ],
        );

        return response()->json([
            'totales' => $totales,
        ], 200);
    }

    public function getTotalPagos(Request $request)
    {
        $pagos = Pago::where('anio', $request->anio)
            ->whereHas('persona', function ($query) use ($request) {
                $query->where('estado', 'like', "%{$request->estado}%");
            })->get();

        $total_pagos = array();

        $total_by_year = $this->getTotalLiquidoByYear($pagos);

        // return $total_by_year;
        $color = '';
        if ($request->estado == 'activo') {
            $color = "#4CAF50";
        } elseif ($request->estado == 'activo') {
            $color = "#FF5252";
        } elseif ($request->estado == 'activo') {
            $color = "#2196F3";
        }

        array_push($total_pagos, (object) [
            "label" => "Total de pagos por cada mes en $request->anio, por estado el $request->estado",
            "backgroundColor" => $color,
            //Data to be represented on y-axis
            "data" => $total_by_year,
        ]);
        return response()->json([
            'total_pagos' => $total_pagos,
        ], 200);
    }

    public function getTotalPersonas()
    {
        $total_activo = Persona::where('estado', 'activo')->count();
        $total_censante = Persona::where('estado', 'censante')->count();
        $total_sobreviviente = Persona::where('estado', 'sobreviviente')->count();

        $total_personas = array();

        array_push($total_personas, (object) [
            "backgroundColor" => ["#4CAF50", "#FF5252", "#2196F3"],
            "data" => [$total_activo, $total_censante, $total_sobreviviente],
        ]);
        return response()->json([
            'total_personas' => $total_personas,
        ], 200);
    }

    public function getTotalLiquidoByYear($pagos)
    {
        foreach ($pagos as $pago) {
            return [
                $pago->mes('01')->sum('monto_liquido'),
                $pago->mes('02')->sum('monto_liquido'),
                $pago->mes('03')->sum('monto_liquido'),
                $pago->mes('04')->sum('monto_liquido'),
                $pago->mes('05')->sum('monto_liquido'),
                $pago->mes('06')->sum('monto_liquido'),
                $pago->mes('07')->sum('monto_liquido'),
                $pago->mes('08')->sum('monto_liquido'),
                $pago->mes('09')->sum('monto_liquido'),
                $pago->mes('10')->sum('monto_liquido'),
                $pago->mes('11')->sum('monto_liquido'),
                $pago->mes('12')->sum('monto_liquido'),
            ];
        }
    }
}
