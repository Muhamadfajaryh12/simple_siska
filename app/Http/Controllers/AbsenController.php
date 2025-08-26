<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AbsenController extends Controller
{
    public function store (Request $request){
        try{
            $validation = $request->validate([
                "pertemuan_id"=>"required",
                "file_foto" => "required"
            ]);
            
         
            $path = $request->file("file_foto")->store("absen","public");
     
            Absensi::create([
                "pertemuan_id" => $validation["pertemuan_id"],
                "mahasiswa_id"=> Auth::user()->mahasiswa->id,
                "foto_absen"=>$path
            ]);
            
            return redirect()->back()->with("success","Berhasil absen");
        }catch(\Exception $e){
            return redirect()->back()->with('error',$e->getMessage());
        }
    }
}