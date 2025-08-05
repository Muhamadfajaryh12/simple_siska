<?php

namespace App\Http\Controllers\Matakuliah;

use App\Http\Controllers\Controller;
use App\Http\Requests\MataKuliahRequest;
use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\Kelas;
use App\Models\Matakuliah;
use App\Models\Prodi;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MatakuliahController extends Controller
{

    public function index(){
        $fetch_data = Matakuliah::with([ 'dosen', 'prodi'])->get();
        return Inertia::render('Matakuliah/Matakuliah',[
            'data'=>$fetch_data
        ]);
    }
    public function create(){
        $fetch_fakultas = Fakultas::all();
        $fetch_prodi = Prodi::all();
        $fetch_dosen = Dosen::all();
        return Inertia::render('Matakuliah/FormCreateMatakuliah',[
            'data_fakultas' => $fetch_fakultas,
            'data_prodi' => $fetch_prodi,
            'data_dosen'=> $fetch_dosen,
    
        ]);
    }

    public function update($id){
        $fetch_prodi = Prodi::all();
        $fetch_dosen = Dosen::all();
        $fetch_kelas = Kelas::all();
        $fetch_mata_kuliah = Matakuliah::findOrFail($id);
        return Inertia::render( "Matakuliah/UpdateMatakuliah",[
            'data_prodi' => $fetch_prodi,
            'data_dosen'=> $fetch_dosen,
            'data_kelas'=> $fetch_kelas,
            'data_mata_kuliah'=> $fetch_mata_kuliah
        ]);
    }
    public function store(Request $request){
        try{

            $validation = $request->validate([
                'data'=>'required|array',
                'data.*.nama_mata_kuliah' => 'required',
                'data.*.jadwal' => 'required',
                'data.*.jam_mulai'=>'required',
                'data.*.jam_selesai'=>'required',
                'data.*.sks' => 'required|integer',
                'data.*.semester' => 'required',
                'data.*.kode_mata_kuliah'=>"required",
                'data.*.kelas' => 'required',
                'data.*.prodi_id' => 'required',
                'data.*.dosen_id' => 'required',
            ]);
            
            MataKuliah::insert($validation['data']);
            return redirect()->back()->with("success","Berhasil menambahkan mata kuliah");
        }
        catch(\Exception $e){
            return redirect()->back()->with("error",$e->getMessage());
        }
    }

    public function edit(MataKuliahRequest $mataKuliahRequest,$id){
        try{
            $validation = $mataKuliahRequest->validated();
            $mata_kuliah = Matakuliah::findOrFail($id);
            $mata_kuliah->update($validation);

            return redirect()->back()->with("success","Berhasil mengedit mata kuliah");

        }catch(\Exception $e){
            return redirect()->back()->with('error',$e->getMessage());
        }
    }

    public function destroy($id){
        try{
            $mata_kuliah = MataKuliah::findOrFail($id);
            $mata_kuliah->delete();
            return redirect()->back()->with("success","Berhasil menghapus mata kuliah");

        }catch(\Exception $e){
            return redirect()->back()->with('error',$e->getMessage());
        }
    }
}