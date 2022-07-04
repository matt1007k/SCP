<?php

namespace App\Models;

use App\Helpers\HasManyRelation;
use App\Services\EncryptService;
use App\Services\MesesService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    use HasManyRelation;

    protected $fillable = [
        'anio',
        'mes',
        'total_descuento',
        'total_haber',
        'monto_liquido',
        'monto_imponible',
        'user_id',
        'persona_id',
        'cvariable',
        'cfija',
        'seguro',
        /* BOLETAS */
        'fecha_nacimiento',
        'establecimiento',
        'tipo_servidor',
        'regimen_laboral',
        'nivel_magisterial',
        'grupo_ocupacion',
        'horas',
        'tiempo_servicio',
        'fecha_inicio',
        'fecha_fin',
        'numero_cuenta',
        'leyenda_permanente',
        'leyenda_mensual',
        'codigo_fiscal',
        'codigo_essalud',
        'afp_boleta',
        'codigo_afp',
        'fafiliacion',
        'fdevengue',
        'codigo_establecimiento',
        'numero_cargo',
        'situacion',
        'tipo_pension',
    ];
    protected $dates = ['fecha_nacimiento', 'fecha_inicio', 'fecha_fin', 'fafiliacion', 'fdevengue'];


    public function persona()
    {
        return $this->belongsTo('App\Models\Persona');
    }

    public function sobreviviente()
    {
        return $this->belongsTo('App\Models\Sobreviviente');
    }

    public function detalles()
    {
        return $this->hasMany('App\Models\Detalle');
    }

    public function scopeMes($query, $mes)
    {
        return $query->where('mes', $mes);
    }

    public function getFechaNacAttribute()
    {
        return $this->fecha_nacimiento
            ? $this->fecha_nacimiento->format('d/m/Y')
            : null;
    }
    public function getFechaInAttribute()
    {
        return $this->fecha_inicio
            ? $this->fecha_inicio->format('d/m/Y')
            : null;
    }

    public function getFechaFiAttribute()
    {
        return $this->fecha_fin
            ? $this->fecha_fin->format('d/m/Y')
            : null;
    }

    public function getFAfilAttribute()
    {
        return $this->fafiliacion
            ? $this->fafiliacion->format('d/m/Y')
            : null;
    }

    public function getFDevAttribute()
    {
        return $this->fdevengue
            ? $this->fdevengue->format('d/m/Y')
            : null;
    }

    public function scopeSearch(Builder $query, $value)
    {
        $concat = "apellido_paterno,' ',apellido_materno,', ', nombre";
        return $query
            ->whereHas('persona', function ($q) use ($value, $concat) {
                $q->where('codigo_modular', 'LIKE', '%' . $value . '%')
                    ->orWhere('dni', 'LIKE', '%' . $value . '%')
                    ->orWhereRaw("CONCAT($concat) LIKE '%" . $value . "%'");
            })
            ->orWhere('anio', 'LIKE', "%{$value}%")
            ->orWhere('mes', 'LIKE', "%{$value}%");
    }

    public function getPeriodo()
    {
        $mesesService = new MesesService;

        foreach ($mesesService->getMeses() as $mes) {
            if ($mes['numero'] === $this->mes) {
                return "{$mes['nombre']} {$this->anio}";
            }
            // return $mes['numero'];
        }
    }

    public function pathBoleta()
    {
        $string = "{\"anio\":\"$this->anio\",\"mes\":\"$this->mes\",\"persona_id\":{$this->persona_id},\"certificado\":\"\",\"ver\":0}";
        $url_decode = (new EncryptService($string))->getEncrypt();
        return route('admin.reporte.bymesapi', $url_decode);
    }
}
