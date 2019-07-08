<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Detalle extends Model
{
    protected $fillable = ['monto'];

    public function pago()
    {
        return $this->belongsTo('App\Models\Pago');
    }

    public function haber_descuento()
    {
        return $this->belongsTo('App\Models\HaberDescuento', 'hd_id', 'id');
    }
}
