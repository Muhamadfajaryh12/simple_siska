<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MataKuliahRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
        'nama_mata_kuliah'=>"required",
        'kode_mata_kuliah'=>"required",
        'jadwal'=>"required",
        'sks'=>"required",
        'semester'=>"required",
        'kelas_id'=>"required",
        'prodi_id'=>"required",
        'dosen_id'=>"required",
        ];
    }
}