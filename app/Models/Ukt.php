<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ukt extends Model
{
    use HasFactory;
    protected $fillable = [
        "mahasiswa_id",
        "status",
        "tanggal_pembayaran",
        "nominal_pembayaran",
        "semester"
    ];
    public function mahasiswa(){
        return $this->belongsTo(Mahasiswa::class,"mahasiswa_id","id");
    }
    
}