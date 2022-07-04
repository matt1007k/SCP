<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PagoCreatedRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'persona_id' => 'required',
            'mes' => 'required',
            'anio' => 'required',
            'total_haber' => 'required',
            'total_descuento' => 'required',
            'monto_liquido' => 'required',
            'monto_imponible' => 'required',
            'haberes' => 'required',
            'descuentos' => 'required',
        ];
    }
}
