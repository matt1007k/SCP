<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Imports\HaberDescuentoImport;
use App\Imports\PersonasImport;
use App\Models\Detalle;
use App\Models\HaberDescuento;
use App\Models\Pago;
use App\Models\Persona;
use App\Services\HaberesImponiblesService;
use Auth;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ImportarController extends Controller
{
    public function personas(Request $request)
    {
        $request->validate([
            'archivo' => 'required|mimes:xls,xlsx',
        ]);
        set_time_limit(0);
        // ini_set('memory_limit', '20.97152M');
        ini_set('memory_limit', '-1');

        $archivo = $request->file('archivo')->getClientOriginalName();
        $filename = pathinfo($archivo, PATHINFO_FILENAME);

        $estadoExcelNombre = substr($filename, -1);

        $estado = $this->getEstado($estadoExcelNombre);
        if ($estado === '') {
            return response()->json([
                'msg' => 'El nombre del archivo excel no es correcto',
                'import' => false,
            ], 200);
        }
        try {
            $personasExcel = Excel::toCollection(new PersonasImport(), $request->file('archivo'));
        } catch (\PhpOffice\PhpSpreadsheet\Exception $e) {
            if ($e) {
                return response()->json([
                    'import' => true,
                    'msg' => 'El archivo excel no tiene datos.',
                ], 200);
            }
        }
        // return $personasExcel;
        if (count($personasExcel)) {
            foreach ($personasExcel[0] as $personaExcel) {
                if ($personaExcel['nombres'] == null ||
                    $personaExcel['apepat'] == null ||
                    $personaExcel['apemat'] == null ||
                    $personaExcel['dni'] == null ||
                    $personaExcel['codmod'] == null ||
                    $personaExcel['cargo'] == null) {
                    return response()->json([
                        'import' => true,
                        'msg' => 'El archivo excel no tiene datos.',
                    ], 200);
                }
                $DetallesHaber = $this->generarDetallesPago($personaExcel, 'hab', 'mtohab');
                $DetallesDescuento = $this->generarDetallesPago($personaExcel, "des", "mtodes");

                $total_haber = $this->getTotalMonto($DetallesHaber, "mtohab");
                $total_descuento = $this->getTotalMonto($DetallesDescuento, "mtodes");

                $personaExiste = Persona::where('dni', $personaExcel['dni'])->first();

                if (!$personaExiste) {
                    $persona = new Persona();
                    $persona->nombre = $personaExcel['nombres'];
                    $persona->apellido_paterno = $personaExcel['apepat'];
                    $persona->apellido_materno = $personaExcel['apemat'];
                    $persona->dni = $personaExcel['dni'];
                    $persona->codigo_modular = $personaExcel['codmod'];
                    $persona->cargo = $personaExcel['cargo'];
                    $persona->estado = $estado;
                    $persona->user_id = Auth::user()->id;
                    if ($persona->save()) {
                        $totalHD = HaberDescuento::all()->count();
                        if ($totalHD > 0) {
                            $anio = substr($personaExcel['periodo'], 0, 4);
                            $mes = substr($personaExcel['periodo'], -2);

                            $pago = new Pago();
                            $pago->anio = $anio;
                            $pago->mes = $mes;
                            $pago->total_descuento = $total_descuento;
                            $pago->total_haber = $total_haber;
                            $pago->monto_liquido = $personaExcel['rlq_totliqpago'];
                            $pago->monto_imponible = $personaExcel['rlq_timpopen'];
                            $pago->persona_id = $persona->id;
                            $pago->user_id = Auth::user()->id;
                            if ($pago->save()) {
                                $this->saveDetailsPayment($pago, $DetallesHaber, 'hab', 'mtohab');
                                $this->saveDetailsPayment($pago, $DetallesDescuento, 'des', 'mtodes');
                            }
                        } else {
                            return response()->json([
                                'msg' => 'Los Haberes o Descuentos no han sido registrados.',
                                'import' => false,
                            ], 200);
                        }

                    }
                } else {
                    $totalHD = HaberDescuento::all()->count();

                    if ($totalHD > 0) {

                        $anio = substr($personaExcel['periodo'], 0, 4);
                        $mes = substr($personaExcel['periodo'], -2);

                        $pago = new Pago();
                        $pago->anio = $anio;
                        $pago->mes = $mes;
                        $pago->total_descuento = $total_descuento;
                        $pago->total_haber = $total_haber;
                        $pago->monto_liquido = $personaExcel['rlq_totliqpago'];
                        $pago->monto_imponible = $personaExcel['rlq_timpopen'];
                        $pago->persona_id = $personaExiste->id;
                        $pago->user_id = Auth::user()->id;
                        if ($pago->save()) {
                            $this->saveDetailsPayment($pago, $DetallesHaber, 'hab', 'mtohab');
                            $this->saveDetailsPayment($pago, $DetallesDescuento, 'des', 'mtodes');
                        }
                    } else {
                        return response()->json([
                            'msg' => 'Los Haberes o Descuentos no han sido registrados.',
                            'import' => false,
                        ], 200);
                    }

                }

            }
            return response()->json([
                'import' => true,
            ]);
        } else {
            return response()->json([
                'import' => false,
                'msg' => 'El archivo excel no tiene datos.',
            ], 200);
        }
    }

    public function saveDetailsPayment($pago, $detallesPagoExcel, $item_id, $montoItem)
    {

        foreach ($detallesPagoExcel as $key => $value) {

            // return $value[$montoItem];
            if ($value[$item_id] !== 0) {
                $codigo = $this->GetCodigo($value[$item_id], $item_id);
                $existeHD = HaberDescuento::where('codigo', $codigo)->first();
                if ($existeHD) {
                    $detalle = new Detalle();
                    $detalle->hd_id = $existeHD->id;
                    $detalle->monto = $value[$montoItem];
                    $detalle->pago_id = $pago->id;

                    $detalle->save();
                } else {
                    return response()->json([
                        'msg' => 'El Haber o Descuento con el id: ' . $value[$item_id] . ' no ha sido registrado',
                    ]);
                }
            }

        }

        return true;
    }

    public function getEstado($estadoExcelNombre)
    {
        $estado = '';
        if ($estadoExcelNombre == 'A') {
            $estado = 'activo';
            return $estado;
        } elseif ($estadoExcelNombre == 'C') {
            $estado = 'cesante';
            return $estado;
        } elseif ($estadoExcelNombre == 'S') {
            $estado = 'sobreviviente';
            return $estado;
        } else {
            return $estado;
        }
    }

    public function getTotalMonto($detalles, $montoItem)
    {
        $total = 0;

        foreach ($detalles as $key => $value) {
            $total += $value[$montoItem];
        }

        return $total;
    }

    public function GetCodigo($id, $item)
    {
        $codigo = "";

        if ($item == 'hab') {
            $codigo = "H" . $id;
        } elseif ($item == 'des') {
            $codigo = "D" . $id;
        }

        return $codigo;
    }

    public function generarDetallesPago($itemExcel, $item, $montoItem)
    {
        $arrayDetalles = array();
        $numero = 0;
        // $itemExcel['hab33'];

        // return count($itemExcel);
        $excel_id = "";
        $excel_monto = "";
        for ($i = 0; $i < count($itemExcel); $i++) {
            // $numero1;

            if ($i < 10) {
                $excel_id = $item . '0' . $i;
                $excel_monto = $montoItem . '0' . $i;
            } else {
                $excel_id = $item . $i;
                $excel_monto = $montoItem . $i;
            }

            if (isset($itemExcel[$excel_id]) || isset($itemExcel[$excel_monto])) {

                // return $itemExcel[$excel_id];
                array_push($arrayDetalles, [
                    $item => $itemExcel[$excel_id],
                    $montoItem => $itemExcel[$excel_monto],
                ]);
            }

        }

        return $arrayDetalles;
    }

    public function descuentos(Request $request)
    {
        $request->validate([
            'archivo' => 'required|mimes:xls,xlsx',
        ]);
        set_time_limit(0);
        $haberImpService = new HaberesImponiblesService();

        // $import->onlySheets('haberes', 'descuentos');
        // $headings = (new HeadingRowImport)->toArray($request->file('archivo'));

        // dd(Auth::user()->id);

        try {
            $import = new HaberDescuentoImport();
            $hdescuentosExcel = Excel::toCollection($import, $request->file('archivo'));
        } catch (\PhpOffice\PhpSpreadsheet\Exception $e) {
            if ($e) {
                return response()->json([
                    'import' => true,
                    'msg' => 'El archivo excel no tiene datos.',
                ], 200);
            }
        }

        if (count($hdescuentosExcel) > 0) {
            foreach ($hdescuentosExcel['HABERES'] as $haber) {

                $codigo = 'H' . $haber['codigo'];
                $haberEncontrado = HaberDescuento::where('codigo', $codigo)->first();
                if (!$haberEncontrado) {
                    $hdescuento = new HaberDescuento();
                    $hdescuento->codigo = $codigo;
                    $hdescuento->tipo = "haber";
                    $hdescuento->nombre = $haber['concepto'];
                    $hdescuento->descripcion = $haber['det1'];
                    $hdescuento->descripcion_simple = $haber['det2'];
                    $hdescuento->user_id = Auth::user()->id;
                    foreach ($haberImpService->getHaberesImpobibles() as $haberImponible) {
                        if ($haber['det1'] == $haberImponible['descripcion']) {
                            $hdescuento->es_imponible = true;
                        }
                    }
                    $hdescuento->save();
                }

            }

            foreach ($hdescuentosExcel['DESCUENTOS'] as $descuento) {

                $codigo = 'D' . $descuento['codigo'];
                $descuentoEncontrado = HaberDescuento::where('codigo', $codigo)->first();
                if (!$haberEncontrado) {
                    $hdescuento = new HaberDescuento();
                    $hdescuento->codigo = $codigo;
                    $hdescuento->tipo = "descuento";
                    $hdescuento->nombre = $descuento['concepto'];
                    $hdescuento->descripcion = $descuento['det1'];
                    $hdescuento->descripcion_simple = $descuento['det2'];
                    $hdescuento->user_id = Auth::user()->id;
                    $hdescuento->save();
                }

            }

            return response()->json([
                'import' => true,
            ]);
        } else {
            return response()->json([
                'import' => true,
                'msg' => 'El archivo excel no tiene datos.',
            ], 200);
        }

    }

}
