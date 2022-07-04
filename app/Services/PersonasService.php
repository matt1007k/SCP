<?php

namespace App\Services;

use App\Models\Persona;
use Illuminate\Support\Facades\Auth;

class PersonasService
{
    protected $datetimeService;
    protected $importElementsService;
    protected $estado = '';

    public function __construct()
    {
        $this->datetimeService = new DateTimeService();
        $this->importElementsService = new ImportElementsService();
    }

    public const FIELDS_EXCEL = [
        'nombre' => 'nombres',
        'apellido_paterno' => 'apepat',
        'apellido_materno' => 'apemat',
        'dni' => 'dni',
        'codigo_modular' => 'codmod',
        'cargo' => 'cargo',
        
    ];

    public function createPersona($row): Persona
    {
        $persona = Persona::create($this->getItemPersona($row));

        return $persona;
    }

    public function updatePersona(Persona $persona, $row): Persona
    {
        $persona->update($this->getItemPersona($row));

        return $persona;
    }

    public function getItemPersona($row): array
    {
        return [
            'nombre' => $row[self::FIELDS_EXCEL['nombre']],
            'apellido_paterno' => $row[self::FIELDS_EXCEL['apellido_paterno']],
            'apellido_materno' => $row[self::FIELDS_EXCEL['apellido_materno']],
            'dni' => $row[self::FIELDS_EXCEL['dni']],
            'user_id' => Auth::id(),
            'codigo_modular' => $row[self::FIELDS_EXCEL['codigo_modular']],
            'cargo' => $row[self::FIELDS_EXCEL['cargo']],
            'estado' => $this->estado,
            /* DETALLES DE BOLETA */

        ];
    }

    public function getEstado($estadoExcelNombre)
    {
        if ($estadoExcelNombre == 'A') {
            $this->estado = 'activo';
            return $this->estado;
        } elseif ($estadoExcelNombre == 'C') {
            $this->estado = 'cesante';
            return $this->estado;
        } elseif ($estadoExcelNombre == 'S') {
            $this->estado = 'sobreviviente';
            return $this->estado;
        } else {
            return $this->estado;
        }
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

    public function validateRowExcel($row)
    {
        if (
            $row[self::FIELDS_EXCEL['nombre']] == null ||
            $row[self::FIELDS_EXCEL['apellido_paterno']] == null ||
            $row[self::FIELDS_EXCEL['apellido_materno']] == null
        ) {
            return response()->json([
                'import' => true,
                'msg' => 'El archivo excel no tiene datos.',
            ], 200);
        }
    }

    public function getFileNameElements($filename)
    {
        $anio = substr($filename, 0, 4);
        $mes_estado = substr($filename, -3);
        $mes_numero = substr($mes_estado, 0, 2);

        return [$anio, $mes_numero];
    }
}
