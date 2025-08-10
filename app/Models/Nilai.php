<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nilai extends Model
{
    use HasFactory;
    protected $table = "nilai";
    protected $fillable = [
        "nilai_huruf","nilai_angka","krs_detail_id"
    ];
    
}