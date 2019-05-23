<?php

namespace App\Models;

// use Caffeinated\Shinobi\Traits\ShinobiTrait;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'dni',
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
        return $this->hasMany('App\Persona');
    }

    public function haberDescuentos()
    {
        return $this->hasMany('App\HaberDescuento');
    }

    public function pagos()
    {
        return $this->hasMany('App\Pago');
    }

}