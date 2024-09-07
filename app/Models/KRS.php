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
    ];
}