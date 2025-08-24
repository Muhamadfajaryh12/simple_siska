<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SemesterAjaran extends Model
{
    use HasFactory;
    protected $table = "semester_ajaran";

    protected $fillable=[
        "semester_ajaran",
        "status"
    ];

    
}