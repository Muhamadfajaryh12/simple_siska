<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\Fakultas;
use App\Models\Prodi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MahasiswaController extends Controller
{
    public function index(){
        
    }
    public function create_index(){
        $fetch_fakultas = Fakultas::all();
        $fetch_prodi = Prodi::all();

        return Inertia::render('User/Mahasiswa/CreateMahasiswa',[
            'data_fakultas'=>$fetch_fakultas,
            'data_prodi'=>$fetch_prodi
        ]);
    }

}