<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DescuentoCreatedRequest extends FormRequest
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
            'nombre' => 'required',
            // 'codigo' => 'required|min:6|unique:haber_descuentos, codigo',
            'tipo' => 'required|string',
            'descripcion' => 'required',
            'descripcion_simple' => 'required',
        ];
    }
}
