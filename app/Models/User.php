<?php

namespace App\Models;

use Caffeinated\Shinobi\Concerns\HasRolesAndPermissions;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable, HasRolesAndPermissions;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'dni', 'estado',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function personas()
    {
        return $this->hasMany('App\Models\Persona');
    }

    public function haberDescuentos()
    {
        return $this->hasMany('App\Models\HaberDescuento');
    }

    public function pagos()
    {
        return $this->hasMany('App\Models\Pago');
    }

    public function scopeSearch($query, $value)
    {
        return $query->where('name', 'LIKE', "%{$value}%")
            ->orWhere('email', 'LIKE', "%{$value}%")
            ->orWhere('dni', 'LIKE', "%{$value}%");
    }

}
