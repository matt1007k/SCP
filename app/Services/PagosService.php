<?php
namespace App\Services;

use App\Models\Pago;
use App\Models\Detalle;
use App\Models\Persona;
use App\Models\HaberDescuento;
use Illuminate\Support\Facades\Auth;

class PagosService{

    public function __construct()
    {
    }

    public const FIELDS_EXCEL = [
        'periodo' => 'periodo',
        'monto_liquido' => 'rlq_totliqpago',
        'monto_imponible' => 'rlq_timpopen',
        'cvariable' => 'rlq_mpension', // rlq_mpension
        'cfija' => 'rlq_comisionmtofijafp',
        'seguro' => 'rlq_mtoseguro',
    ];

    public function createPago($row, Persona $persona){
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

    public function getItemPago($row): array{
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
}