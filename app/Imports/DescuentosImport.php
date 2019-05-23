<?php

namespace App\Imports;

use App\Models\HaberDescuento;
use Auth;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class DescuentosImport implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new HaberDescuento([
            'codigo' => "H0" . $row['codigo'],
            'tipo' => $row['codigo'],
            'nombre' => $row['concepto'],
            'descripcion' => $row['det1'],
            'descripcion_simple' => $row['det2'],
            'user_id' => Auth::user()->id,
        ]);
    }
}