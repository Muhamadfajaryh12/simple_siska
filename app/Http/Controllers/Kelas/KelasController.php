<?php

namespace App\Http\Controllers\Kelas;

use App\Http\Controllers\Controller;
use App\Models\Dosen;
use App\Models\Kelas;
use App\Models\Mahasiswa;
use App\Models\Prodi;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class KelasController extends Controller
{
    public function index(){
        $fetch_data  = Kelas::with("dosen","prodi")->get();
        $fetch_prodi = Prodi::all();
        return Inertia::render('Kelas/Kelas',[
            'data_kelas'=> $fetch_data,
            "data_prodi"=>$fetch_prodi
        ]);
    }

    public function detail_index($id){
        $fetch_kelas  = Kelas::with("dosen","prodi")->Where("id",$id)->firstOrFail();
        $fetch_mahasiswa = Mahasiswa::Where("kelas_id",$fetch_kelas->id)->get();
        return Inertia::render('Kelas/DetailKelas',[
            'data_kelas'=> $fetch_kelas,
            'data_mahasiswa'=>$fetch_mahasiswa,
        ]);
    }

    public function kelas_perwalian_dosen_index(){
        $fetch_kelas_perwalian = Kelas::where("dosen_id",Auth::user()->dosen->id)->get();
        return Inertia::render("KelasPerwalian/KelasPerwalian",[
            "data_kelas"=>$fetch_kelas_perwalian
        ]);
    }

    public function kelas_perwalian_dosen_detail_index($id){
        $fetch_mahasiswa = DB::table("Kelas")
        ->join("mahasiswa","mahasiswa.kelas_id", '=' ,"kelas.id")
        ->leftJoin("krs","krs.mahasiswa_id" ,"=", "mahasiswa.id")
        ->where("kelas.dosen_id",'=',Auth::user()->dosen->id)
        ->groupBy("mahasiswa.nama_mahasiswa","mahasiswa.nim","total_sks","mahasiswa.semester",     "mahasiswa.status")
        ->select(
            "mahasiswa.nama_mahasiswa",
            "mahasiswa.nim",
            "mahasiswa.semester",
            "mahasiswa.status",
            DB::raw("COALESCE(SUM(krs.total_sks),0) as total_sks")
        )
        ->orderBy("mahasiswa.nim","ASC")
        ->get();

        $fetch_mahasiswa_krs = DB::table("Kelas")
        ->join("mahasiswa","mahasiswa.kelas_id", '=' ,"kelas.id")
        ->leftJoin("krs","krs.mahasiswa_id" ,"=", "mahasiswa.id")
        ->where("kelas.dosen_id",'=',Auth::user()->dosen->id)
        ->select(
            "mahasiswa.nama_mahasiswa",
            "mahasiswa.nim",
            "krs.semester",
            "krs.status"
        )
        ->orderBy("mahasiswa.nim","ASC")
        ->get()
        ->groupBy("nama_mahasiswa")
        ->map(function ($items) {
            return $items->map(function ($row) {
                return [
                    "semester" => $row->semester,
                    "status"   => $row->status,
                ];
            });
        });

        $fetch_mahasiswa_ukt = DB::table("kelas")
        ->join("mahasiswa","mahasiswa.kelas_id","=","kelas.id")
        ->join("ukt","ukt.mahasiswa_id",'=',"mahasiswa.id")
        ->join("semester_ajaran","semester_ajaran.id" , '=' ,'ukt.semester_ajaran_id')
        ->select("mahasiswa.nama_mahasiswa","semester_ajaran.semester_ajaran","ukt.status")
        ->orderBy("mahasiswa.nim","ASC")
        ->get()
        ->groupBy("nama_mahasiswa")
        ->map(function($items){
            return $items->map(function($row){
                return [
                    "semester_ajaran"=>$row->semester_ajaran,
                    "status"=>$row->status
                ];
            });
        });
        

        $fetch_data_detail = Kelas::withCount("mahasiswa")->with("dosen")->first();
  
        return Inertia::render("KelasPerwalian/DetailKelasPerwalian",[
            "data_mahasiswa"=>$fetch_mahasiswa,
            "data_detail"=>$fetch_data_detail,
            "data_krs"=>$fetch_mahasiswa_krs,
            "data_ukt"=>$fetch_mahasiswa_ukt
        ]);
    }
    public function create (){
        $fetch_mahasiswa = Mahasiswa::where("kelas_id",null)->get();
        $fetch_dosen = Dosen::all();
        $fetch_prodi = Prodi::all();
        return Inertia::render('Kelas/FormCreateKelas',
    [
        'data_mahasiswa'=>$fetch_mahasiswa,
        "data_dosen"=>$fetch_dosen,
        "data_prodi"=>$fetch_prodi
        ]);
    }

    public function update ($id){
        $fetch_mahasiswa = Mahasiswa::all();
        $fetch_dosen = Dosen::all();
        $fetch_prodi = Prodi::all();
        $fetch_kelas = Kelas::with("mahasiswa")->findOrFail($id);
        return Inertia::render('Kelas/UpdateKelas',
[
        'data_mahasiswa'=>$fetch_mahasiswa,
        "data_dosen"=>$fetch_dosen,
        "data_prodi"=>$fetch_prodi,
        "data_kelas_detail"=>$fetch_kelas
        ]);
    }

    public function store(Request $request){
        try{
            $validation = $request->validate([
                'kelas'=>'required',
                "angkatan"=>"required",
                "dosen_id"=>"required",
                "prodi_id"=>"required",
                "data_mahasiswa"=>"required|array",
                "data_mahasiswa.*.mahasiswa_id"=>"required"
            ]);

            $kelas = Kelas::create([
                "kelas"=> $validation["kelas"],
                "angkatan"=>$validation["angkatan"],
                "dosen_id"=> $validation['dosen_id'],
                "prodi_id"=>$validation['prodi_id']
            ]);
            

            foreach($validation['data_mahasiswa'] as $item){
                $mahasiswa = Mahasiswa::findOrFail($item["mahasiswa_id"]);
                $mahasiswa->update([
                    "kelas_id" => $kelas->id
                ]);
            }
 
            return redirect()->back()->with("success","Berhasil menambahkan kelas");

        }catch(\Exception $e){
    
            return redirect()->back()->with("error",value: $e->getMessage());
        }
    }

    public function edit(Request $request,$id){
        // dd($request);
        try{
            $validation = $request->validate([
                'kelas'=>'required',
                "angkatan"=>"required",
                "dosen_id"=>"required",
                "prodi_id"=>"required",
                "data_mahasiswa"=>"required|array",
                "data_mahasiswa.*.mahasiswa_id"=>"required"
            ]);

            $kelas = Kelas::findOrFail($id);
            $kelas->update([
                "kelas"=> $validation["kelas"],
                "angkatan"=>$validation["angkatan"],
                "dosen_id"=> $validation['dosen_id'],
                "prodi_id"=>$validation['prodi_id']
            ]);
            
            Mahasiswa::where("kelas_id",$kelas->id)->update(["kelas_id" => null]);

            foreach($validation['data_mahasiswa'] as $item){
                $mahasiswa = Mahasiswa::findOrFail($item["mahasiswa_id"]);
                $mahasiswa->update([
                    "kelas_id" => $kelas->id
                ]);
            }
 
            return redirect()->back()->with("success","Berhasil mengedit kelas");

        }catch(\Exception $e){
   
            return redirect()->back()->with("error",value: $e->getMessage());
        }
    }
    public function destroy ($id){
        try{
            $kelas = Kelas::findOrFail($id);
            Mahasiswa::where("kelas_id",$kelas->id)->update(["kelas_id"=>null]);
            $kelas->delete();
            return redirect()->back()->with("success","Berhasil menghapus kelas");
        }catch(\Exception $e){
            return redirect()->back()->with("error",$e->getMessage());
        }
    }
}