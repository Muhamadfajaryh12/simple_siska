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
        'sks',
        'semester',
        'id_kelas',
        'id_fakultas',
        'id_prodi',
        'id_dosen',
    ];
}