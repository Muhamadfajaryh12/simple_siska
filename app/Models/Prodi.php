<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prodi extends Model
{
    use HasFactory;

    protected $table = 'prodi';

    protected $fillable = [
        'nama_prodi',
        'kode_prodi',
        'fakultas_id'
    ];

    public function fakultas(){
        return $this->belongsTo(Fakultas::class, 'fakultas_id');
    }

    public function mahasiswa(){
        return $this->hasMany(Mahasiswa::class);
    }
}