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
        'tahun_ajaran'
    ];

    public function mahasiswa()
    {
        return $this->belongsTo(User::class, 'mahasiswa_id');
    }
}