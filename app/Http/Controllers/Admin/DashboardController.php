<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HaberDescuento;
use App\Models\Pago;
use App\Models\Persona;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function __construct()
    {
        // $this->middleware('permission:admin.index')->only(['index']);
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
        set_time_limit(0);
        $pagos = Pago::where('anio', $request->anio)->get();

        $total_pagos = array();

        // return $total_by_year;
        $activo = strtoupper('activo');
        $cesante = strtoupper('cesante');
        $sobreviviente = strtoupper('sobreviviente');
        $color_activo = "#4CAF50";
        $color_cesante = "#FF5252";
        $color_sobreviviente = "#2196F3";

        $total_activo = $this->getTotalLiquidoByYear($pagos, $activo, $request->anio);
        $total_cesante = $this->getTotalLiquidoByYear($pagos, $cesante, $request->anio);
        $total_sobreviviente = $this->getTotalLiquidoByYear($pagos, $sobreviviente, $request->anio);

        // foreach ($pagos as $key => $value) {
        array_push($total_pagos, (object) [
            "label" => "$request->anio, $activo",
            "backgroundColor" => $color_activo,
            //Data to be represented on y-axis
            "data" => $total_activo,
        ]);
        array_push($total_pagos, (object) [
            "label" => "$request->anio, $cesante",
            "backgroundColor" => $color_cesante,
            //Data to be represented on y-axis
            "data" => $total_cesante,
        ]);
        array_push($total_pagos, (object) [
            "label" => "$request->anio, $sobreviviente",
            "backgroundColor" => $color_sobreviviente,
            //Data to be represented on y-axis
            "data" => $total_sobreviviente,
        ]);
        // }

        return response()->json([
            'total_pagos' => $total_pagos,
        ], 200);
    }

    public function getTotalPersonas()
    {
        set_time_limit(0);
        $total_activo = Persona::where('estado', 'activo')->count();
        $total_censante = Persona::where('estado', 'cesante')->count();
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

    public function getTotalLiquidoByYear($pagos, $estado, $anio)
    {
        foreach ($pagos as $pago) {
            return [
                $pago->mes('01')->where('anio', $anio)->whereHas('persona', function ($query) use ($estado) {
                    $query->where('estado', 'like', "%{$estado}%");
                })->sum('monto_liquido'),
                $pago->mes('02')->where('anio', $anio)->whereHas('persona', function ($query) use ($estado) {
                    $query->where('estado', 'like', "%{$estado}%");
                })->sum('monto_liquido'),
                $pago->mes('03')->where('anio', $anio)->whereHas('persona', function ($query) use ($estado) {
                    $query->where('estado', 'like', "%{$estado}%");
                })->sum('monto_liquido'),
                $pago->mes('04')->where('anio', $anio)->whereHas('persona', function ($query) use ($estado) {
                    $query->where('estado', 'like', "%{$estado}%");
                })->sum('monto_liquido'),
                $pago->mes('05')->where('anio', $anio)->whereHas('persona', function ($query) use ($estado) {
                    $query->where('estado', 'like', "%{$estado}%");
                })->sum('monto_liquido'),
                $pago->mes('06')->where('anio', $anio)->whereHas('persona', function ($query) use ($estado) {
                    $query->where('estado', 'like', "%{$estado}%");
                })->sum('monto_liquido'),
                $pago->mes('07')->where('anio', $anio)->whereHas('persona', function ($query) use ($estado) {
                    $query->where('estado', 'like', "%{$estado}%");
                })->sum('monto_liquido'),
                $pago->mes('08')->where('anio', $anio)->whereHas('persona', function ($query) use ($estado) {
                    $query->where('estado', 'like', "%{$estado}%");
                })->sum('monto_liquido'),
                $pago->mes('09')->where('anio', $anio)->whereHas('persona', function ($query) use ($estado) {
                    $query->where('estado', 'like', "%{$estado}%");
                })->sum('monto_liquido'),
                $pago->mes('10')->where('anio', $anio)->whereHas('persona', function ($query) use ($estado) {
                    $query->where('estado', 'like', "%{$estado}%");
                })->sum('monto_liquido'),
                $pago->mes('11')->where('anio', $anio)->whereHas('persona', function ($query) use ($estado) {
                    $query->where('estado', 'like', "%{$estado}%");
                })->sum('monto_liquido'),
                $pago->mes('12')->where('anio', $anio)->whereHas('persona', function ($query) use ($estado) {
                    $query->where('estado', 'like', "%{$estado}%");
                })->sum('monto_liquido'),
            ];
        }
    }

    public function getUnReadNotifications()
    {
        return response()->json([
            auth()->user()->unreadNotifications,
        ], 200);
    }

    public function markAllNotifications()
    {
        $user = User::find(auth()->user()->id);
        $user->unreadNotifications->markAsRead();

        if (request()->ajax()) {
            return auth()->user()->unreadNotifications;
        }
    }
}
