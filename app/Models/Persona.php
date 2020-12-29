<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{
    protected $fillable = [
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'dni',
        'codigo_modular',
        'cargo',
        'estado',
        'user_id',
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
    ];

    protected $appends = ['full_name', 'fecha_nac'];
    protected $dates = ['fecha_nacimiento', 'fecha_inicio', 'fecha_fin', 'fafiliacion', 'fdevengue'];

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

    public function getFullNameAttribute()
    {
        return "$this->apellido_paterno $this->apellido_materno, $this->nombre";
    }

    public function scopeSearch(Builder $query, $value)
    {
        $concat = "apellido_paterno,' ',apellido_materno,', ', nombre";

        return $query->where(function ($query) use ($concat, $value) {
            $query->where('codigo_modular', 'LIKE', '%' . $value . '%')
                ->orWhere('dni', 'LIKE', '%' . $value . '%')
                ->orWhereRaw("CONCAT($concat) LIKE '%" . $value . "%'");
        });
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function pagos()
    {
        return $this->hasMany('App\Models\Pago');
    }

    public function judiciales()
    {
        return $this->hasMany('App\Models\Judicial');
    }
}
