<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Judicial;
use App\Models\Pago;
use App\Models\Persona;
use App\Services\EncryptService;
use App\Services\JsonParseService;
use App\Services\MesesService;
use App\Services\ReportService;
use App\Services\YearsService;
use Illuminate\Http\Request;
use PDF;

class ReporteController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:pagos.consultar')
            ->only([
                'searchByYears',
                'porAnios',
                'searchByYear',
                'porAnio',
                'searchByYearAndMonth',
                'porMes',
            ]);
    }

    public function searchByYears(Request $request)
    {
        $request->validate([
            'persona_id' => 'required|exists:personas,id',
            'anio_anterior' => 'required|exists:periodos,anio',
            'anio_actual' => 'required|exists:periodos,anio',
        ]);

        $pagos = Pago::whereBetween('anio', [$request->anio_anterior, $request->anio_actual])
            ->whereHas('persona', function ($query) use ($request) {
                $query->where('id', $request->persona_id);
            })->orderBy('anio', 'DESC')->get();
        $years_exist_unique = (new YearsService($request))->getYearsUnique($pagos);

        if (count($years_exist_unique) > 0) {
            return response()->json([
                'pagos' => collect($years_exist_unique),
                'status' => true,
            ], 200);
        } else {
            return response()->json([
                'msg' => 'No se han encontrado pagos registros.',
                'pagos' => (object) [],
                'status' => false,
            ], 200);
        }
    }

    public function porAnios($params_code)
    {
        $params_decode = (new EncryptService($params_code))->getDecodeEncrypt();
        $params = (new JsonParseService($params_decode))->getJsonDecode();
        $mesesService = new MesesService;
        $pagos = Pago::whereBetween('anio', [$params->anio_anterior, $params->anio_actual])
            ->whereHas('persona', function ($query) use ($params) {
                $query->where('id', $params->persona_id);
            })->orderBy('anio', 'DESC')->get();
        $years_exist_unique = (new YearsService($params))->getYearsUnique($pagos);
        $dni = Persona::find($params->persona_id)->dni;
        if ($dni) {

            if (count($years_exist_unique) > 0) {
                $pagos_with_detalles_create = array();

                foreach ($years_exist_unique as $key => $year) {
                    $yearsReportService = new YearsService((object) array_merge((array) $params, $year));
                    $pago = Pago::With(['persona'])->where('anio', $year)
                        ->whereHas('persona', function ($query) use ($params) {
                            $query->where('id', $params->persona_id);
                        })->first();
                    // Detalles por mes
                    $meses = $mesesService->getMesesAndCount($year, $params->persona_id);

                    // Detalles por haberes y descuentos
                    $haberes = $yearsReportService->getAllDetailsByType('haber');
                    $descuentos = $yearsReportService->getAllDetailsByType('descuento');

                    // Detalles totales
                    $total_haberes = $yearsReportService->getTotalByYear('haberes');
                    $total_descuentos = $yearsReportService->getTotalByYear('descuentos');
                    $total_liquidos = $yearsReportService->getTotalByYear('liquidos');
                    $total_imponibles = $yearsReportService->getTotalByYear('imponibles');

                    // Order list
                    $order_haberes = collect($haberes)->sortBy('nombre');
                    $order_descuentos = collect($descuentos)->sortBy('nombre');

                    array_push($pagos_with_detalles_create, [
                        'pago' => $pago,
                        'haberes' => (object) $order_haberes,
                        'descuentos' => (object) $order_descuentos,
                        'total_haberes' => (object) $total_haberes,
                        'total_descuentos' => (object) $total_descuentos,
                        'liquidos' => (object) $total_liquidos,
                        'imponibles' => (object) $total_imponibles,
                        'meses' => $meses,
                        'certificado' => $params->certificado,
                        'user' => auth()->user(),
                    ]);
                }

                // return $pagos_with_detalles_create;
                $pdf = PDF::loadView('reporte.anios', ['pagos' => $pagos_with_detalles_create]);
                $pdf->getDomPDF()->set_option("enable_php", true);
                $pdf->setPaper('a4', 'landscape');
                return $pdf->stream();
            } else {
                return response()->json([
                    'msg' => 'Pago no ha sido encontrado',
                ], 404);
            }
        } else {
            return response()->json([
                'msg' => 'La persona no existe',
            ], 404);
        }
    }

    public function searchByYear(Request $request)
    {
        $request->validate([
            'persona_id' => 'required|exists:personas,id',
            'anio' => 'required|exists:periodos,anio',
        ]);

        $pago = Pago::where('anio', $request->anio)
            ->whereHas('persona', function ($query) use ($request) {
                $query->where('id', $request->persona_id);
            })->first();

        if ($pago) {
            return response()->json([
                'pagos' => $pago,
                'status' => true,
            ], 200);
        } else {
            return response()->json([
                'msg' => 'El pago no ha sido encontrado',
                'pagos' => (object) [],
                'status' => false,
            ], 200);
        }
    }

    public function searchByJudicial(Request $request)
    {
        $request->validate([
            'persona_id' => 'required|exists:personas,id',
            'anio' => 'required|exists:periodos,anio',
            'mes' => 'required',
        ]);
        $periodo = (string) request('anio') . request('mes');

        $judiciales = Judicial::where('periodo', $periodo)
            ->where('persona_id', $request->persona_id)
            ->get();

        if ($judiciales->count()) {
            return response()->json([
                'judiciales' => $judiciales,
                'status' => true,
            ], 200);
        } else {
            return response()->json([
                'msg' => 'No hay judiciales encontrados',
                'judiciales' => (object) [],
                'status' => false,
            ], 200);
        }
    }

    public function porAnio($params_code)
    {
        $params_decode = (new EncryptService($params_code))->getDecodeEncrypt();
        $params = (new JsonParseService($params_decode))->getJsonDecode();
        $yearsReportService = new YearsService($params);
        $mesesService = new MesesService;

        // return $yearsReportService->getTotalByYear('haberes');
        $haberes = array();
        $descuentos = array();

        $dni = Persona::find($params->persona_id)->dni;
        if ($dni) {

            $pago = Pago::where('anio', $params->anio)
                ->whereHas('persona', function ($query) use ($params) {
                    $query->where('id', $params->persona_id);
                })->first();

            if ($pago) {
                // if ($pago->monto_liquido != '0.00') {
                // Detalles por mes
                $meses = $mesesService->getMesesAndCount($params->anio, $params->persona_id);

                // Detalles por haberes y descuentos
                $haberes = $yearsReportService->getAllDetailsByType('haber');
                $descuentos = $yearsReportService->getAllDetailsByType('descuento');

                // Detalles totales
                $total_haberes = $yearsReportService->getTotalByYear('haberes');
                $total_descuentos = $yearsReportService->getTotalByYear('descuentos');
                $total_liquidos = $yearsReportService->getTotalByYear('liquidos');
                $total_imponibles = $yearsReportService->getTotalByYear('imponibles');

                // Order list
                $order_haberes = collect($haberes)->sortBy('nombre');
                $order_descuentos = collect($descuentos)->sortBy('nombre');

                $pdf = PDF::loadView('reporte.anio', [
                    'pago' => $pago,
                    'haberes' => (object) $order_haberes,
                    'descuentos' => (object) $order_descuentos,
                    'total_haberes' => (object) $total_haberes,
                    'total_descuentos' => (object) $total_descuentos,
                    'liquidos' => (object) $total_liquidos,
                    'imponibles' => (object) $total_imponibles,
                    'meses' => $meses,
                    'certificado' => $params->certificado,
                    'user' => auth()->user(),
                ]);
                $pdf->getDomPDF()->set_option("enable_php", true);
                $pdf->setPaper('a4', 'landscape');

                return $pdf->stream();

            } else {
                return response()->json([
                    'msg' => 'Pago no ha sido encontrado',
                ], 404);
            }
        }
    }

    public function porMes($params_code)
    {
        // $params = base64_decode($params_code);
        $params_decode = (new EncryptService($params_code))->getDecodeEncrypt();
        $params = (new JsonParseService($params_decode))->getJsonDecode();
        $reportService = new ReportService($params);

        $dni = Persona::find($params->persona_id)->dni;
        if ($dni) {

            $pago = Pago::where('anio', $params->anio)->mes($params->mes)
                ->where('persona_id', $params->persona_id)->first();

            if ($pago) {

                $total_pagos = Pago::where('anio', $params->anio)->mes($params->mes)
                    ->where('persona_id', $params->persona_id)
                    ->count();

                //detalles de haberes y descuentos
                $haberes = $reportService->getOneDetailsByType('haber');
                $descuentos = $reportService->getOneDetailsByType('descuento');
                // return $haberes;

                //totales
                $total_haberes = $reportService->getTotalByMes('haberes');
                $total_descuentos = $reportService->getTotalByMes('descuentos');
                $total_liquidos = $reportService->getTotalByMes('liquidos');
                $total_imponibles = $reportService->getTotalByMes('imponibles');

                $nombre_mes = strtoupper((new MesesService)->getNameMonth($params->mes));
                // Order list
                $order_haberes = collect($haberes)->sortBy('nombre');
                $order_descuentos = collect($descuentos)->sortBy('nombre');

                $pdf = PDF::loadView('reporte.mes', [
                    'pago' => $pago,
                    'nombre_mes' => $nombre_mes,
                    'total_pagos' => $total_pagos,
                    'haberes' => $order_haberes,
                    'descuentos' => $order_descuentos,
                    'total_haberes' => $total_haberes,
                    'total_descuentos' => $total_descuentos,
                    'liquidos' => $total_liquidos,
                    'imponibles' => $total_imponibles,
                    'certificado' => $params->certificado,
                    'user' => auth()->user(),
                ]);
                $pdf->getDomPDF()->set_option("enable_php", true);

                $pdf->setPaper('a4');
                return $pdf->stream();
            } else {
                return response()->json([
                    'msg' => 'Pago no ha sido encontrado',
                ], 404);
            }
        }
    }

    public function byMesApi($params_code)
    {
        // $params = base64_decode($params_code);
        $params_decode = (new EncryptService($params_code))->getDecodeEncrypt();
        $params = (new JsonParseService($params_decode))->getJsonDecode();
        // $params = json_decode($params_decode, false);
        // return var_dump($params);
        $reportService = new ReportService($params);

        $dni = Persona::find($params->persona_id)->dni;
        if ($dni) {

            $pago = Pago::where('anio', $params->anio)->mes($params->mes)
                ->where('persona_id', $params->persona_id)->first();

            if ($pago) {

                $total_pagos = Pago::where('anio', $params->anio)->mes($params->mes)
                    ->where('persona_id', $params->persona_id)
                    ->count();

                //detalles de haberes y descuentos
                $haberes = $reportService->getOneDetailsByType('haber');
                $descuentos = $reportService->getOneDetailsByType('descuento');
                // return $haberes;

                //totales
                $total_haberes = $reportService->getTotalByMes('haberes');
                $total_descuentos = $reportService->getTotalByMes('descuentos');
                $total_liquidos = $reportService->getTotalByMes('liquidos');
                $total_imponibles = $reportService->getTotalByMes('imponibles');

                $nombre_mes = strtoupper((new MesesService)->getNameMonth($params->mes));
                // Order list
                $order_haberes = collect($haberes)->sortBy('nombre');
                $order_descuentos = collect($descuentos)->sortBy('nombre');

                $pdf = PDF::loadView('reporte.mesApi', [
                    'pago' => $pago,
                    'nombre_mes' => $nombre_mes,
                    'total_pagos' => $total_pagos,
                    'haberes' => $order_haberes,
                    'descuentos' => $order_descuentos,
                    'total_haberes' => $total_haberes,
                    'total_descuentos' => $total_descuentos,
                    'liquidos' => $total_liquidos,
                    'imponibles' => $total_imponibles,
                    'certificado' => $params->certificado,
                    'meses' => (new MesesService)->getMeses(),
                    'user' => auth()->user(),
                ]);
                $pdf->getDomPDF()->set_option("enable_php", true);

                $pdf->setPaper('a4');
                return $pdf->stream();
            } else {
                return response()->json([
                    'msg' => 'Pago no ha sido encontrado',
                ], 404);
            }
        }
    }

    public function searchByYearAndMonth(Request $request)
    {
        $request->validate([
            'persona_id' => 'required|exists:personas,id',
            'anio' => 'required|exists:periodos,anio',
            'mes' => 'required',
        ]);

        $pago = Pago::With(['persona'])->where('anio', $request->anio)->mes($request->mes)
            ->where('persona_id', $request->persona_id)
            ->first();

        if ($pago) {
            return response()->json([
                'pagos' => $pago,
            ], 200);
        } else {
            return response()->json([
                'msg' => 'Pago no ha sido encontrado',
                'pagos' => (object) [],
            ], 200);
        }
    }

    public function byJudicial($params_code)
    {
        // $params = base64_decode($params_code);
        $params_decode = (new EncryptService($params_code))->getDecodeEncrypt();
        $params = (new JsonParseService($params_decode))->getJsonDecode();
        // $params = json_decode($params_decode, false);
        // return var_dump($params);
        $nombre_mes = strtoupper((new MesesService)->getNameMonth($params->mes));

        $judicial = Judicial::find($params->id);
        if ($judicial) {
            $pdf = PDF::loadView('reporte.judicial', [
                'judicial' => $judicial,
                'nombre_mes' => $nombre_mes,
                'anio' => $params->anio,
                'user' => auth()->user(),
            ]);
            $pdf->getDomPDF()->set_option("enable_php", true);

            $pdf->setPaper('a4');
            return $pdf->stream();
        } else {
            return response()->json([
                'msg' => 'Sin reportes judiciales para este periodo.',
            ], 404);
        }
    }
}
