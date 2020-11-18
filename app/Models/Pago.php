<?php

namespace App\Models;

use App\Helpers\HasManyRelation;
use App\Services\EncryptService;
use App\Services\MesesService;
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
        'persona_id',
        'cvariable', 
        'cfija', 
        'seguro', 
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

    public function getPeriodo()
    {
        $mesesService = new MesesService;

        foreach ($mesesService->getMeses() as $mes) {
            if ($mes['numero'] === $this->mes) {
                return "{$mes['nombre']} {$this->anio}";
            }
            // return $mes['numero'];
        }
    }

    public function pathBoleta()
    {
        $string = "{\"anio\":\"$this->anio\",\"mes\":\"$this->mes\",\"persona_id\":{$this->persona_id},\"certificado\":\"\",\"ver\":0}";
        $url_decode = (new EncryptService($string))->getEncrypt();
        return route('admin.reporte.bymesapi', $url_decode);
    }
}
