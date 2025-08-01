<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Http\Requests\MahasiswaRequest;
use App\Models\Fakultas;
use App\Models\Mahasiswa;
use App\Models\Prodi;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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


    public function show(){
        
    }
    public function store(MahasiswaRequest $mahasiswaRequest){
        try{
            $validation = $mahasiswaRequest->validated();
            $mahasiswa = Mahasiswa::create($validation);
        }catch(QueryException $e){
            Log::error($e->getMessage());
        }
    }

    
    public function update(MahasiswaRequest $mahasiswaRequest){
        try{
            $validation = $mahasiswaRequest->validated();
            $mahasiswa = Mahasiswa::create($validation);
        }catch(QueryException $e){
            Log::error($e->getMessage());
        }
    }
    
    public function delete($id){
        try{
            $mahasiswa = Mahasiswa::findOrFail($id);
            $mahasiswa->delete(); 
        }catch(QueryException $e){
            Log::error($e->getMessage());
        }
    }

}