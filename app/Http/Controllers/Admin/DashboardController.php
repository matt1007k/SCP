<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HaberDescuento;
use App\Models\Historial;
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

        $total_pagos = array();
        $total_activo = 0;
        $total_cesante = 0;
        $total_sobreviviente = 0;
        // return $total_by_year;
        $activo = strtoupper('activo');
        $cesante = strtoupper('cesante');
        $sobreviviente = strtoupper('sobreviviente');
        $color_activo = "#4CAF50";
        $color_cesante = "#FF5252";
        $color_sobreviviente = "#2196F3";

        if (auth()->user()->hasRole('Admin')) {
            $total_activo = $this->getTotalLiquidoByYear($request, 'activo');
            $total_cesante = $this->getTotalLiquidoByYear($request, 'cesante');
            $total_sobreviviente = $this->getTotalLiquidoByYear($request, 'sobreviviente');
        }

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
        // $total_sobreviviente = Sobreviviente::where('estado', 'sobreviviente')->count();

        $total_personas = array();

        array_push($total_personas, (object) [
            "backgroundColor" => ["#4CAF50", "#FF5252", "#2196F3"],
            "data" => [$total_activo, $total_censante, $total_sobreviviente],
        ]);
        return response()->json([
            'total_personas' => $total_personas,
        ], 200);
    }

    public function getTotalLiquidoByYear($request, $estado)
    {
        $totales = array();

        for ($i = 1; $i < 13; $i++) {
            $numero = $this->addZeroToNumberMenorToTen($i);
            $total = Pago::where('persona_id', '!=', '')->mes($numero)->where('anio', $request->anio)->whereHas('persona', function ($query) use ($estado) {
                $query->where('estado', 'like', "%{$estado}%");
            })->count() > 0
            ? Pago::where('persona_id', '!=', '')->mes($numero)->where('anio', $request->anio)->whereHas('persona', function ($query) use ($estado) {
                $query->where('estado', 'like', "%{$estado}%");
            })->sum('monto_liquido')
            : 0;
            array_push($totales, $total);
        }
        return $totales;
    }

    public function addZeroToNumberMenorToTen(int $num)
    {
        $numero = 0;
        if ($num < 10) {
            $numero = '0' . $num;
        } else {
            $numero = $num;
        }
        return $numero;
    }

    public function getTotalConstancias()
    {
        set_time_limit(0);
        $total_rango = Historial::where('tipo', 'rango')->count();
        $total_anio = Historial::where('tipo', 'anio')->count();
        $total_mes = Historial::where('tipo', 'mes')->count();

        $total_constancias = array();

        array_push($total_constancias, (object) [
            "backgroundColor" => ["#2196F3", "#FF5252", "#3F51B5"],
            "data" => [$total_rango, $total_anio, $total_mes],
        ]);
        return response()->json([
            'total_constancias' => $total_constancias,
        ], 200);
    }

    public function getTotalConstanciasByUsers()
    {
        $users = User::all()->filter(function ($user) {
            return $user->roles->contains('name', 'Tesoreria');
        });

        $total_constancias_by_users = array();

        foreach ($users as $user) {
            array_push($total_constancias_by_users, [
                'nombre' => $user->name,
                'dni' => $user->dni,
                'total_anios' => Historial::where('dni_user', $user->dni)->where('tipo', 'rango')->count(),
                'total_anio' => Historial::where('dni_user', $user->dni)->where('tipo', 'anio')->count(),
                'total_mes' => Historial::where('dni_user', $user->dni)->where('tipo', 'mes')->count(),
            ]);
        }

        return response()->json([
            'totales' => $total_constancias_by_users,
        ], 200);
    }

    public function getMyTotalConstancias()
    {
        $total = Historial::where('dni_user', auth()->user()->dni)->count();
        return response()->json([
            'total' => $total,
        ], 200);
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
