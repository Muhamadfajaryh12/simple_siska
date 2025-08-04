<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Http\Requests\MahasiswaRequest;
use App\Models\Fakultas;
use App\Models\Mahasiswa;
use App\Models\Prodi;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MahasiswaController extends Controller
{
    public function index(){
        $fetch_mahasiswa = Mahasiswa::with("fakultas","prodi")->get();
        return Inertia::render('User/Mahasiswa/Mahasiswa',[
            "data"=>$fetch_mahasiswa
        ]);
    }
    public function create_index(){
        $fetch_fakultas = Fakultas::all();
        $fetch_prodi = Prodi::all();

        return Inertia::render('User/Mahasiswa/CreateMahasiswa',[
            'data_fakultas'=>$fetch_fakultas,
            'data_prodi'=>$fetch_prodi
        ]);
    }


    public function update_index($id){
        $fetch_fakultas = Fakultas::all();
        $fetch_prodi = Prodi::all();
        $fetch_mahasiswa = Mahasiswa::findOrFail($id);

        return Inertia::render('User/Mahasiswa/UpdateMahasiswa',[
            'data_fakultas'=>$fetch_fakultas,
            'data_prodi'=>$fetch_prodi,
            'data_mahasiswa'=>$fetch_mahasiswa
        ]);
    }

    public function store(Request $request){
        try{
            $data = $request->validate([
                'data' => 'required|array',
                'data.*.nama_mahasiswa' => 'required',
                'data.*.nim' => 'required',
                'data.*.fakultas_id' => 'required',
                'data.*.prodi_id' => 'required',
                'data.*.angkatan' => 'required',
            ]);

            foreach($data['data'] as $mahasiswa){
               $user = User::create([
                    "email"=>$mahasiswa['nim'].'@gmail.com',
                    "password"=>Hash::make($mahasiswa['nim']),
                    "role"=>"Mahasiswa"
                ]);

                  Mahasiswa::create([
                    'user_id' => $user->id,
                    'nama_mahasiswa' => $mahasiswa['nama_mahasiswa'],
                    'nim' => $mahasiswa['nim'],
                    'fakultas_id' => $mahasiswa['fakultas_id'],
                    'prodi_id' => $mahasiswa['prodi_id'],
                    'angkatan' => $mahasiswa['angkatan'],
                ]);
            }
            return redirect()->back()->with("success","Berhasil menambah mahasiswa");
        }catch(QueryException $e){
            Log::error($e->getMessage());
        }
    }

    
    public function edit(MahasiswaRequest $mahasiswaRequest,$id){
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
            User::where('id', $mahasiswa->user_id)->delete();
            $mahasiswa->delete(); 
            return redirect()->back()->with("success","Berhasil menghapus mahasiswa");
        }catch(QueryException $e){
            Log::error($e->getMessage());
        }
    }

}