<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Historial extends Model
{
    protected $fillable = ['anio', 'meses', 'dni', 'tipo', 'certificado'];

    protected $table = 'historiales';
}
