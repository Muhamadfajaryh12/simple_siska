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
            "nama_mahasiswa"=>"required",
            "nim"=>"required",
            "jenis_kelamin"=>"nullable",
            "alamat"=>"nullable",
            "contact"=>"nullable",
            "tempat_lahir" =>"nullable",
            "tanggal_lahir"=>"nullable",
            "angkatan"=>"nullable",
            "fakultas_id"=>"required",
            "prodi_id"=>"required",   
            "user_id"=>"nullable",
            "golongan_ukt_id"=>"required"
        ];
    }
}