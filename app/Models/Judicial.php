<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Judicial extends Model
{
    protected $fillable = [
        'periodo',
        'b_nombre',
        'b_apellido_paterno',
        'b_apellido_materno',
        'b_dni',
        'fecha_nacimiento',
        'sexo',
        'total',
        'persona_id',
    ];
    protected $appends = ['full_name', 'fecha_nac'];
    protected $dates = ['fecha_nacimiento'];

    public function getFechaNacAttribute()
    {
        return $this->fecha_nacimiento
        ? $this->fecha_nacimiento->format('d/m/Y')
        : null;
    }

    public function getFullNameAttribute()
    {
        return "$this->b_apellido_paterno $this->b_apellido_materno, $this->b_nombre";
    }

    public function persona()
    {
        return $this->belongsTo('App\Models\Persona');
    }
}
