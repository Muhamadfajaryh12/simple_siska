<?php

namespace App\Http\Controllers;

use App\Models\KelasMataKuliah;
use App\Models\Pertemuan;
use App\Models\Tugas;
use App\Models\TugasMahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TugasController extends Controller
{
    public function tugas_kuliah_mahasiswa_index(){
        // $fetch_tugas_kuliah = Tugas::with('pertemuan.kelas_mata_kuliah.krs_detail.krs','tugas_mahasiswa_detail',"kelas_mata_kuliah.mata_kuliah")->whereHas("pertemuan.kelas_mata_kuliah.krs_detail.krs",function($query){
        //     $query->where("mahasiswa_id", Auth::user()->mahasiswa->id);
        // })->get();

        $fetch_tugas_kuliah = TugasMahasiswa::with("tugas.pertemuan.kelas_mata_kuliah.mata_kuliah")->where("mahasiswa_id",Auth::user()->mahasiswa->id)->get();
        return Inertia::render("TugasKuliah/TugasKuliah",[
            "data_tugas_kuliah"=>$fetch_tugas_kuliah
        ]);
    }
    public function store(Request $request){
        try{

            $validation = $request->validate([
                "judul_tugas"=>"required",
                "deskripsi_tugas"=>"nullable",
                "deadline"=>"required",
                "pertemuan_id"=>"required"
            ]);


            $tugas = Tugas::create($validation);

            $pertemuan = Pertemuan::with("kelas_mata_kuliah.krs_detail")->findOrFail($validation["pertemuan_id"]);

            $data = [];
  
            foreach ($pertemuan->kelas_mata_kuliah->krs_detail as $item) {
                $data[] = [
                    'tugas_id' => $tugas->id,
                    "mahasiswa_id" => $item->krs->mahasiswa_id,
                    "status" => "menunggu",
                    "created_at" => now(),
                    "updated_at" => now(),
                ];
            }
            
            TugasMahasiswa::insert($data);
            
            return redirect()->back()->with("success","Berhasil membuat tugas");
        }catch(\Exception $e){
            return redirect()->back()->with("error",$e->getMessage());
        }
    }
}