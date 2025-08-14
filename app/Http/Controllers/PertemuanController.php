<?php

namespace App\Http\Controllers;

use App\Models\Pertemuan;
use Illuminate\Http\Request;

class PertemuanController extends Controller
{
    public function edit(Request $request,$id){
        try{
            $validation = $request->validate([
                "materi"=>"required"
            ]);
            $pertemuan = Pertemuan::findOrFail($id);
            $pertemuan->update($validation);
            return redirect()->back()->with("success","Berhasil menambahkan materi");
        }catch(\Exception $e){
            return redirect()->back()->with("error",$e->getMessage());
        }
    }
}