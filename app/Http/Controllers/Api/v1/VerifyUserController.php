<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Persona;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PersonaResource;

class VerifyUserController extends Controller
{
    public function index()
    {
        return PersonaResource::collection(
            Persona::search(request('q'))
                ->take(4)
                ->get()
        );
    }
}
