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
        "semester",
        "fakultas_id",
        "prodi_id",
        "kelas_id",
        "golongan_ukt_id",
        "user_id",
    ];

    public function fakultas(){
        return  $this->belongsTo(Fakultas::class,"fakultas_id");
    }

    public function prodi(){
        return $this->belongsTo(Prodi::class,"prodi_id");
    }

    public function kelas(){
        return $this->belongsTo(Kelas::class,"kelas_id","id");
    }

    public function golongan_ukt(){
        return $this->belongsTo(GolonganUkt::class,"golongan_ukt_id","id");
    }

    public function krs(){
        return $this->hasMany(Krs::class);
    }
}