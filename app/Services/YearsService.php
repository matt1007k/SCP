<?php
namespace App\Services;

class YearsService
{
    protected $mesesServices;
    protected $params;

    public function __construct(Object $params)
    {
        $this->params = $params;
        $this->mesesServices = new MesesService;
    }

    public function getAllDetailsByType($tipo)
    {
        $monto_by_year = [];
        foreach ($this->mesesServices->getMeses() as $mes) {
            $monto_by_year = [...$monto_by_year, ...(new ReportService((object) array_merge((array) $this->params, ['mes' => $mes['numero']])))->getDetalleByMes($tipo)];
        }
        $orderMontoByYear = $this->orderMontoByYear($monto_by_year);
        return $orderMontoByYear;
    }

    public function orderMontoByYear($item_array)
    {
        // return $item_array;
        $meses_and_count = $this->mesesServices->getMesesAndCount($this->params->anio, $this->params->persona_id);
        $new_duplicates = [];
        //Get names
        $only_names = (new ReportService($this->params))->getNames($item_array);
        // Get count by values
        $count_names = array_count_values($only_names);
        $collect = collect($item_array);

        $duplicates = $this->getDuplicatesItemByYear($count_names, $collect, $meses_and_count);
        $new_duplicates = $this->addZeroDuplicatesByYear($meses_and_count, $duplicates);

        $not_duplicates = (new ReportService($this->params))->getNotDuplicatesItem($count_names, $collect);
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

    public function getTotalByYear($tipo)
    {
        $total = [];
        foreach ($this->mesesServices->getMeses() as $mes) {
            $total = [...$total, ...(new ReportService((object) array_merge((array) $this->params, ['mes' => $mes['numero']])))->getTotalByMes($tipo)];
        }

        return $total;
    }

    public function getYearsUnique($pago_years)
    {
        $years_exist = array();
        $years_exist_unique = array();

        foreach ($pago_years as $key => $value) {
            array_push($years_exist, ['anio' => $value['anio']]);
        }

        $pagos_unique_year = $this->unique_multidim_array($years_exist, 'anio');
        foreach ($pagos_unique_year as $key => $value) {
            array_push($years_exist_unique, ['anio' => $value['anio']]);
        }

        return $years_exist_unique;
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
}
