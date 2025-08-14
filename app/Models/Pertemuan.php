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
}