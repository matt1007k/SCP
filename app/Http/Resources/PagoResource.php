<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PagoResource extends JsonResource
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
            'id' =>  $this->id,
            'periodo' =>  $this->getPeriodo(),
            'total_haber' => $this->total_haber,
            'total_descuento' => $this->total_descuento,
            'monto_liquido' => $this->monto_liquido,
            'monto_imponible' => $this->monto_imponible,
            'link' => $this->pathBoleta(),
            'person' => PersonaResource::make($this->persona),
        ];
    }
}
