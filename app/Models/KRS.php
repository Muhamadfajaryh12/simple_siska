<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KRS extends Model
{
    use HasFactory;
    protected $table = 'krs';

    protected $fillable = [
        'id_mata_kuliah',
        'id_user',
        'nilai_angka',
        'nilai_huruf',
        'status_verfied'
    ];

    public function mata_kuliah(){
        return $this->belongsTo(Matakuliah::class,'id_mata_kuliah');
    }
    public function mahasiswa()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}