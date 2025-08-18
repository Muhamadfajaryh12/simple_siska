<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TugasMahasiswa extends Model
{
    use HasFactory;

    protected $table="tugas_mahasiswa";

    protected $fillable=[
        "tugas_id",
        "mahasiswa_id",
        "status",
        "nilai",
        "submit_date",
        "file_pengumpulan"
    ];

    public function tugas(){
        return $this->belongsTo(Tugas::class,"tugas_id","id");
    }

    public function mahasiswa(){
        return $this->belongsTo(Mahasiswa::class,"mahasiswa_id","id");
    }
}