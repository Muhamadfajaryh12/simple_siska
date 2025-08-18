<?php

namespace App\Http\Controllers;

use App\Models\TugasMahasiswa;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TugasMahasiswaController extends Controller
{
    public function edit ($id,Request $request){
        try{
           $validation = $request->validate([
                "file_pengumpulan"=>"nullable",
                "status"=>"nullable",
                "nilai"=>"nullable"
            ]);
            $tugas_mahasiswa = TugasMahasiswa::findOrFail($id);
         
            $data_update = $request->only(["status","nilai"]);
            

            if($request->hasFile("file_pengumpulan")){

                if($tugas_mahasiswa->file_pengumpulan && Storage::disk("public")->exists($tugas_mahasiswa->file_pengumpulan)){
                    Storage::disk('public')->delete($tugas_mahasiswa->file_pengumpulan);
                }

                $path = $request->file("file_pengumpulan")->store('tugas',"public");
                $data_update["file_pengumpulan"] = $path;

            }
            $data_update["submit_date"] = Carbon::now();
            $tugas_mahasiswa->update($data_update);

            return redirect()->back()->with('success',"Berhasil mengirim tugas");
        }catch(\Exception $e){
            return redirect()->back()->with("error",$e->getMessage());
        }
    }
}