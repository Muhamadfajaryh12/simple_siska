<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Http\Requests\MahasiswaRequest;
use App\Models\Fakultas;
use App\Models\GolonganUkt;
use App\Models\Mahasiswa;
use App\Models\Prodi;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MahasiswaController extends Controller
{
    public function index(){
        $fetch_mahasiswa = Mahasiswa::with("fakultas","prodi")->get();
        $fetch_prodi = Prodi::all();
        $fetch_fakultas = Fakultas::all();
        return Inertia::render('User/Mahasiswa/Mahasiswa',[
            "data"=>$fetch_mahasiswa,
            "data_prodi"=>$fetch_prodi,
            "data_fakultas"=>$fetch_fakultas
        ]);
    }
    public function create_index(){
        $fetch_fakultas = Fakultas::all();
        $fetch_prodi = Prodi::all();
        $fetch_golongan_ukt = GolonganUkt::with('prodi')->get();
        return Inertia::render('User/Mahasiswa/CreateMahasiswa',[
            'data_fakultas'=>$fetch_fakultas,
            'data_prodi'=>$fetch_prodi,
            'data_golongan_ukt'=>$fetch_golongan_ukt
        ]);
    }

    public function profile_index(){
        try{
            $fetch_mahasiswa = Mahasiswa::with(["fakultas","prodi","golongan_ukt"])->findOrFail(Auth::user()->mahasiswa->id);
            return Inertia::render("Profile/Profile",[
                "data_mahasiswa"=>$fetch_mahasiswa
            ]);
        }catch(\Exception $e){
            return redirect()->back()->with("error",$e->getMessage());
        }
    }

    public function update_index($id){
        $fetch_fakultas = Fakultas::all();
        $fetch_prodi = Prodi::all();
        $fetch_mahasiswa = Mahasiswa::findOrFail($id);
        $fetch_golongan_ukt = GolonganUkt::with('prodi')->get();

        return Inertia::render('User/Mahasiswa/UpdateMahasiswa',[
            'data_fakultas'=>$fetch_fakultas,
            'data_prodi'=>$fetch_prodi,
            'data_mahasiswa'=>$fetch_mahasiswa,
            'data_golongan_ukt'=>$fetch_golongan_ukt
        ]);
    }

    public function store(Request $request){
        try{
            $data = $request->validate([
                'data_mahasiswa' => 'required|array',
                'data_mahasiswa.*.nama_mahasiswa' => 'required',
                'data_mahasiswa.*.nim' => 'required',
                'data_mahasiswa.*.fakultas_id' => 'required',
                'data_mahasiswa.*.prodi_id' => 'required',
                'data_mahasiswa.*.angkatan' => 'required',
                'data_mahasiswa.*.golongan_ukt_id'=>"required",
            ]);

  

            foreach($data['data_mahasiswa'] as $mahasiswa){
              $prefix = substr($mahasiswa['nim'], 0, 8); 
                $last_mahasiswa = Mahasiswa::where('nim','like',$prefix.'%')
                ->orderBy('nim','desc')
                ->first();
                
                $last_number = $last_mahasiswa ? intval(substr($last_mahasiswa->nim, -4)) : 0;
                $new_number = str_pad($last_number + 1, 4, '0', STR_PAD_LEFT);
                $new_nim = $mahasiswa['nim'] . $new_number;
                
               $user = User::create([
                    "email"=>$new_nim.'@gmail.com',
                    "password"=>Hash::make($new_nim),
                    "role"=>"Mahasiswa"
                ]);

                  Mahasiswa::create([
                    'user_id' => $user->id,
                    'nama_mahasiswa' => $mahasiswa['nama_mahasiswa'],
                    'nim' => $new_nim,
                    'fakultas_id' => $mahasiswa['fakultas_id'],
                    'prodi_id' => $mahasiswa['prodi_id'],
                    'angkatan' => $mahasiswa['angkatan'],
                    'golongan_ukt_id'=>$mahasiswa['golongan_ukt_id'],
                    'semester'=> 1
                ]);
            }
            return redirect()->back()->with("success","Berhasil menambah mahasiswa");
        }catch(\Exception $e){
                    return redirect()->back()->with("error",$e->getMessage());

        }
    }

    
    public function edit(MahasiswaRequest $mahasiswaRequest,$id){
        try{
            $validation = $mahasiswaRequest->validated();
            $mahasiswa = Mahasiswa::findOrFail($id);
            $mahasiswa->update($validation); 
            return redirect()->back()->with("success","Berhasil mengedit mahasiswa");
        }catch(\Exception $e){
         return redirect()->back()->with( "error",$e->getMessage()); 
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