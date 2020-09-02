<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use PDO;

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

    public function scopeSearch(Builder $query)
    {
        $concat = "apellido_paterno,' ',apellido_materno,', ', nombre";

        return $query->where(function ($query) use ($concat) {
            $query->where('codigo_modular', 'LIKE', '%' . request('q') . '%')
                ->orWhere('dni', 'LIKE', '%' . request('q') . '%')
                ->orWhereRaw("CONCAT($concat) LIKE '%" . request('q') . "%'");
        });
    }
}
