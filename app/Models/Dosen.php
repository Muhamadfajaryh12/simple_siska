<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dosen extends Model
{
    use HasFactory;

    protected $table = "dosen";
    protected $fillable = [
    "nama_dosen",
    "nip",
    "fakultas_id",
    "prodi_id",
    "user_id"  
    ];
}