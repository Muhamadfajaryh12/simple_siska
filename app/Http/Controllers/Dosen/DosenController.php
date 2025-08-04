<?php

namespace App\Http\Controllers\Dosen;

use App\Http\Controllers\Controller;
use App\Http\Requests\DosenRequest;
use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\Prodi;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DosenController extends Controller
{

    public function index(){
        $fetch_dosen = Dosen::with("fakultas","prodi")->get();
        return Inertia::render("User/Dosen/Dosen",[
            "data"=>$fetch_dosen
        ]);
    }
    public function create_index(){
        $fetch_fakultas = Fakultas::all();
        $fetch_prodi = Prodi::all();
        return Inertia::render('User/Dosen/CreateDosen',[
            "data_fakultas"=> $fetch_fakultas,
            "data_prodi"=>$fetch_prodi
        ]);
    }

    public function update_index($id){
        $fetch_dosen = Dosen::findOrFail($id);
        $fetch_fakultas = Fakultas::all();
        $fetch_prodi = Prodi::all();
       return Inertia::render('User/Dosen/UpdateDosen',[
            "data_fakultas"=> $fetch_fakultas,
            "data_prodi"=>$fetch_prodi,
            "data_dosen"=>$fetch_dosen,
        ]);
        
    }

    public function store(Request $request){
        try{
            $data = $request->validate([
                "data"=>'required|array',
                "data.*.nama_dosen"=>"required",
                "data.*.nip"=>"required",
                'data.*.fakultas_id' => 'required',
                'data.*.prodi_id' => 'required',
            ]);
            foreach($data['data'] as $dosen){
               $user = User::create([
                    "email"=>$dosen['nip'].'@gmail.com',
                    "password"=>Hash::make($dosen['nip']),
                    "role"=>"Dosen"
                ]);

                Dosen::create([
                    "nama_dosen"=>$dosen['nama_dosen'],
                    "nip"=>$dosen['nip'],
                    'fakultas_id' => $dosen['fakultas_id'],
                    'prodi_id' => $dosen['prodi_id'],
                    "user_id"=>$user->id
                ]);

            }
            return redirect()->back()->with("success","Berhasil menambahkan dosen");
        }catch(QueryException $e){
            return redirect()->back()->with("error",$e->getMessage());
        }
    }

    public function edit(DosenRequest $dosenRequest,$id){
        try{
            $validation = $dosenRequest->validated();
            $dosen = Dosen::findOrFail($id);
            $dosen->update($validation);
            return redirect()->back()->with("success","Berhasil mengedit dosen");
        }catch(QueryException $e){
         return redirect()->back()->with("error",$e->getMessage());
        }
    }

       public function delete($id){
        try{
            $dosen = Dosen::findOrFail($id);
            User::where('id', $dosen->user_id)->delete();
            $dosen->delete(); 
            return redirect()->back()->with("success","Berhasil menghapus dosen");
        }catch(QueryException $e){
            Log::error($e->getMessage());
        }
    }
}