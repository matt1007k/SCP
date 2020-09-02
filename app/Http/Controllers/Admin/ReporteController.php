<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HaberDescuento;
use App\Models\Historial;
use App\Models\Pago;
use App\Models\Persona;
use App\Models\User;
use App\Services\EncryptService;
use App\Services\JsonParseService;
use App\Services\MesesService;
use App\Services\ReportService;
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
            'certificado' => 'required|unique:historiales,certificado',
        ]);

        $pagos = Pago::whereBetween('anio', [$request->anio_anterior, $request->anio_actual])
            ->whereHas('persona', function ($query) use ($request) {
                $query->where('id', $request->persona_id);
            })->orderBy('anio', 'DESC')->get();
        $years_exist_unique = $this->getYearsUnique($pagos);

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
        $params = base64_decode($params_code);

        $persona_id = json_decode($params)->persona_id;
        $anio_anterior = json_decode($params)->anio_anterior;
        $anio_actual = json_decode($params)->anio_actual;
        $ver = json_decode($params)->ver;
        $certificado = json_decode($params)->certificado;

        $pagos = Pago::whereBetween('anio', [$anio_anterior, $anio_actual])
            ->whereHas('persona', function ($query) use ($persona_id) {
                $query->where('id', $persona_id);
            })->orderBy('anio', 'DESC')->get();
        $years_exist_unique = $this->getYearsUnique($pagos);
        $dni = Persona::find($persona_id)->dni;
        // return $years_exist_unique;
        if ($dni) {

            if (count($years_exist_unique) > 0) {
                $pagos_with_detalles_create = array();
                $pagos_with_detalles_view = array();

                foreach ($years_exist_unique as $key => $year) {
                    $pago = Pago::With(['persona'])->where('anio', $year)
                        ->whereHas('persona', function ($query) use ($persona_id) {
                            $query->where('id', $persona_id);
                        })->first();
                    // Detalles por mes
                    $meses = $this->getMesesAndCount($year, $persona_id);

                    // Detalles por haberes y descuentos
                    $haberes = $this->getAllDetailsByType($year, $persona_id, 'haber');
                    $descuentos = $this->getAllDetailsByType($year, $persona_id, 'descuento');

                    // Detalles totales
                    $total_haberes = $this->getTotalByYear($year, $persona_id, 'haberes');
                    $total_descuentos = $this->getTotalByYear($year, $persona_id, 'descuentos');
                    $total_liquidos = $this->getTotalByYear($year, $persona_id, 'liquidos');
                    $total_imponibles = $this->getTotalByYear($year, $persona_id, 'imponibles');

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
                        'certificado' => $certificado,
                        'user' => auth()->user(),
                    ]);

                    if ($ver == 1) {

                        $historial = Historial::where('certificado', $certificado)->where('dni', $dni)->first();

                        if ($historial) {

                            $user_view = User::where('dni', $historial->dni_user)->first();

                            array_push($pagos_with_detalles_view, [
                                'pago' => $pago,
                                'haberes' => (object) $order_haberes,
                                'descuentos' => (object) $order_descuentos,
                                'total_haberes' => (object) $total_haberes,
                                'total_descuentos' => (object) $total_descuentos,
                                'liquidos' => (object) $total_liquidos,
                                'imponibles' => (object) $total_imponibles,
                                'meses' => $meses,
                                'certificado' => $certificado,
                                'user' => $user_view,
                            ]);
                        }
                    }
                }

                if ($ver == 0) {
                    //create historial
                    $historial = Historial::where('certificado', $certificado)->where('dni', $dni)->first();
                    $certificado_hist = Historial::where('certificado', $certificado)->first();
                    // Incriptamos los parametros
                    $hash_code = "{\"anio_anterior\":\"$anio_anterior\",\"anio_actual\":\"$anio_actual\",\"persona_id\":\"$persona_id\",\"certificado\":\"$certificado\",\"ver\":1}";
                    $base64_code = base64_encode($hash_code);
                    if ($historial) {
                        return redirect('reporte/por-anios/' . $base64_code);
                    } elseif ($certificado_hist) {
                        return redirect('reporte/por-anios/' . $base64_code);
                    } else {
                        Historial::create([
                            'anio' => $anio_anterior . '-' . $anio_actual,
                            'meses' => '01-12',
                            'dni' => $dni,
                            'certificado' => $certificado,
                            'tipo' => 'rango',
                            'dni_user' => auth()->user()->dni,
                            'persona_id' => $persona_id,
                        ]);
                    }

                    // return $pagos_with_detalles;
                    $pdf = PDF::loadView('reporte.anios', ['pagos' => $pagos_with_detalles_create]);
                    $pdf->getDomPDF()->set_option("enable_php", true);
                    $pdf->setPaper('a4', 'landscape');

                    return $pdf->stream();
                } elseif ($ver == 1) {
                    $historial = Historial::where('certificado', $certificado)->where('dni', $dni)->first();
                    // return $pagos_with_detalles_view;
                    if ($historial) {
                        $pdf = PDF::loadView('reporte.anios', ['pagos' => $pagos_with_detalles_view]);
                        $pdf->getDomPDF()->set_option("enable_php", true);
                        $pdf->setPaper('a4', 'landscape');

                        return $pdf->stream();
                    } else {
                        return redirect('admin/historiales')->with('message', 'La constancia de pagos no existe');
                    }
                } else {
                    return redirect('admin/historiales')->with('message', 'La operación no es inválida.');
                }
            } else {
                return response()->json([
                    'msg' => 'Pago no ha sido encontrado',
                ], 404);
            }
        }
    }

    public function getYearsUnique($pagos)
    {
        $years_exist = array();
        $years_exist_unique = array();

        foreach ($pagos as $key => $value) {
            array_push($years_exist, ['anio' => $value['anio']]);
        }

        $pagos_unique_year = $this->unique_multidim_array($years_exist, 'anio');
        foreach ($pagos_unique_year as $key => $value) {
            array_push($years_exist_unique, ['anio' => $value['anio']]);
        }

        return $years_exist_unique;
    }

    public function searchByYear(Request $request)
    {
        $request->validate([
            'persona_id' => 'required|exists:personas,id',
            'anio' => 'required|exists:periodos,anio',
            'certificado' => 'required|unique:historiales,certificado',
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

    public function porAnio($params_code)
    {
        $params = base64_decode($params_code);

        $persona_id = json_decode($params)->persona_id;
        $anio = json_decode($params)->anio;
        $certificado = json_decode($params)->certificado;
        $ver = json_decode($params)->ver;

        $haberes = array();
        $descuentos = array();

        $dni = Persona::find($persona_id)->dni;
        if ($dni) {

            $pago = Pago::where('anio', $anio)
                ->whereHas('persona', function ($query) use ($persona_id) {
                    $query->where('id', $persona_id);
                })->first();

            if ($pago) {
                // if ($pago->monto_liquido != '0.00') {
                // Detalles por mes
                $meses = $this->getMesesAndCount($anio, $persona_id);

                // Detalles por haberes y descuentos
                $haberes = $this->getAllDetailsByType($anio, $persona_id, 'haber');
                $descuentos = $this->getAllDetailsByType($anio, $persona_id, 'descuento');

                // Detalles totales
                $total_haberes = $this->getTotalByYear($anio, $persona_id, 'haberes');
                $total_descuentos = $this->getTotalByYear($anio, $persona_id, 'descuentos');
                $total_liquidos = $this->getTotalByYear($anio, $persona_id, 'liquidos');
                $total_imponibles = $this->getTotalByYear($anio, $persona_id, 'imponibles');

                // Order list
                $order_haberes = collect($haberes)->sortBy('nombre');
                $order_descuentos = collect($descuentos)->sortBy('nombre');

                // $array_test = array([
                //     "nombre_haber"=> "reunifica",
                //     "monto_enero1"=> "150.00",
                //     "monto_enero2"=> "128.00",
                //     "monto_febrero1"=> "20.00",
                //     "monto_marzo1"=> "0.00"
                // ]);
                // return $haberes;

                if ($ver == 0) {
                    //create historial
                    $historial = Historial::where('certificado', $certificado)->where('dni', $dni)->first();
                    $certificado_hist = Historial::where('certificado', $certificado)->first();

                    $hash_code = "{\"anio\":\"$anio\",\"persona_id\":\"$persona_id\",\"certificado\":\"$certificado\",\"ver\":1}";
                    $base64_code = base64_encode($hash_code);
                    if ($historial) {
                        return redirect('reporte/por-anio/' . $base64_code);
                    } elseif ($certificado_hist) {
                        return redirect('reporte/por-anio/' . $base64_code);
                    } else {
                        Historial::create([
                            'anio' => $anio,
                            'meses' => '01-12',
                            'dni' => $dni,
                            'certificado' => $certificado,
                            'tipo' => 'anio',
                            'dni_user' => auth()->user()->dni,
                            'persona_id' => $persona_id,
                        ]);
                    }

                    $pdf = PDF::loadView('reporte.anio', [
                        'pago' => $pago,
                        'haberes' => (object) $order_haberes,
                        'descuentos' => (object) $order_descuentos,
                        'total_haberes' => (object) $total_haberes,
                        'total_descuentos' => (object) $total_descuentos,
                        'liquidos' => (object) $total_liquidos,
                        'imponibles' => (object) $total_imponibles,
                        'meses' => $meses,
                        'certificado' => $certificado,
                        'user' => auth()->user(),
                    ]);
                    $pdf->getDomPDF()->set_option("enable_php", true);
                    $pdf->setPaper('a4', 'landscape');

                    return $pdf->stream();
                } elseif ($ver == 1) {
                    $historial = Historial::where('certificado', $certificado)->where('dni', $dni)->first();
                    if ($historial) {
                        $user = User::where('dni', $historial->dni_user)->first();
                        $pdf = PDF::loadView('reporte.anio', [
                            'pago' => $pago,
                            'haberes' => (object) $order_haberes,
                            'descuentos' => (object) $order_descuentos,
                            'total_haberes' => (object) $total_haberes,
                            'total_descuentos' => (object) $total_descuentos,
                            'liquidos' => (object) $total_liquidos,
                            'imponibles' => (object) $total_imponibles,
                            'meses' => $meses,
                            'certificado' => $certificado,
                            'user' => $user,
                        ]);
                        $pdf->getDomPDF()->set_option("enable_php", true);
                        $pdf->setPaper('a4', 'landscape');

                        return $pdf->stream();
                    } else {
                        return redirect('admin/historiales')->with('message', 'La constancia de pagos no existe.');
                    }
                } else {
                    return redirect('admin/historiales')->with('message', 'La operación no es inválida.');
                }

                // }else {
                //     return response()->json([
                //         'msg' => 'Pago no tiene datos.',
                //     ], 404);
                // }
            } else {
                return response()->json([
                    'msg' => 'Pago no ha sido encontrado',
                ], 404);
            }
        }
    }

    public function orderMontoByYear($item_array, $anio, $persona_id)
    {
        // return $item_array;
        $meses_and_count = $this->getMesesAndCount($anio, $persona_id);
        $new_duplicates = [];
        //Get names
        $only_names = $this->getNames($item_array);
        // Get count by values
        $count_names = array_count_values($only_names);
        $collect = collect($item_array);

        $duplicates = $this->getDuplicatesItemByYear($count_names, $collect, $meses_and_count);
        $new_duplicates = $this->addZeroDuplicatesByYear($meses_and_count, $duplicates);

        $not_duplicates = $this->getNotDuplicatesItem($count_names, $collect);
        $new_not_duplicates = $this->addZeroNotDuplicatesByYear($meses_and_count, $not_duplicates);

        return array_merge($new_duplicates, $new_not_duplicates);
    }
    public function addZeroDuplicatesByYear($meses_and_count, $duplicates)
    {
        // add zero
        foreach ($meses_and_count as $key => $month) {
            $count_items_one_month = $month['cantidad'];
            $nombre_mes = strtolower($month['nombre']);
            // Get Join Duplicate
            foreach ($duplicates as $key2 => $item) {
                if ($count_items_one_month > 0) {
                    for ($j = 1; $j <= $count_items_one_month; $j++) {
                        if (!isset($item[$nombre_mes]['monto_' . $nombre_mes . $j])) {
                            // return $item[$nombre_mes]['monto_'.$nombre_mes.$num];
                            // array_push($monto, $item[$nombre_mes]);
                            $duplicates[$key2][$nombre_mes]['monto_' . $nombre_mes . $j] = '0.00';
                        }
                    }
                }
            }
        }
        return $duplicates;
    }

    public function addZeroNotDuplicatesByYear($meses_and_count, $not_duplicates)
    {
        foreach ($meses_and_count as $key => $month) {

            $count_items_one_month = $month['cantidad'];

            $nombre_mes = strtolower($month['nombre']);
            // Get not Duplicate
            foreach ($not_duplicates as $key => $value) {
                if ($count_items_one_month > 0) {
                    for ($j = 1; $j <= $count_items_one_month; $j++) {
                        if (!isset($value[$nombre_mes]['monto_' . $nombre_mes . $j])) {
                            // return $value['monto']['monto_'.$nombre_mes.$j];
                            $not_duplicates[$key][$nombre_mes]['monto_' . $nombre_mes . $j] = '0.00';
                        }
                    }
                } else {
                    $not_duplicates[$key][$nombre_mes]['monto_' . $nombre_mes . '1'] = '0.00';
                }
            }
        }
        return $not_duplicates;
    }

    public function orderMontoByMonth($item_array, $anio, $mes, $persona_id)
    {
        $nombre_mes = strtolower($this->getNameMonth($mes));
        $meses_and_count = $this->getMesesAndCount($anio, $persona_id);
        $count_items_this_month = 0;

        foreach ($meses_and_count as $key => $month) {
            if ($mes === $month['numero']) {
                $count_items_this_month = $month['cantidad'];
            }
        }

        //Get names
        $only_names = $this->getNames($item_array);
        // Get count by values
        $count_names = array_count_values($only_names);
        $collect = collect($item_array);

        $duplicates = $this->getDuplicatesItem($count_names, $collect, $count_items_this_month, $nombre_mes);
        $not_duplicates = $this->getNotDuplicatesItem($count_names, $collect);

        // return $duplicates;
        // add monto no duplicates field 0.00
        foreach ($meses_and_count as $key => $month) {
            if ($mes === $month['numero']) {
                foreach ($not_duplicates as $key => $value) {
                    for ($j = 1; $j <= $count_items_this_month; $j++) {
                        if (!isset($value[$nombre_mes]['monto_' . $nombre_mes . $j])) {
                            // return $value['monto']['monto_'.$nombre_mes.$j];
                            $not_duplicates[$key][$nombre_mes]['monto_' . $nombre_mes . $j] = '0.00';
                        }
                    }
                }
            }
        }

        // add 0.00 Duplicates
        foreach ($meses_and_count as $key => $month) {
            if ($mes === $month['numero']) {
                foreach ($duplicates as $key => $value) {
                    for ($j = 1; $j <= $count_items_this_month; $j++) {
                        if (!isset($value[$nombre_mes]['monto_' . $nombre_mes . $j])) {
                            // return $value['monto']['monto_'.$nombre_mes.$j];
                            $duplicates[$key][$nombre_mes]['monto_' . $nombre_mes . $j] = '0.00';
                        }
                    }
                }
            }
        }
        return array_merge($duplicates, $not_duplicates);
    }

    public function addItemToArray($array, $item_array, $mes)
    {
        $i = 0;
        $nombre_mes = strtolower($this->getNameMonth($mes));
        foreach ($item_array as $key => $item) {
            $array[$i][$nombre_mes] = $item;
            // $result [$i]["enero"]= $item->name;
            $i++;
        }
        return $array;
    }

    public function getDuplicatesItem($count_names, $collect, $count_items_one_month, $nombre_mes)
    {
        $array_duplicates = [];
        $i = 0;
        foreach ($count_names as $key => $count) {
            // if count > 1 item duplicate
            if ($count > 1) {
                // Search text
                if ($key !== '') {
                    $text = $key;
                    $duplicate = $collect->filter(function ($item) use ($text) {
                        if (isset($item['nombre'])) {
                            return $item['nombre'] === $text;
                        }
                    })->values();

                    $monto = array();
                    $nombre = array();
                    foreach ($duplicate as $key => $item) {
                        $nombre['nombre'] = $item['nombre'];
                        if ($count_items_one_month > 0) {
                            for ($j = 1; $j <= $count_items_one_month; $j++) {
                                if (isset($item[$nombre_mes]['monto_' . $nombre_mes . $j])) {
                                    $monto[$nombre_mes]['monto_' . $nombre_mes . $j] = $item[$nombre_mes]['monto_' . $nombre_mes . $j];
                                }
                            }
                        } else {
                            $monto[$nombre_mes]['monto_' . $nombre_mes . '1'] = '0.00';
                        }
                    }

                    $array_duplicates[$i] = array_merge($nombre, $monto);
                    $i++;
                }
            }
        }
        return $array_duplicates;
    }

    public function getDuplicatesItemByYear($count_names, $collect, $meses_and_count)
    {
        $array_duplicates = [];
        $i = 0;
        if (count($collect) > 0) {
            foreach ($count_names as $key => $count) {
                // if count > 1 item duplicate
                if ($count > 1) {
                    // Search text
                    if ($key !== '') {
                        $text = $key;
                        $duplicate = $collect->filter(function ($item) use ($text) {
                            if (isset($item['nombre'])) {
                                return $item['nombre'] === $text;
                            }
                        })->values();
                        $monto = array();
                        $nombre = array();
                        foreach ($meses_and_count as $key => $month) {
                            $count_items_one_month = $month['cantidad'];
                            $nombre_mes = strtolower($month['nombre']);
                            foreach ($duplicate as $key => $item) {
                                $nombre['nombre'] = $item['nombre'];
                                if ($count_items_one_month > 0) {
                                    for ($j = 1; $j <= $count_items_one_month; $j++) {
                                        if (isset($item[$nombre_mes]['monto_' . $nombre_mes . $j])) {
                                            $monto[$nombre_mes]['monto_' . $nombre_mes . $j] = $item[$nombre_mes]['monto_' . $nombre_mes . $j];
                                        }
                                    }
                                } else {
                                    $monto[$nombre_mes]['monto_' . $nombre_mes . '1'] = '0.00';
                                }
                            }
                        }

                        $array_duplicates[$i] = array_merge($nombre, $monto);
                        // $array_duplicates[$i] = $duplicate;
                        $i++;
                    }
                }
            }
        }

        return $array_duplicates;
    }

    public function getNotDuplicatesItem($count_names, $collect)
    {
        $array_not_duplicates = array();
        $i = 0;
        foreach ($count_names as $key => $count) {
            // if count <= 1 item no duplicate
            if ($count <= 1) {
                // Search text is not null
                if ($key != '') {
                    $text = $key;
                    $array = $collect->filter(function ($item) use ($text) {
                        if (isset($item['nombre'])) {
                            return $item['nombre'] == $text;
                        }
                    })->values();
                    $array_not_duplicates[$i] = $array[0];
                    $i++;
                }
            }
        }
        return $array_not_duplicates;
    }

    public function getNames($array)
    {
        $array_names = array();
        foreach ($array as $k => $v) {
            if (isset($v["nombre"])) {
                $array_names[$k] = $v["nombre"];
            }
        }

        return $array_names;
    }

    public function unique_multidim_array($array, $key)
    {
        $i = 0;
        $array_unique = array();
        $key_array = array();

        foreach ($array as $ix => $value) {
            // return $value[0][$key];
            if (!in_array($value[$key], $key_array)) {
                $key_array[$i] = $value[$key];
                $array_unique[$i] = $value;
            }
            $i++;
        }
        return $array_unique;
    }

    public function transposeData($data)
    {
        $retData = array();
        foreach ($data as $row => $columns) {
            foreach ($columns as $row2 => $column2) {
                $retData[$row2][] = $column2;
            }
        }
        return $retData;
    }

    public function getDetalleByMes($anio, $mes, $tipo, $persona_id)
    {
        $haberes = array();
        $descuentos = array();

        $pagos = Pago::where('anio', $anio)->mes($mes)
            ->where('persona_id', $persona_id)
            ->get();
        // return $pagos->detalles->count();
        $nombre_mes = strtolower($this->getNameMonth($mes));
        $monto = [];
        if ($pagos->count() > 0) {
            foreach ($pagos as $key_mes => $pago) {
                $i = 0;
                $i2 = 0;
                foreach ($pago->detalles->sortByDesc('hd_id') as $key => $detalle) {

                    $hd = HaberDescuento::findOrfail($detalle->hd_id);

                    if ($hd) {
                        if ($hd->tipo == 'haber') {
                            array_push($haberes, [
                                "nombre" => $hd->descripcion_simple,
                                $nombre_mes => [
                                    "monto_" . $nombre_mes . ($key_mes + 1) => $detalle->monto,
                                ],
                            ]);
                        } elseif ($hd->tipo == 'descuento') {
                            array_push($descuentos, [
                                "nombre" => $hd->descripcion_simple,
                                $nombre_mes => [
                                    "monto_" . $nombre_mes . ($key_mes + 1) => $detalle->monto,
                                ],
                            ]);
                        }
                    }
                }
            }
        } else {
            if ($tipo == 'haber') {

                $haberes[0]["nombre"] = '';
                $haberes[0]["monto"]["monto_" . $nombre_mes . '1'] = '0.00';
            } elseif ($tipo == 'descuento') {

                $descuentos[0]["nombre"] = '';
                $descuentos[0]["monto"]["monto_" . $nombre_mes . '1'] = '0.00';
            }
        }

        if ($tipo == 'haber') {
            return $haberes;
        } elseif ($tipo == 'descuento') {
            return $descuentos;
        }
    }

    public function getTotalByMes($anio, $persona_id, $tipo, $mes)
    {
        $total_haberes = array();
        $total_descuentos = array();
        $total_liquidos = array();
        $total_imponibles = array();

        $pagos = Pago::where('anio', $anio)->mes($mes)
            ->where('persona_id', $persona_id)
            ->get();
        // return $pagos;
        $mes_nombre = strtolower($this->getNameMonth($mes));

        if ($pagos->count() > 0) {
            $i = 0;
            foreach ($pagos->sortByDesc('mes') as $key_mes => $pago) {
                $total_haberes[$i]["total_haber_" . $mes_nombre . ($key_mes + 1)] = $pago->total_haber;
                $total_descuentos[$i]["total_descuento_" . $mes_nombre . ($key_mes + 1)] = $pago->total_descuento;
                $total_liquidos[$i]["monto_liquido_" . $mes_nombre . ($key_mes + 1)] = $pago->monto_liquido;
                $total_imponibles[$i]["monto_imponible_" . $mes_nombre . ($key_mes + 1)] = $pago->monto_imponible;
                $i++;
            }
        } else {
            $total_haberes[0]["total_haber_" . $mes_nombre . 1] = '0.00';
            $total_descuentos[0]["total_descuento_" . $mes_nombre . 1] = '0.00';
            $total_liquidos[0]["monto_liquido_" . $mes_nombre . 1] = '0.00';
            $total_imponibles[0]["monto_imponible_" . $mes_nombre . 1] = '0.00';
        }
        if ($tipo == 'haberes') {
            return $total_haberes;
        } elseif ($tipo == 'descuentos') {
            return $total_descuentos;
        } elseif ($tipo == 'liquidos') {
            return $total_liquidos;
        } elseif ($tipo == 'imponibles') {
            return $total_imponibles;
        }
    }

    public function getTotalByYear($anio, $persona_id, $tipo)
    {
        $total_enero = $this->getTotalByMes($anio, $persona_id, $tipo, '01');
        $total_febrero = $this->getTotalByMes($anio, $persona_id, $tipo, '02');
        $total_marzo = $this->getTotalByMes($anio, $persona_id, $tipo, '03');
        $total_abril = $this->getTotalByMes($anio, $persona_id, $tipo, '04');
        $total_mayo = $this->getTotalByMes($anio, $persona_id, $tipo, '05');
        $total_junio = $this->getTotalByMes($anio, $persona_id, $tipo, '06');
        $total_julio = $this->getTotalByMes($anio, $persona_id, $tipo, '07');
        $total_agosto = $this->getTotalByMes($anio, $persona_id, $tipo, '08');
        $total_septiembre = $this->getTotalByMes($anio, $persona_id, $tipo, '09');
        $total_octubre = $this->getTotalByMes($anio, $persona_id, $tipo, '10');
        $total_noviembre = $this->getTotalByMes($anio, $persona_id, $tipo, '11');
        $total_diciembre = $this->getTotalByMes($anio, $persona_id, $tipo, '12');

        $total = array_merge(
            $total_enero,
            $total_febrero,
            $total_marzo,
            $total_abril,
            $total_mayo,
            $total_junio,
            $total_julio,
            $total_agosto,
            $total_septiembre,
            $total_octubre,
            $total_noviembre,
            $total_diciembre
        );

        return $total;
    }

    public function getAllDetailsByType($anio, $persona_id, $tipo)
    {
        $enero_monto = $this->getDetalleByMes($anio, '01', $tipo, $persona_id);
        $febrero_monto = $this->getDetalleByMes($anio, '02', $tipo, $persona_id);
        $marzo_monto = $this->getDetalleByMes($anio, '03', $tipo, $persona_id);
        $abril_monto = $this->getDetalleByMes($anio, '04', $tipo, $persona_id);
        $mayo_monto = $this->getDetalleByMes($anio, '05', $tipo, $persona_id);
        $junio_monto = $this->getDetalleByMes($anio, '06', $tipo, $persona_id);
        $julio_monto = $this->getDetalleByMes($anio, '07', $tipo, $persona_id);
        $agosto_monto = $this->getDetalleByMes($anio, '08', $tipo, $persona_id);
        $septiembre_monto = $this->getDetalleByMes($anio, '09', $tipo, $persona_id);
        $octubre_monto = $this->getDetalleByMes($anio, '10', $tipo, $persona_id);
        $noviembre_monto = $this->getDetalleByMes($anio, '11', $tipo, $persona_id);
        $diciembre_monto = $this->getDetalleByMes($anio, '12', $tipo, $persona_id);
        // Join array monto
        $monto_by_year = array_merge(
            $enero_monto,
            $febrero_monto,
            $marzo_monto,
            $abril_monto,
            $mayo_monto,
            $junio_monto,
            $julio_monto,
            $agosto_monto,
            $septiembre_monto,
            $octubre_monto,
            $noviembre_monto,
            $diciembre_monto
        );
        // return $enero;
        $orderMontoByYear = $this->orderMontoByYear($monto_by_year, $anio, $persona_id);
        return $orderMontoByYear;
    }

    public function getOneDetailsByType($anio, $mes, $persona_id, $tipo)
    {
        $items_by_month = $this->getDetalleByMes($anio, $mes, $tipo, $persona_id);
        $items = $this->orderMontoByMonth($items_by_month, $anio, $mes, $persona_id);

        return $items;
    }

    public function getMesesAndCount($anio, $persona_id)
    {
        $enero_count = Pago::where('anio', $anio)->where('mes', '01')
            ->where('persona_id', $persona_id)
            ->count();
        $febrero_count = Pago::where('anio', $anio)->where('mes', '02')
            ->where('persona_id', $persona_id)
            ->count();
        $marzo_count = Pago::where('anio', $anio)->where('mes', '03')
            ->where('persona_id', $persona_id)
            ->count();
        $abril_count = Pago::where('anio', $anio)->where('mes', '04')
            ->where('persona_id', $persona_id)
            ->count();
        $mayo_count = Pago::where('anio', $anio)->where('mes', '05')
            ->where('persona_id', $persona_id)
            ->count();
        $junio_count = Pago::where('anio', $anio)->where('mes', '06')
            ->where('persona_id', $persona_id)
            ->count();
        $julio_count = Pago::where('anio', $anio)->where('mes', '07')
            ->where('persona_id', $persona_id)
            ->count();
        $agosto_count = Pago::where('anio', $anio)->where('mes', '08')
            ->where('persona_id', $persona_id)
            ->count();
        $septiembre_count = Pago::where('anio', $anio)->where('mes', '09')
            ->where('persona_id', $persona_id)
            ->count();
        $octubre_count = Pago::where('anio', $anio)->where('mes', '10')
            ->where('persona_id', $persona_id)
            ->count();
        $noviembre_count = Pago::where('anio', $anio)->where('mes', '11')
            ->where('persona_id', $persona_id)
            ->count();
        $diciembre_count = Pago::where('anio', $anio)->where('mes', '12')
            ->where('persona_id', $persona_id)
            ->count();

        return [
            ['numero' => '01', 'nombre' => 'Enero', 'cantidad' => $enero_count],
            ['numero' => '02', 'nombre' => 'Febrero', 'cantidad' => $febrero_count],
            ['numero' => '03', 'nombre' => 'Marzo', 'cantidad' => $marzo_count],
            ['numero' => '04', 'nombre' => 'Abril', 'cantidad' => $abril_count],
            ['numero' => '05', 'nombre' => 'Mayo', 'cantidad' => $mayo_count],
            ['numero' => '06', 'nombre' => 'Junio', 'cantidad' => $junio_count],
            ['numero' => '07', 'nombre' => 'Julio', 'cantidad' => $julio_count],
            ['numero' => '08', 'nombre' => 'Agosto', 'cantidad' => $agosto_count],
            ['numero' => '09', 'nombre' => 'Septiembre', 'cantidad' => $septiembre_count],
            ['numero' => '10', 'nombre' => 'Octubre', 'cantidad' => $octubre_count],
            ['numero' => '11', 'nombre' => 'Noviembre', 'cantidad' => $noviembre_count],
            ['numero' => '12', 'nombre' => 'Diciembre', 'cantidad' => $diciembre_count],
        ];
    }

    public function getNameMeses()
    {
        return [
            ['numero' => '01', 'nombre' => 'Enero'],
            ['numero' => '02', 'nombre' => 'Febrero'],
            ['numero' => '03', 'nombre' => 'Marzo'],
            ['numero' => '04', 'nombre' => 'Abril'],
            ['numero' => '05', 'nombre' => 'Mayo'],
            ['numero' => '06', 'nombre' => 'Junio'],
            ['numero' => '07', 'nombre' => 'Julio'],
            ['numero' => '08', 'nombre' => 'Agosto'],
            ['numero' => '09', 'nombre' => 'Septiembre'],
            ['numero' => '10', 'nombre' => 'Octubre'],
            ['numero' => '11', 'nombre' => 'Noviembre'],
            ['numero' => '12', 'nombre' => 'Diciembre'],
        ];
    }

    public function getNameMonth($mes)
    {
        $nombre = '';
        foreach ($this->getNameMeses() as $item_mes) {
            if ($mes == $item_mes['numero']) {
                $nombre = $item_mes['nombre'];
            }
        }

        return $nombre;
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
            ->where('id', $request->persona_id)
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
}
