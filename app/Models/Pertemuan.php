<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pertemuan extends Model
{
    use HasFactory;
    protected $table="pertemuan";
    protected $fillable = [
        "pertemuan_ke","kelas_mata_kuliah_id","tanggal","materi"
    ];

    public function absensi(){
        return $this->hasMany(Absensi::class);
    }

    public function absensi_detail(){
        return $this->hasOne(Absensi::class);
    }
    public function kelas_mata_kuliah(){
        return $this->belongsTo(KelasMataKuliah::class, 'kelas_mata_kuliah_id', 'id');
    }

    public function tugas(){
        return $this->hasOne(Tugas::class);
    }

    public function absen_dosen(){
        return $this->hasOne(AbsenDosen::class);
    }
}