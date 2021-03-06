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
        if ($row[self::FIELDS_EXCEL['nombre']] == null ||
            $row[self::FIELDS_EXCEL['apellido_paterno']] == null ||
            $row[self::FIELDS_EXCEL['apellido_materno']] == null) {
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
