<?php

namespace App\Http\Controllers\Kelas;

use App\Http\Controllers\Controller;
use App\Models\Dosen;
use App\Models\Kelas;
use App\Models\Mahasiswa;
use App\Models\Prodi;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasController extends Controller
{
    public function index(){
        $fetch_data  = Kelas::with("dosen","prodi")->get();
        return Inertia::render('Kelas/Kelas',[
            'data_kelas'=> $fetch_data
        ]);
    }

    public function detail_index($id){
        $fetch_kelas  = Kelas::with("dosen","prodi")->Where("id",$id)->firstOrFail();
        $fetch_mahasiswa = Mahasiswa::Where("kelas_id",$fetch_kelas->id)->get();
        return Inertia::render('Kelas/DetailKelas',[
            'data_kelas'=> $fetch_kelas,
            'data_mahasiswa'=>$fetch_mahasiswa,
        ]);
    }
    public function create (){
        $fetch_mahasiswa = Mahasiswa::where("kelas_id",null)->get();
        $fetch_dosen = Dosen::all();
        $fetch_prodi = Prodi::all();
        return Inertia::render('Kelas/FormCreateKelas',
    [
        'data_mahasiswa'=>$fetch_mahasiswa,
        "data_dosen"=>$fetch_dosen,
        "data_prodi"=>$fetch_prodi
        ]);
    }

    public function update ($id){
        $fetch_mahasiswa = Mahasiswa::all();
        $fetch_dosen = Dosen::all();
        $fetch_prodi = Prodi::all();
        $fetch_kelas = Kelas::with("mahasiswa")->findOrFail($id);
        return Inertia::render('Kelas/UpdateKelas',
[
        'data_mahasiswa'=>$fetch_mahasiswa,
        "data_dosen"=>$fetch_dosen,
        "data_prodi"=>$fetch_prodi,
        "data_kelas_detail"=>$fetch_kelas
        ]);
    }

    public function store(Request $request){
        try{
            $validation = $request->validate([
                'kelas'=>'required',
                "angkatan"=>"required",
                "dosen_id"=>"required",
                "prodi_id"=>"required",
                "data_mahasiswa"=>"required|array",
                "data_mahasiswa.*.mahasiswa_id"=>"required"
            ]);

            $kelas = Kelas::create([
                "kelas"=> $validation["kelas"],
                "angkatan"=>$validation["angkatan"],
                "dosen_id"=> $validation['dosen_id'],
                "prodi_id"=>$validation['prodi_id']
            ]);
            

            foreach($validation['data_mahasiswa'] as $item){
                $mahasiswa = Mahasiswa::findOrFail($item["mahasiswa_id"]);
                $mahasiswa->update([
                    "kelas_id" => $kelas->id
                ]);
            }
 
            return redirect()->back()->with("success","Berhasil menambahkan kelas");

        }catch(\Exception $e){
    
            return redirect()->back()->with("error",value: $e->getMessage());
        }
    }

    public function edit(Request $request,$id){
        // dd($request);
        try{
            $validation = $request->validate([
                'kelas'=>'required',
                "angkatan"=>"required",
                "dosen_id"=>"required",
                "prodi_id"=>"required",
                "data_mahasiswa"=>"required|array",
                "data_mahasiswa.*.mahasiswa_id"=>"required"
            ]);

            $kelas = Kelas::findOrFail($id);
            $kelas->update([
                "kelas"=> $validation["kelas"],
                "angkatan"=>$validation["angkatan"],
                "dosen_id"=> $validation['dosen_id'],
                "prodi_id"=>$validation['prodi_id']
            ]);
            
            Mahasiswa::where("kelas_id",$kelas->id)->update(["kelas_id" => null]);

            foreach($validation['data_mahasiswa'] as $item){
                $mahasiswa = Mahasiswa::findOrFail($item["mahasiswa_id"]);
                $mahasiswa->update([
                    "kelas_id" => $kelas->id
                ]);
            }
 
            return redirect()->back()->with("success","Berhasil mengedit kelas");

        }catch(\Exception $e){
   
            return redirect()->back()->with("error",value: $e->getMessage());
        }
    }
    public function destroy ($id){
        try{
            $kelas = Kelas::findOrFail($id);
            Mahasiswa::where("kelas_id",$kelas->id)->update(["kelas_id"=>null]);
            $kelas->delete();
            return redirect()->back()->with("success","Berhasil menghapus kelas");
        }catch(\Exception $e){
            return redirect()->back()->with("error",$e->getMessage());
        }
    }
}