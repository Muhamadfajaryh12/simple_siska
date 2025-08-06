<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    use HasFactory;
    protected $table = "mahasiswa";
    protected $fillable =[
        "nama_mahasiswa",
        "contact",
        "nim",
        "tempat_lahir",
        "tanggal_lahir",
        "alamat",
        "jenis_kelamin",
        "angkatan",
        "fakultas_id",
        "prodi_id",
        "kelas_id",
        "user_id",
    ];

    public function fakultas(){
        return  $this->belongsTo(Fakultas::class,"fakultas_id");
    }

    public function prodi(){
        return $this->belongsTo(Prodi::class,"prodi_id");
    }

}