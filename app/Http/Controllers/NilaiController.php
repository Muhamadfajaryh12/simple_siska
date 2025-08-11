<?php

namespace App\Http\Controllers;

use App\Models\KelasMataKuliah;
use App\Models\KrsDetail;
use App\Models\Nilai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NilaiController extends Controller
{
    public function index_nilai_dosen(){
    $fetch_kelas_mata_kuliah = KelasMataKuliah::with("mata_kuliah","dosen")->where("dosen_id", Auth::user()->dosen->id)->get();
        return Inertia::render("Nilai/Dosen/NilaiDosen",[
            "data_kelas_mata_kuliah"=>$fetch_kelas_mata_kuliah
        ]);
    }

    public function index_detail_kelas_nilai($id){
        $fetch_detail_krs = KrsDetail::with("kelas_mata_kuliah","krs.mahasiswa")->where("kelas_mata_kuliah_id",$id)->get();
        return Inertia::render("Nilai/Dosen/DetailNilaiKelas",[
            "data_detail_krs"=>$fetch_detail_krs
        ]);
    }

    public function store(Request $request){
        try{
            // dd(vars: $request->all());
            $validation = $request->validate([
                'nilai_huruf'=>"required",
                "nilai_angka"=>"required",
                "krs_detail_id"=>"required",
            ]);
            
            Nilai::create($validation);
            return redirect()->back()->with("success","berhasil memberikan nilai");
        }catch(\Exception $e){
            return redirect()->back()->with("error",$e->getMessage());
        }
    }

    public function edit(Request $request){
        try{
            $validation = $request->validate([
                "nilai"=>"required|array",
                "nilai.*.krs_detail_id"=>"required",
                "nilai.*.absen"=>"required",
                "nilai.*.tugas"=>"required",
                "nilai.*.uts"=>"required",
                "nilai.*.uas"=>"required"
            ]);

            foreach($validation["nilai"] as $item){
                $total_nilai =    
                ($item['absen'] ?? 0) * 0.1 +
                ($item['tugas'] ?? 0) * 0.2 +
                ($item['uts'] ?? 0) * 0.3 +
                ($item['uas'] ?? 0) * 0.4;

                 KrsDetail::where('id', $item['krs_detail_id'])->update([
                'absen' => $item['absen'],
                'tugas' => $item['tugas'],
                'uts' => $item['uts'],
                'uas' => $item['uas'],
                'nilai_total' => round($total_nilai, 2), 
            ]);
            }

            return redirect()->back()->with('success',"berhasil");
        }catch(\Exception $e){
            return redirect()->back()->with('error',$e->getMessage());

        }
    }
}