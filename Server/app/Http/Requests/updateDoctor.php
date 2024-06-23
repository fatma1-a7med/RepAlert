<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class updateDoctor extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'state' => 'sometimes|string|max:255',
            'city' => 'sometimes|string|max:255',
            'street' => 'sometimes|string|max:255',
            'phone_number' => 'sometimes|integer',
            'territory' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255',
            'specialization' => 'sometimes|string|max:225',
            'class_rate' => 'nullable|string|in:A,B,C',

        ];
    }
}
