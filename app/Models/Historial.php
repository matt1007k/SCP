<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Historial extends Model
{
    protected $fillable = ['anio', 'meses', 'dni', 'tipo', 'certificado', 'dni_user', 'estado', 'persona_id'];

    protected $table = 'historiales';

    public function scopeSearch(Builder $query, $value)
    {
        return $query->where('anio', 'LIKE', "%{$value}%")
            ->orWhere('meses', 'LIKE', "%{$value}%")
            ->orWhere('dni', 'LIKE', "%{$value}%")
            ->orWhere('tipo', 'LIKE', "%{$value}%")
            ->orWhere('certificado', 'LIKE', "%{$value}%")
            ->orWhere('dni_user', 'LIKE', "%{$value}%");
    }
}
