<?php

namespace App\Http\Controllers;

use App\Models\KrsDetail;
use App\Models\Pertemuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PertemuanController extends Controller
{
    public function jadwal_perkuliahan_mahasiswa(){
        $fetch_jadwal = Pertemuan::with(["kelas_mata_kuliah.krs_detail.krs","kelas_mata_kuliah.dosen","kelas_mata_kuliah.mata_kuliah","absensi_detail"=>function($query){
            $query->where("mahasiswa_id", Auth::user()->mahasiswa->id);
        }])->whereHas("kelas_mata_kuliah.krs_detail.krs", function($query){
            $query->where("mahasiswa_id",Auth::user()->mahasiswa->id);
        })
        ->get();
        return Inertia::render("JadwalPerkuliahan/JadwalPerkuliahan",[
            "data_jadwal"=>$fetch_jadwal
        ]);
     }
    public function edit(Request $request,$id){
        try{
            $validation = $request->validate([
                "materi"=>"required",
                "file_materi" => "sometimes"
            ]);
            
            $path = "";
            $dataUpdate = [
                "materi" => $validation["materi"]
          
            ];
            if($request->hasFile("file_materi")){
                $path = $request->file("file_materi")->store("file_materi","public");
                $dataUpdate["file_materi"] = $path;
            }
            
            $pertemuan = Pertemuan::findOrFail($id);

            $pertemuan->update($dataUpdate);
            
            return redirect()->back()->with("success","Berhasil menambahkan materi");
        }catch(\Exception $e){
            return redirect()->back()->with("error",$e->getMessage());
        }
    }
}