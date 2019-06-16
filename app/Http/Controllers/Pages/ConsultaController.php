<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;

class ConsultaController extends Controller
{
    public function __construct()
    {

    }

    public function consulta()
    {
        return view('pages.consulta');
    }
}
