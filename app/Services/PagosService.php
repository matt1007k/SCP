<?php

namespace App\Services;

use App\Models\Pago;
use App\Models\Detalle;
use App\Models\Persona;
use App\Models\HaberDescuento;
use Illuminate\Support\Facades\Auth;

class PagosService
{

    protected $datetimeService;
    protected $importElementsService;


    public function __construct()
    {
        $this->datetimeService = new DateTimeService();
        $this->importElementsService = new ImportElementsService();
    }

    public const FIELDS_EXCEL = [
        'periodo' => 'periodo',
        'monto_liquido' => 'rlq_totliqpago',
        'monto_imponible' => 'rlq_timpopen',
        'cvariable' => 'rlq_mpension', // rlq_mpension
        'cfija' => 'rlq_comisionmtofijafp',
        'seguro' => 'rlq_mtoseguro',

        /* DETALLES DE BOLETA */

        'fecha_nacimiento' => 'fec_nac',
        'establecimiento' => 'institucion_educativa',
        'tipo_servidor' => 'tipser', // cae_tiposervidor solo es id
        'regimen_laboral' => 'reglab', // falta valor solo es id
        'nivel_magisterial' => 'nivmag',
        'grupo_ocupacion' => 'grupo', // grado
        'horas' => 'horas',
        'tiempo_servicio' => 'cae_tiemposerv',
        'fecha_inicio' => 'inicio',
        'fecha_fin' => 'fin',
        'numero_cuenta' => 'cuenta',
        'leyenda_permanente' => 'leyenda',
        'leyenda_mensual' => 'leymes',
        'codigo_fiscal' => 'cae_codfiscal',
        'codigo_essalud' => 'codessalud',
        'afp_boleta' => 'afp_boleta',
        'codigo_afp' => 'cod_afp',
        'fafiliacion' => 'fec_afil_afp',
        'fdevengue' => 'fdevengue', // falta
        'codigo_establecimiento' => 'cae_codunidad',
        'numero_cargo' => 'cae_numcarg',
        'situacion' => 'cae_situacion',
        'tipo_pension' => 'cae_tipopension',
    ];

    public function createPago($row, Persona $persona)
    {
        $DetallesHaber = $this->generarDetallesPago($row, 'hab', 'mtohab');
        $DetallesDescuento = $this->generarDetallesPago($row, "des", "mtodes");

        $total_haber = $this->getTotalMonto($DetallesHaber, "mtohab");
        $total_descuento = $this->getTotalMonto($DetallesDescuento, "mtodes");

        $totalHD = HaberDescuento::all()->count();
        if ($totalHD > 0) {
            $pago = Pago::create(array_merge($this->getItemPago($row), [
                'persona_id' => $persona->id,
                'total_descuento' => $total_descuento,
                'total_haber' => $total_haber,
            ]));

            $this->saveDetailsPayment($pago, $DetallesHaber, 'hab', 'mtohab');
            $this->saveDetailsPayment($pago, $DetallesDescuento, 'des', 'mtodes');
        } else {
            return response()->json([
                'msg' => 'Los Haberes o Descuentos no han sido registrados.',
                'import' => false,
            ], 200);
        }
    }

    public function getItemPago($row): array
    {
        $anio = substr($row[self::FIELDS_EXCEL['periodo']], 0, 4);
        $mes = substr($row[self::FIELDS_EXCEL['periodo']], -2);

        return [
            'anio' => $anio,
            'mes' => $mes,
            'monto_liquido' => $row[self::FIELDS_EXCEL['monto_liquido']],
            'monto_imponible' => $row[self::FIELDS_EXCEL['monto_imponible']],
            'user_id' => Auth::id(),
            'cvariable' => $row[self::FIELDS_EXCEL['cvariable']],
            'cfija' => $row[self::FIELDS_EXCEL['cfija']],
            'seguro' => $row[self::FIELDS_EXCEL['seguro']],

            /* DETALLES DE BOLETA */
            'fecha_nacimiento' => trim($row[self::FIELDS_EXCEL['fecha_nacimiento']]) ? $this->datetimeService->convertIntToDate($row[self::FIELDS_EXCEL['fecha_nacimiento']]) : null,
            'establecimiento' => $row[self::FIELDS_EXCEL['establecimiento']],
            'tipo_servidor' => trim($row[self::FIELDS_EXCEL['tipo_servidor']]) ? $this->importElementsService->getTitleServidor((int) $row[self::FIELDS_EXCEL['tipo_servidor']]) : '',
            'regimen_laboral' => $this->importElementsService->getTitleRegimenLaboral($row[self::FIELDS_EXCEL['regimen_laboral']]),
            'nivel_magisterial' => $row[self::FIELDS_EXCEL['nivel_magisterial']],
            'grupo_ocupacion' => $row[self::FIELDS_EXCEL['grupo_ocupacion']],
            'horas' => $row[self::FIELDS_EXCEL['horas']],
            'tiempo_servicio' => isset($row[self::FIELDS_EXCEL['tiempo_servicio']]) ? $this->formatTiempoServicio((string) $row[self::FIELDS_EXCEL['tiempo_servicio']]) : null,
            'fecha_inicio' => trim($row[self::FIELDS_EXCEL['fecha_inicio']]) ? $this->datetimeService->convertStringToDate($row[self::FIELDS_EXCEL['fecha_inicio']]) : null,
            'fecha_fin' => trim($row[self::FIELDS_EXCEL['fecha_inicio']]) ? $this->datetimeService->convertStringToDate($row[self::FIELDS_EXCEL['fecha_fin']]) : null,
            'numero_cuenta' => $row[self::FIELDS_EXCEL['numero_cuenta']],
            'leyenda_permanente' => $row[self::FIELDS_EXCEL['leyenda_permanente']],
            'leyenda_mensual' => $row[self::FIELDS_EXCEL['leyenda_mensual']],
            'codigo_fiscal' => trim($row[self::FIELDS_EXCEL['codigo_fiscal']]) ? $this->importElementsService->getTitleCodeFiscal((int) $row[self::FIELDS_EXCEL['codigo_fiscal']]) : '',
            'codigo_essalud' => $row[self::FIELDS_EXCEL['codigo_essalud']],
            'afp_boleta' => $this->importElementsService->getTitleAfpBoleta((int) $row[self::FIELDS_EXCEL['afp_boleta']]),
            'codigo_afp' => $row[self::FIELDS_EXCEL['codigo_afp']],
            'fafiliacion' => trim($row[self::FIELDS_EXCEL['fafiliacion']]) ? $this->datetimeService->convertIntToDate($row[self::FIELDS_EXCEL['fafiliacion']]) : null,
            'fdevengue' => trim($row[self::FIELDS_EXCEL['fdevengue']]) ? $this->datetimeService->convertIntToDate($row[self::FIELDS_EXCEL['fdevengue']]) : null,
            'codigo_establecimiento' => $row[self::FIELDS_EXCEL['codigo_establecimiento']],
            'numero_cargo' => $row[self::FIELDS_EXCEL['numero_cargo']],
            'situacion' => $this->importElementsService->getTitleSituacion($row[self::FIELDS_EXCEL['situacion']]),
            'tipo_pension' => $this->importElementsService->getTipoPension($row[self::FIELDS_EXCEL['tipo_pension']]),
        ];
    }

    public function saveDetailsPayment(Pago $pago, $detallesPagoExcel, $item_id, $montoItem)
    {

        foreach ($detallesPagoExcel as $key => $value) {

            // return $value[$montoItem];
            if ($value[$item_id] !== 0) {
                $codigo = $this->GetCodigo($value[$item_id], $item_id);
                $existeHD = HaberDescuento::where('codigo', $codigo)->first();
                if ($existeHD) {
                    Detalle::create([
                        'monto' => $value[$montoItem],
                        'pago_id' => $pago->id,
                        'hd_id' => $existeHD->id
                    ]);
                } else {
                    return response()->json([
                        'msg' => 'El Haber o Descuento con el id: ' . $value[$item_id] . ' no ha sido registrado',
                    ]);
                }
            }
        }

        return true;
    }

    public function getTotalMonto($detalles, $montoItem)
    {
        $total = 0;

/*         foreach ($detalles as $key => $value) {
            $total += $value[$montoItem];
        } */
        foreach ($detalles as $key => $value) {
            $initialValue = $value[$montoItem] == 'NULL' ? 0 : $value[$montoItem]; 
              $total += $initialValue;
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

    public function formatTiempoServicio(string $tiempo_servicio): string
    {
        $new_format = '';
        if ($tiempo_servicio) {
            $anios = substr($tiempo_servicio, 0, 2);
            $meses = substr($tiempo_servicio, 2, 2);
            $dias = substr($tiempo_servicio, 4, 2);
            $new_format = "{$anios}/{$meses}/{$dias}";
        }

        return $new_format;
    }
}
