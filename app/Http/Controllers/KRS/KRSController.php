<?php

namespace App\Http\Controllers\KRS;

use App\Http\Controllers\Controller;
use App\Models\KRS;
use App\Models\Matakuliah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KRSController extends Controller
{
    public function index (){
        $fetch_data = Matakuliah::with(['fakultas', 'dosen', 'prodi', 'kelas'])
        ->where('id_prodi', Auth::user()->id_prodi)
        ->get();        
        return Inertia::render('KRS/Mahasiswa/KrsMahasiswa',[
            'datas'=>$fetch_data
        ]);
    }

    public function detail(){
        $fetch_data = KRS::with(    
        'mata_kuliah.prodi',
        'mata_kuliah.dosen',
        'mata_kuliah.kelas',
        'mata_kuliah.fakultas')
        ->where('id_user',Auth::user()->id)
        ->get();
        return Inertia::render('KRS/Mahasiswa/KrsMahasiswaDetail',[
            'datas'=> $fetch_data
        ]);
    }
    public function store (Request $request) {        
        $user = auth()->user();

        $validation = $request->validate([
            'mata_kuliah.*.id' => 'required'
        ]);
        foreach ($validation['mata_kuliah'] as $data ){

            KRS::create([
                'id_user' => $user->id,   
                'id_mata_kuliah' => $data['id'],
            ]);
        }
    }
}