<?php

namespace App\Imports;

use App\Models\Persona;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithBatchInserts;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class UpdateDataPersonas implements ToModel, WithHeadingRow, WithBatchInserts, WithChunkReading
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Persona([
            'nombre' => $row['nombres'],
            'apellido_paterno' => $row['apepat'],
            'apellido_materno' => $row['apemat'],
            'dni' => $row['dni'],
            'codigo_modular' => $row['codmod'],
            'cargo' => $row['cargo'],
            'fecha_nacimiento' => $row['fec_nac'],
            'establecimiento' => $row['institucion_educativa'],
            'tipo_servidor' => $row['tipo'],
            'nivel_magisterial' => $row['nivmag'],
            'grupo_ocupacion' => $row['cae_grado'],
            'horas' => $row['horas'],
            'fecha_inicio' => $row['inicio'],
            'fecha_fin' => $row['fin'],
            'numero_cuenta' => $row['cuenta'],
            'leyenda_permanente' => $row['leyenda'],
            'leyenda_mensual' => $row['leymes'],
            'codigo_afp' => $row['cod_afp'],
            'fafiliacion' => $row['fafiliacion'],
            'fdevengue' => $row['fdevengue'],
            'cvariable' => $row['cvariable'],
            'cfija' => $row['cfija'],
            'seguro' => $row['rlq_mtoseguro'],
            'codigo_establecimiento' => $row['cae_codunidad'],
            'numero_cargo' => $row['cae_numcarg'],
            'situacion' => $row['cae_situacion'],
        ]);
    }

    public function batchSize(): int
    {
        return 100;
    }

    public function chunkSize(): int
    {
        return 500;
    }
}
