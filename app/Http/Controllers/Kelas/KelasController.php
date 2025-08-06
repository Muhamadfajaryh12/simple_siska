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
        $fetch_data  = Kelas::all();
        return Inertia::render('Kelas/Kelas',[
            'data_kelas'=> $fetch_data
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
            dd($e);
            return redirect()->back()->with("error",value: $e->getMessage());
        }
    }
}