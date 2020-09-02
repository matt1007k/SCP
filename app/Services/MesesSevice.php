<?php

namespace App\Services;

use App\Models\Pago;

class MesesService
{
    public function getMeses()
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
        foreach ($this->getMeses() as $item_mes) {
            if ($mes == $item_mes['numero']) {
                $nombre = $item_mes['nombre'];
            }
        }

        return $nombre;
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
}
