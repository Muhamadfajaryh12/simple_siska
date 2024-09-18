<?php

namespace App\Http\Controllers\Kelas;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasController extends Controller
{
    public function index(){
        $fetch_data  = Kelas::all();
        return Inertia::render('Kelas/Kelas',[
            'data_kelas'=> $fetch_data
        ]);
    }
    public function create (){
        return Inertia::render('Kelas/FormCreateKelas');
    }

    public function store(Request $request){
        $validation_kelas = $request->validate([
            'nama_kelas' => 'required|string'
        ]);

        Kelas::create($validation_kelas);
    }
}