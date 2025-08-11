<?php

namespace App\Http\Controllers\KRS;

use App\Http\Controllers\Controller;
use App\Models\KelasMataKuliah;
use App\Models\KRS;
use App\Models\KrsDetail;
use App\Models\Matakuliah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class KRSController extends Controller
{
    public function index (){
        $fetch_data = KelasMataKuliah::with([ 'dosen', 'mata_kuliah',"mata_kuliah.prodi"])
        ->whereHas('mata_kuliah', function($query) {
        $query->where('prodi_id', Auth::user()->mahasiswa->prodi_id);
        })
        ->get()->groupBy(function ($item) {
        return $item->mata_kuliah->semester;
    });

        $fetch_krs_mahasiswa = KrsDetail::with("krs","kelas_mata_kuliah","kelas_mata_kuliah.mata_kuliah")
        ->whereHas("krs",function($query){
            $query->where("mahasiswa_id",Auth::user()->mahasiswa->id);
        })->get()->groupBy(function ($item) {
        return $item->kelas_mata_kuliah->mata_kuliah->semester;
         });
;
        
        return Inertia::render('KRS/Mahasiswa/KrsMahasiswa',[
            'data_mata_kuliah'=>$fetch_data,
            'data_krs_mahasiswa'=>$fetch_krs_mahasiswa
        ]);
    }

    public function index_dosen(){
        $fetch_data=  KRS::with("mahasiswa")->get();
        return Inertia::render('KRS/Dosen/KrsDosen',[
            'data_krs'=>$fetch_data
        ]);
    }

    public function index_verifikasi($id){ 
     $fetch_data = KrsDetail::with([
        'kelas_mata_kuliah.mata_kuliah',
        'kelas_mata_kuliah.dosen'
    ])
    ->where('krs_id', $id)
    ->get();
     $fetch_krs = Krs::with("mahasiswa")->findOrFail($id);
        return Inertia::render('KRS/Dosen/KrsVerifikasi',[
            'data_krs'=>$fetch_data,
            'data_mahasiswa'=>$fetch_krs
        ]);
    }

    public function index_dosen_penilaian(){
        $fetch_data = KRS::with('mahasiswa')->get();

        return Inertia::render('KRS/Dosen/KrsPenilaian',[
            'data_krs'=>$fetch_data
        ]);
    }
    
    public function index_nilai_krs(){
        $fetch_data = KRS::with('mata_kuliah')    
        ->where('user_id',Auth::user()->id)
        ->get();

        return Inertia::render('KRS/Mahasiswa/KrsMahasiswaNilai',[
            'data_krs'=>$fetch_data
        ]);

    }
    public function verifikasi(Request $request,$id){   
        try{

            $validation = $request->validate([
                "status"=>"required"
            ]);
    
            $krs = KRS::findOrFail($id);
            $krs->update([
                "status"=>$validation["status"]
            ]);
        
            return redirect()->back()->with("success","Berhasil verifikasi");

        }catch(\Exception $e){
            return redirect()->back()->with("error",$e->getMessage());
        }
    }

    public function penilaian(Request $request){
        $validation = $request->validate([
            'data_verifikasi.*.id' =>'required',
            'data_verifikasi.*.nilai'=> 'required'
        ]);

        foreach($validation['data_verifikasi'] as $data){
            $huruf = "";
            $krs = KRS::findOrFail($data['id']);
            if ($data['nilai'] >= 85) {
                $huruf = "A";
            } elseif ($data['nilai'] >= 70 && $data['nilai'] <= 84) {
                $huruf = "B";
            } else {
                $huruf = "C";
            }
            $krs->update([
                'nilai_angka' => $data['nilai'],
                'nilai_huruf'=> $huruf
            ]);
        }
        redirect('krs_dosen.index');
    }
    public function index_krs_history(){
        
        $fetch_krs_detail =  KrsDetail::with(['mata_kuliah', 'krs'])
        ->whereHas('krs', function ($query) {
            $query->where('mahasiswa_id', Auth::user()->mahasiswa->id);
        })->get();
        return Inertia::render('KRS/Mahasiswa/KrsMahasiswaDetail',[
            'data_krs'=> $fetch_krs_detail
        ]);
    }
    public function store (Request $request) {      
        try{

            $user = auth()->user()->mahasiswa;
     
            $validation = $request->validate([
                "total_sks" =>"required",
                "semester"=>"required",
                'mata_kuliah'=>"required|array"
            ]);
    
            $krs = KRS::create([
                "mahasiswa_id"=> $user->id,
                "semester"=>$validation["semester"],
                "total_sks"=>$validation["total_sks"],
                "status"=>"Menunggu",
                "tahun_ajaran"=>"2025",
            ]);
    
            foreach ($validation['mata_kuliah'] as $data ){
                KrsDetail::create([
                    'krs_id' => $krs->id,   
                    'kelas_mata_kuliah_id' => $data['kelas_mata_kuliah_id'],
                ]);
            }

            return redirect()->back()->with('success',"Berhasil menambahkan krs");
        }  
        catch(\Exception $e){
            return redirect()->back()->with('error',$e->getMessage());
        }
    }
}