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
}