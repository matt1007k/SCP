<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use PDO;

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
        'fecha_inicio', 
        'fecha_fin', 
        'numero_cuenta', 
        'leyenda_permanente', 
        'leyenda_mensual', 
        'codigo_afp', 
        'fafiliacion', 
        'fdevengue', 
        'cvariable', 
        'cfija', 
        'seguro', 
        'codigo_establecimiento', 
        'numero_cargo', 
        'situacion', 
    ];

    protected $appends = ['full_name'];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function pagos()
    {
        return $this->hasMany('App\Models\Pago');
    }

    public function getFullNameAttribute()
    {
        return "$this->apellido_paterno $this->apellido_materno, $this->nombre";
    }

    public function scopeSearch(Builder $query)
    {
        $concat = "apellido_paterno,' ',apellido_materno,', ', nombre";

        return $query->where(function ($query) use ($concat) {
            $query->where('codigo_modular', 'LIKE', '%' . request('q') . '%')
                ->orWhere('dni', 'LIKE', '%' . request('q') . '%')
                ->orWhereRaw("CONCAT($concat) LIKE '%" . request('q') . "%'");
        });
    }
}
