<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matakuliah extends Model
{
    use HasFactory;
    protected $table = 'mata_kuliah';

    protected $fillable = [
        'nama_mata_kuliah',
        'kode_mata_kuliah',
        'jadwal',
        'sks',
        'semester',
        'kelas_id',
        'prodi_id',
        'dosen_id',
    ];

    public function prodi()
    {
        return $this->belongsTo(Prodi::class, 'prodi_id');
    }
    
    public function dosen()
    {
        return $this->belongsTo(User::class, 'dosen_id');
    }
    public function kelas()
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }
    

}