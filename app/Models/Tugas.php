<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tugas extends Model
{
    use HasFactory;

    protected $fillable=[
        "judul_tugas",
        "deskripsi_tugas",
        "deadline",
        "pertemuan_id"
    ];

    public function pertemuan(){
        return $this->belongsTo(Pertemuan::class,"pertemuan_id","id");
    }
}