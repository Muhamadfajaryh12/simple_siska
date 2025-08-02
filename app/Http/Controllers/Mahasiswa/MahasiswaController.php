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
        $fetch_mahasiswa = Fakultas::with("fakultas","prodi")->get();
    }
    public function create_index(){
        $fetch_fakultas = Fakultas::all();
        $fetch_prodi = Prodi::all();

        return Inertia::render('User/Mahasiswa/CreateMahasiswa',[
            'data_fakultas'=>$fetch_fakultas,
            'data_prodi'=>$fetch_prodi
        ]);
    }



    public function store(MahasiswaRequest $mahasiswaRequest){
        try{
            $validation = $mahasiswaRequest->validated();
            $mahasiswa = Mahasiswa::insert($validation);
            return redirect()->back()->with("success","Berhasil menambah mahasiswa");
        }catch(QueryException $e){
            Log::error($e->getMessage());
        }
    }

    
    public function update(MahasiswaRequest $mahasiswaRequest,$id){
        try{
            $validation = $mahasiswaRequest->validated();
            $mahasiswa = Mahasiswa::findOrFail($id);
            $mahasiswa->update($validation); 
            return redirect()->back()->with("success","Berhasil mengedit mahasiswa");
        }catch(QueryException $e){
            Log::error($e->getMessage());
        }
    }
    
    public function delete($id){
        try{
            $mahasiswa = Mahasiswa::findOrFail($id);
            $mahasiswa->delete(); 
            return redirect()->back()->with("success","Berhasil menghapus mahasiswa");
        }catch(QueryException $e){
            Log::error($e->getMessage());
        }
    }

}