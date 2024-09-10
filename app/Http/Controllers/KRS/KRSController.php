<?php

namespace App\Http\Controllers\KRS;

use App\Http\Controllers\Controller;
use App\Models\Matakuliah;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KRSController extends Controller
{
    public function index (){
        $fetch_data = Matakuliah::with(['fakultas','dosen','prodi','kelas'])->get();
        return Inertia::render('KRS/Mahasiswa/KrsMahasiswa',[
            'data'=>$fetch_data
        ]);
    }
}