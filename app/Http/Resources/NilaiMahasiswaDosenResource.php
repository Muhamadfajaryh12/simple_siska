<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NilaiMahasiswaDosenResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
   
            return [
                "nama_mahasiswa"=>$this->krs->mahasiswa->nama_mahasiswa ?? null ,
                "nim"=>$this->krs->mahasiswa->nim ?? null,
                "absen"=>$this->absen??0,
                "tugas"=>$this->tugas??0,
                "uts"=>$this->uts??0,
                "uas"=>$this->uas??0,
                "nilai_total"=>$this->nilai_total??0
            ];
        
    }
}