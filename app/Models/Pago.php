<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    protected $fillable = [
        'periodo',
        'total_descuento',
        'total_haber',
        'monto_liquido',
        'monto_imponible',
        'user_id',
    ];

    public function persona()
    {
        return $this->belongsTo('App\Models\Persona');
    }

    public function detalles()
    {
        return $this->hasMany('App\Models\Detalle');
    }
}