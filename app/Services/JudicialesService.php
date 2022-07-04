<?php
namespace App\Services;

use App\Models\Judicial;
use App\Services\DateTimeService;

class JudicialesService
{
    protected $dateTimeServive;

    public function __construct()
    {
        $this->dateTimeServive = new DateTimeService();
    }

    public const FIELDS_EXCEL = [
        'periodo' => 'periodo',
        'nombre' => 'bas_nombres',
        'apellido_paterno' => 'bas_apepaterno',
        'apellido_materno' => 'bas_apematerno',
        'dni' => 'bas_numlibele',
        'codigo_modular' => 'cgf_rutempleado',
        'b_nombre' => 'cgf_glsnombres',
        'b_apellido_paterno' => 'cgf_apepaterno',
        'b_apellido_materno' => 'cgf_apematerno',
        'b_dni' => 'cgf_numlibele',
        'fecha_nacimiento' => 'cgf_fecnacimiento',
        'sexo' => 'cgf_flgsexo',
        'total' => 'lgf_totliqpago',
    ];

    public function create($persona, $personaDB): Judicial
    {
        return Judicial::create(
            array_merge(
                $this->getFields($persona),
                [
                    'persona_id' => $personaDB->id,
                ]
            ));
    }

    public function getFields($persona)
    {
        return [
            'periodo' => $persona[self::FIELDS_EXCEL['periodo']],
            'b_nombre' => $persona[self::FIELDS_EXCEL['b_nombre']],
            'b_apellido_paterno' => $persona[self::FIELDS_EXCEL['b_apellido_paterno']],
            'b_apellido_materno' => $persona[self::FIELDS_EXCEL['b_apellido_materno']],
            'b_dni' => $persona[self::FIELDS_EXCEL['b_dni']],
            'sexo' => $this->getGender((int) $persona[self::FIELDS_EXCEL['sexo']]),
            'fecha_nacimiento' => $this->dateTimeServive->convertIntToDate($persona[self::FIELDS_EXCEL['fecha_nacimiento']]),
            'total' => $persona[self::FIELDS_EXCEL['total']],
        ];
    }

    public function getGender(int $id): string
    {
        $gender = "Masculino";
        if ($id == 1) {
            return $gender = 'Femenino';
        }
        return $gender;
    }

    public function validateRowExcel($row)
    {
        if ($row[self::FIELDS_EXCEL['nombre']] == null ||
            $row[self::FIELDS_EXCEL['apellido_paterno']] == null ||
            $row[self::FIELDS_EXCEL['apellido_materno']] == null) {
            return response()->json([
                'import' => true,
                'msg' => 'El archivo excel no tiene datos.',
            ], 200);
        }
    }
}
