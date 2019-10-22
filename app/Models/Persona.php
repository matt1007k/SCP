<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{
    protected $fillable = [
        'nombre',
        'apellidoPaterno',
        'apellidoMaterno',
        'dni',
        'codmodular',
        'estado',
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
}
