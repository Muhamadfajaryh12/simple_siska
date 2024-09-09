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
        'jadwal',
        'jam_mulai',
        'jam_selesai',
        'sks',
        'semester',
        'id_kelas',
        'id_fakultas',
        'id_prodi',
        'id_dosen',
    ];

    public function prodi()
    {
        return $this->belongsTo(Prodi::class, 'id_prodi');
    }
    
    public function dosen()
    {
        return $this->belongsTo(User::class, 'id_dosen');
    }
    public function kelas()
    {
        return $this->belongsTo(Kelas::class, 'id_kelas');
    }
    
    public function fakultas()
    {
        return $this->belongsTo(Fakultas::class, 'id_fakultas');
    }
}