<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ukt extends Model
{
    use HasFactory;

    protected $table="ukt";
    protected $fillable = [
        "mahasiswa_id",
        "status",
        "tanggal_pembayaran",
        "nominal_pembayaran",
        "semester_ajaran_id"
    ];
    public function mahasiswa(){
        return $this->belongsTo(Mahasiswa::class,"mahasiswa_id","id");
    }
    
    public function semester_ajaran(){
        return $this->belongsTo(SemesterAjaran::class,"semester_ajaran_id","id");
    }
    
}