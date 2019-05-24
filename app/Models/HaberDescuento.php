<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HaberDescuento extends Model
{
    protected $table = 'haber_descuentos';
    protected $fillable = [
        'codigo', 'tipo', 'nombre', 'descripcion', 'descripcion_simple', 'user_id',
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}