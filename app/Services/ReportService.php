<?php

namespace App\Services;

use App\Models\HaberDescuento;
use App\Models\Pago;

class ReportService
{
    protected $params;

    public function __construct(Object $params)
    {
        $this->params = $params;
    }

    public function getOneDetailsByType($tipo)
    {
        $items_by_month = $this->getDetalleByMes($tipo);
        $items = $this->orderMontoByMonth($items_by_month);

        return $items;
    }

    public function getDetalleByMes($tipo)
    {
        $pagos = Pago::where('anio', $this->params->anio)
            ->mes($this->params->mes)
            ->where('persona_id', $this->params->persona_id)
            ->get();

        $items = $this->getPaymentItems($pagos, $tipo);

        return $items;
    }

    public function getTotalByMes($tipo)
    {
        $total_haberes = array();
        $total_descuentos = array();
        $total_liquidos = array();
        $total_imponibles = array();

        $pagos = Pago::where('anio', $this->params->anio)->mes($this->params->mes)
            ->where('persona_id', $this->params->persona_id)
            ->get();
        // return $pagos;
        $mes_nombre = strtolower((new MesesService)->getNameMonth($this->params->mes));

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

    public function getPaymentItems($pagos, $tipo)
    {
        $items = array();

        $nombre_mes = strtolower((new MesesService)->getNameMonth($this->params->mes));

        if ($pagos->count() > 0) {
            foreach ($pagos as $key_mes => $pago) {
                foreach ($pago->detalles->sortByDesc('hd_id') as $key => $detalle) {

                    $hd = HaberDescuento::findOrfail($detalle->hd_id);

                    if ($hd) {
                        if ($hd->tipo == $tipo) {
                            array_push($items, [
                                "nombre" => $hd->descripcion_simple,
                                $nombre_mes => [
                                    "monto_" . $nombre_mes . ($key_mes + 1) => $detalle->monto,
                                ],
                            ]);
                        } elseif ($hd->tipo == $tipo) {
                            array_push($items, [
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
            $items[0]["nombre"] = '';
            $items[0]["monto"]["monto_" . $nombre_mes . '1'] = '0.00';
        }
        return $items;
    }

    public function orderMontoByMonth($item_array)
    {
        $mesesService = new MesesService;
        $nombre_mes = strtolower($mesesService->getNameMonth($this->params->mes));
        $meses_and_count = $mesesService->getMesesAndCount($this->params->anio, $this->params->persona_id);

        $count_items_this_month = $this->getCountItemsByMonth($meses_and_count);

        //Get names
        $only_names = $this->getNames($item_array);
        // Get count by values
        $count_names = array_count_values($only_names);
        $collect = collect($item_array);

        $duplicates = $this->getDuplicatesItem($count_names, $collect, $count_items_this_month, $nombre_mes);
        $not_duplicates = $this->getNotDuplicatesItem($count_names, $collect);

        // add monto no duplicates field 0.00
        $new_items_not_duplicates = $this->setAddMontoZeroToItemsNotDuplicates($meses_and_count, $not_duplicates, $count_items_this_month, $nombre_mes);

        // add 0.00 Duplicates
        $new_items_duplicates = $this->setAddMontoZeroToItemsDuplicates($meses_and_count, $duplicates, $count_items_this_month, $nombre_mes);

        return array_merge($new_items_duplicates, $new_items_not_duplicates);
    }

    public function setAddMontoZeroToItemsDuplicates($meses_and_count, $duplicates, $count_items_this_month, $nombre_mes)
    {
        foreach ($meses_and_count as $key => $month) {
            if ($this->params->mes === $month['numero']) {
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

        return $duplicates;
    }

    public function setAddMontoZeroToItemsNotDuplicates($meses_and_count, $not_duplicates, $count_items_this_month, $nombre_mes)
    {
        foreach ($meses_and_count as $key => $month) {
            if ($this->params->mes === $month['numero']) {
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

        return $not_duplicates;
    }

    public function getCountItemsByMonth($meses_and_count)
    {
        $count_items_this_month = 0;

        foreach ($meses_and_count as $key => $month) {
            if ($this->params->mes === $month['numero']) {
                $count_items_this_month = $month['cantidad'];
            }
        }

        return $count_items_this_month;
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
}
