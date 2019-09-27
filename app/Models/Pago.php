<?php

namespace App\Models;

use App\Helpers\HasManyRelation;
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
    ];

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
}
