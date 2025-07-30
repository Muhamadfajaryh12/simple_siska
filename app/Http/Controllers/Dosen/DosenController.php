<?php

namespace App\Http\Controllers\Dosen;

use App\Http\Controllers\Controller;
use App\Models\Fakultas;
use App\Models\Prodi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DosenController extends Controller
{
    public function create_index(){
        $fetch_fakultas = Fakultas::all();
        $fetch_prodi = Prodi::all();
        return Inertia::render('User/Dosen/CreateDosen',[
            "data_fakultas"=> $fetch_fakultas,
            "data_prodi"=>$fetch_prodi
        ]);
    }
}