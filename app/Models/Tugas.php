<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tugas extends Model
{
    use HasFactory;

    protected $fillable=[
        "judul_tugas",
        "deskripsi_tugas",
        "deadline",
        "pertemuan_id",
        "type"
    ];

    public function pertemuan(){
        return $this->belongsTo(Pertemuan::class,"pertemuan_id","id");
    }

    public function tugas_mahasiswa(){
        return $this->hasMany(TugasMahasiswa::class);
    }

    public function tugas_mahasiswa_detail(){
        return $this->hasOne(TugasMahasiswa::class);
    }
}