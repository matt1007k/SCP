<?php

namespace App\Historial;

use Illuminate\Database\Eloquent\Model;

class Historial extends Model
{
    protected $fillable = ['anio', 'meses', 'dni', 'certificado'];

    protected $table = 'historiales';
}
