<?php

namespace App\Http\Controllers;

use App\Models\AbsenDosen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AbsenDosenController extends Controller
{
    public function store (Request $request){
        try{
            $validation = $request->validate([
                "pertemuan_id"=>"required",
                "status"=>"required"
            ]);

            AbsenDosen::create([
                "pertemuan_id"=>$validation["pertemuan_id"],
                "dosen_id"=>Auth::user()->dosen->id,
                "status"=>$validation["status"]
            ]);

            return redirect()->back()->with("success","Berhasil melakukan absen");
        }catch(\Exception $e){
            return redirect()->back()->with("error",$e->getMessage());
        }
    }
}