<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    use HasFactory;

    protected $table = "kelas";
    protected $fillable = [
        "kelas",
        "angkatan",
        "dosen_id",
        "prodi_id",
    ];

    public function dosen(){
       return $this->belongsTo(Dosen::class,"dosen_id");
    }

    public function prodi(){
        return $this->belongsTo(Prodi::class,"prodi_id");
    }

    public function mahasiswa(){
        return $this->hasMany(Mahasiswa::class);
    }
}