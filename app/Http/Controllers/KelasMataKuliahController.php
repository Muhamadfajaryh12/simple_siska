<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\KelasMataKuliah;
use App\Models\Matakuliah;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasMataKuliahController extends Controller
{
    public function index(){
        $fetch_kelas_mata_kuliah = KelasMataKuliah::with(['dosen','mata_kuliah'])->get();
        return Inertia::render("KelasMataKuliah/KelasMataKuliah",[
            "data_kelas_mata_kuliah"=>$fetch_kelas_mata_kuliah
        ]);
    }

    public function create_index(){
        $fetch_dosen = Dosen::all();
        $fetch_mata_kuliah = Matakuliah::all();

        return Inertia::render("KelasMataKuliah/CreateKelasMataKuliah",[
            "data_dosen"=>$fetch_dosen,
            "data_mata_kuliah"=>$fetch_mata_kuliah
        ]);
    }
    

    public function store(Request $request){
        try{
            $validation = $request->validate([
                "data_kelas_mata_kuliah" => "required|array",      
                'data_kelas_mata_kuliah.*.nama_kelas' => 'required',
                'data_kelas_mata_kuliah.*.jadwal' => 'required',
                'data_kelas_mata_kuliah.*.jam_mulai' => 'required',
                'data_kelas_mata_kuliah.*.jam_selesai' => 'required',
                'data_kelas_mata_kuliah.*.tahun_ajaran' => 'required',
                'data_kelas_mata_kuliah.*.dosen_id' => 'required',
                'data_kelas_mata_kuliah.*.mata_kuliah_id' => 'required'
            ]);

            KelasMataKuliah::insert($validation["data_kelas_mata_kuliah"]);           
            return redirect()->back()->with("success","Berhasil membuat kelas mata kuliah");

        }catch(\Exception $e){
            return redirect()->back()->with("error",$e->getMessage());
        }
    }

    public function destroy ($id) {
        try{
            $kelas_mata_kuliah = KelasMataKuliah::findOrFail($id);
            $kelas_mata_kuliah->delete();
            return redirect()->back()->with("success","Berhasil menghapus kelas mata kuliah");
        }catch(\Exception $e){
            return redirect()->back()->with("error",$e->getMessage());
        }
    }
}