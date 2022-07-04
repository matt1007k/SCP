<?php

namespace App\Imports;

use App\Imports\DescuentosImport;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\SkipsUnknownSheets;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class HaberDescuentoImport implements WithMultipleSheets, SkipsUnknownSheets, SkipsOnError
{
    use Importable;

    public function sheets(): array
    {
        return [
            'HABERES' => new DescuentosImport(),
            'DESCUENTOS' => new DescuentosImport(),
        ];
    }

    public function onUnknownSheet($sheetName)
    {
        // E.g. you can log that a sheet was not found.
        info("Hoja {$sheetName} no fue encontrada");
    }

    public function onError(\Throwable $e)
    {
        return $e;
    }
}
