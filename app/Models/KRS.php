<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KRS extends Model
{
    use HasFactory;
    protected $table = 'krs';

    protected $fillable = [
        'mahasiswa_id',
        'status',
        'semester',
        'tahun_ajaran',
        'total_sks',
    ];

    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'mahasiswa_id');
    }

    
    


}