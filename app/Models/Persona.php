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

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function pagos()
    {
        return $this->hasMany('App\Pago');
    }
}