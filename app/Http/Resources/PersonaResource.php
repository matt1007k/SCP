<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PersonaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'full_name' => $this->FullName,
            'dni' => $this->dni,
            'modular_code' => $this->codigo_modular,
            'status' => $this->estado,
        ];
    }
}
