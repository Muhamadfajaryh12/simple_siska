<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KrsDetail extends Model
{
    use HasFactory;
    protected $table ="krs_detail";
    protected $fillable = [
        "krs_id",
        "kelas_mata_kuliah_id"
    ];

    public function kelas_mata_kuliah(){
        return $this->belongsTo(KelasMataKuliah::class, 'kelas_mata_kuliah_id', 'id');
    }

    public function krs(){
        return $this->belongsTo(KRS::class,"krs_id","id");
    }

}