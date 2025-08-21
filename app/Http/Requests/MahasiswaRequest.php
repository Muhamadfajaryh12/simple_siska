<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MahasiswaRequest extends FormRequest
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
            "nama_mahasiswa"=>"sometimes|required",
            "nim"=>"sometimes|required",
            "jenis_kelamin"=>"sometimes|nullable",
            "alamat"=>"sometimes|nullable",
            "contact"=>"sometimes|nullable",
            "tempat_lahir" =>"sometimes|nullable",
            "tanggal_lahir"=>"sometimes|nullable",
            "angkatan"=>"sometimes|nullable",
            "fakultas_id"=>"sometimes|required",
            "prodi_id"=>"sometimes|required",   
            "user_id"=>"sometimes|nullable",
            "golongan_ukt_id"=>"sometimes|required"
        ];
    }
}