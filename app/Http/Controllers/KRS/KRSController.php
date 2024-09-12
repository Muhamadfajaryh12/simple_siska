<?php

namespace App\Http\Controllers\KRS;

use App\Http\Controllers\Controller;
use App\Models\KRS;
use App\Models\Matakuliah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class KRSController extends Controller
{
    public function index (){
        $fetch_data = Matakuliah::with(['fakultas', 'dosen', 'prodi', 'kelas'])
        ->where('id_prodi', Auth::user()->id_prodi)
        ->get();        
        return Inertia::render('KRS/Mahasiswa/KrsMahasiswa',[
            'datas'=>$fetch_data
        ]);
    }

    public function index_dosen(){
        $fetch_data = KRS::join('mata_kuliah', 'krs.id_mata_kuliah', '=', 'mata_kuliah.id')
        ->join('users', 'krs.id_user', '=', 'users.id') 
        ->join('prodi', 'users.id_prodi', '=','prodi.id')
        ->select('krs.id_user', 'users.nama', 'mata_kuliah.semester','krs.status_verified','users.id_prodi','prodi.nama_prodi')
        ->where('users.id_prodi', Auth::user()->id_prodi) 
        ->where('krs.status_verified', NULL)
        ->groupBy('krs.id_user', 'users.nama', 'mata_kuliah.semester','krs.status_verified','users.id_prodi','prodi.nama_prodi') 
        ->get();
        return Inertia::render('KRS/Dosen/KrsDosen',[
            'data'=>$fetch_data
        ]);
    }

    public function index_verifikasi($id,$semester){
        $fetch_data = KRS::with(
            'mata_kuliah.dosen',
            'mata_kuliah.kelas',
            'mata_kuliah',
            'mahasiswa'
        )
        ->where('id_user',$id)
        ->whereHas('mata_kuliah', function ($query) use ($semester) {
            $query->where('semester', $semester);
        })
        ->get();

        return Inertia::render('KRS/Dosen/KrsVerifikasi',[
            'data_krs'=>$fetch_data
        ]);
    }

    public function verifikasi(Request $request){
        $validation = $request->validate([
            'data_verifikasi.*.id' =>'required'
        ]);

        foreach($validation['data_verifikasi'] as $data){
            $krs = KRS::findOrFail($data['id']);
            $krs->update(['status_verified' => 1]);
        }
        redirect('krs_dosen.index');
    }
    public function detail(){
        $fetch_data = KRS::with(    
        'mata_kuliah.prodi',
        'mata_kuliah.dosen',
        'mata_kuliah.kelas',
        'mata_kuliah.fakultas')
        ->where('id_user',Auth::user()->id)
        ->get();
        return Inertia::render('KRS/Mahasiswa/KrsMahasiswaDetail',[
            'datas'=> $fetch_data
        ]);
    }
    public function store (Request $request) {        
        $user = auth()->user();

        $validation = $request->validate([
            'mata_kuliah.*.id' => 'required'
        ]);
        foreach ($validation['mata_kuliah'] as $data ){

            KRS::create([
                'id_user' => $user->id,   
                'id_mata_kuliah' => $data['id'],
            ]);
        }
    }
}