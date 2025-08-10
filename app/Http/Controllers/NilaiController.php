<?php

namespace App\Http\Controllers;

use App\Models\KrsDetail;
use App\Models\Nilai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NilaiController extends Controller
{
    public function index_nilai_dosen(){
    $fetch_krs = KrsDetail::with(['krs.mahasiswa.kelas.dosen','mata_kuliah'])
        ->whereHas('krs.mahasiswa.kelas.dosen', function ($query) {
            $query->where('id', Auth::user()->dosen->id);
        })->get();
        return Inertia::render("Nilai/Dosen/NilaiDosen",[
            "data_krs"=>$fetch_krs
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
}