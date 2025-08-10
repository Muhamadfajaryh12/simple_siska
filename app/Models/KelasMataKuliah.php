<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KelasMataKuliah extends Model
{
    use HasFactory;
    protected $table="kelas_mata_kuliah";
    protected $fillable=[
        "nama_kelas","jadwal",
        "jam_mulai","jam_selesai",
        "tahun_ajaran","dosen_id",
        "mata_kuliah_id"
    ];

    public function dosen(){
        return $this->belongsTo(Dosen::class,"dosen_id","id");
    }
    public function mata_kuliah(){
        return $this->belongsTo(Matakuliah::class,"mata_kuliah_id","id");
    }
}