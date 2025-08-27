<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\KelasMataKuliah;
use App\Models\KrsDetail;
use App\Models\Matakuliah;
use App\Models\Pertemuan;
use App\Models\Prodi;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class KelasMataKuliahController extends Controller
{
    public function index(){
        $fetch_kelas_mata_kuliah = KelasMataKuliah::with(['dosen','mata_kuliah','mata_kuliah.prodi'])->get();
        $fetch_prodi = Prodi::all();
        return Inertia::render("KelasMataKuliah/KelasMataKuliah",[
            "data_kelas_mata_kuliah"=>$fetch_kelas_mata_kuliah,
            "data_prodi"=>$fetch_prodi
        ]);
    }

    public function kelas_mengajar_index(){
        $fetch_kelas_mata_kuliah = KelasMataKuliah::with(["dosen",'mata_kuliah',"mata_kuliah.prodi"])->where("dosen_id", Auth::user()->dosen->id)->get();
        return Inertia::render("KelasMengajar/KelasMengajar",[
            "data_kelas"=>$fetch_kelas_mata_kuliah
        ]);
    }

    public function kelas_mengajar_detail($id){
        $fetch_kelas_mata_kuliah_detail = KelasMataKuliah::with(["dosen","mata_kuliah",
        "pertemuan"=>function($query){
            $query->withCount([
                'absensi as total_hadir'=>function($q){
                    $q->where("status","hadir");
                },
                  'absensi as total_izin'=>function($q){
                    $q->where("status","izin");
                }
            ]);
        },"pertemuan.absensi.mahasiswa","pertemuan.tugas.tugas_mahasiswa.mahasiswa"])->withCount("krs_detail as total_mahasiswa")
        ->findOrFail($id);

    
        $fetch_data_rekap = DB::table("krs_detail")
        ->join("krs","krs_detail.krs_id","=","krs.id")
        ->join("mahasiswa", "krs.mahasiswa_id", "=", "mahasiswa.id")
        ->join("pertemuan", "pertemuan.kelas_mata_kuliah_id", "=", "krs_detail.kelas_mata_kuliah_id")
        ->leftJoin("tugas_mahasiswa", "tugas_mahasiswa.mahasiswa_id", "=", "mahasiswa.id")
        ->leftJoin("tugas", "tugas.id", "=", "tugas_mahasiswa.tugas_id")
        ->leftJoin("absensi", function($join) {
            $join->on("absensi.mahasiswa_id", "=", "mahasiswa.id")
                ->on("absensi.pertemuan_id", "=", "pertemuan.id");
        })
        ->where("krs_detail.kelas_mata_kuliah_id", $id)
        ->groupBy("mahasiswa.id", "mahasiswa.nama_mahasiswa", "mahasiswa.nim")
        ->select(
            "mahasiswa.id",
            "mahasiswa.nama_mahasiswa",
            "mahasiswa.nim",
            DB::raw("ROUND(AVG(CASE WHEN tugas.type = 'tugas' THEN tugas_mahasiswa.nilai END)) as tugas"),
            DB::raw("ROUND(MAX(CASE WHEN tugas.type = 'uts' THEN tugas_mahasiswa.nilai END)) as uts"),
            DB::raw("ROUND(MAX(CASE WHEN tugas.type = 'uas' THEN tugas_mahasiswa.nilai END)) as uas"),
            DB::raw("ROUND((SUM(CASE WHEN absensi.status = 'hadir' THEN 1 ELSE 0 END) / COUNT(DISTINCT pertemuan.id) )* 100,2 ) as absen"),
   
            )
        ->get();
       

       
        return Inertia::render("KelasMengajar/DetailKelasMengajar",[
            "data_kelas"=>$fetch_kelas_mata_kuliah_detail,
            "data_rekap"=>$fetch_data_rekap
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
    
    public function update_index($id){
        $fetch_dosen = Dosen::all();
        $fetch_mata_kuliah = Matakuliah::all();
        $fetch_kelas_mata_kuliah = KelasMataKuliah::findOrFail($id);

        return Inertia::render("KelasMataKuliah/UpdateKelasMataKuliah",[
            "data_dosen"=>$fetch_dosen,
            "data_mata_kuliah"=>$fetch_mata_kuliah,
            "data_kelas_mata_kuliah"=>$fetch_kelas_mata_kuliah
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
                'data_kelas_mata_kuliah.*.tanggal_mulai'=>"required",
                'data_kelas_mata_kuliah.*.dosen_id' => 'required',
                'data_kelas_mata_kuliah.*.mata_kuliah_id' => 'required'
            ]);

            foreach($validation["data_kelas_mata_kuliah"] as $item) {
                $kelas_mata_kuliah = KelasMataKuliah::create($item);           
                $tanggal = Carbon::parse($item["tanggal_mulai"]);
                for($i = 1 ; $i<= 16 ; $i++){
                    Pertemuan::create([
                        "kelas_mata_kuliah_id"=> $kelas_mata_kuliah["id"],
                        "tanggal"=>$tanggal->copy()->format("Y-m-d"),
                        "pertemuan_ke"=>$i
                    ]);
                    $tanggal->addWeek();
                }
            }
            return redirect()->back()->with("success","Berhasil membuat kelas mata kuliah");

        }catch(\Exception $e){
            return redirect()->back()->with("error",$e->getMessage());
        }
    }

    public function edit(Request $request,$id){
    try{
            $validation = $request->validate([     
                'nama_kelas' => 'required',
                'jadwal' => 'required',
                'jam_mulai' => 'required',
                'jam_selesai' => 'required',
                'tahun_ajaran' => 'required',
                'dosen_id' => 'required',
                'mata_kuliah_id' => 'required'
            ]);

            $kelas_mata_kuliah= KelasMataKuliah::findOrFail($id);
            $kelas_mata_kuliah->update($validation);           
            return redirect()->back()->with("success","Berhasil mengedit kelas mata kuliah");
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