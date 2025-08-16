<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GolonganUkt extends Model
{
    use HasFactory;
    protected $table = "golongan_ukt";
    protected $fillable=[
        "golongan","nominal","prodi_id"
    ];

    public function prodi () {
        return $this->belongsTo(Prodi::class, "prodi_id" );
    }
}