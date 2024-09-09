<?php

namespace App\Http\Controllers\Matakuliah;

use App\Http\Controllers\Controller;
use App\Models\Fakultas;
use App\Models\Kelas;
use App\Models\Matakuliah;
use App\Models\Prodi;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MatakuliahController extends Controller
{

    public function index(){
        $fetch_data = Matakuliah::with(['fakultas', 'dosen', 'prodi', 'kelas'])->get();
        return Inertia::render('Matakuliah/Matakuliah',[
            'data'=>$fetch_data
        ]);
    }
    public function create(){
        $fetch_fakultas = Fakultas::all();
        $fetch_prodi = Prodi::all();
        $fetch_dosen = User::where('status','dosen')->get();
        $fetch_kelas = Kelas::all();
        return Inertia::render('Matakuliah/FormCreateMatakuliah',[
            'data_fakultas' => $fetch_fakultas,
            'data_prodi' => $fetch_prodi,
            'data_dosen'=> $fetch_dosen,
            'data_kelas'=> $fetch_kelas
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'mata_kuliah.*.nama_mata_kuliah' => 'required|string',
            'mata_kuliah.*.jadwal' => 'required',
            'mata_kuliah.*.jam_mulai' => 'required',
            'mata_kuliah.*.jam_selesai' => 'required',
            'mata_kuliah.*.sks' => 'required',
            'mata_kuliah.*.semester' => 'required',
            'mata_kuliah.*.id_fakultas' => 'required',
            'mata_kuliah.*.id_prodi' => 'required',
            'mata_kuliah.*.id_dosen' => 'required',
            'mata_kuliah.*.id_kelas' => 'required',
        ]);
        $mataKuliahArray = $request->input('mata_kuliah');
        dd($mataKuliahArray);
        foreach ($validatedData['mata_kuliah'] as $data) {
            Matakuliah::create($data);
        }
    

     
    }
}