<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\Kelas;
use App\Models\KelasMataKuliah;
use App\Models\KRS;
use App\Models\Mahasiswa;
use App\Models\Matakuliah;
use App\Models\Pertemuan;
use App\Models\Prodi;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard_dosen(){
        $dosen_id = Auth::user()->dosen->id;
        $fetch_kelas_mata_kuliah_dosen = KelasMataKuliah::where("dosen_id",$dosen_id)
        ->count();
        $fetch_mahasiswa_kelas_mata_kuliah_dosen = KelasMataKuliah::where("dosen_id",$dosen_id)
        ->withCount("krs_detail")
        ->get()
        ->sum("krs_detail_count");
        $fetch_pertemuan_kelas_mata_kuliah_dosen = Pertemuan::whereHas("kelas_mata_kuliah", function($query) {
            $query->where("dosen_id", Auth::user()->dosen->id);
        })->with("kelas_mata_kuliah.dosen","kelas_mata_kuliah.mata_kuliah")->get();

        $fetch_mahasiswa_wali = Kelas::where("dosen_id",$dosen_id)->withCount("mahasiswa")->get()->sum("mahasiswa_count");
        return Inertia::render('Dashboard/DashboardDosen',[
            'total_kelas_mata_kuliah' => $fetch_kelas_mata_kuliah_dosen,
            'total_mahasiswa_kelas_mata_kuliah'=>$fetch_mahasiswa_kelas_mata_kuliah_dosen,
            "data_jadwal_kuliah"=>$fetch_pertemuan_kelas_mata_kuliah_dosen,
            "total_mahasiswa_wali"=>$fetch_mahasiswa_wali
        ]);
    }

    public function dashboard_mahasiswa(){
            $fetch_total_sks_ipk = DB::table("krs")
            ->join("krs_detail","krs_detail.krs_id",'=',"krs.id")
            ->join("kelas_mata_kuliah","krs_detail.kelas_mata_kuliah_id","kelas_mata_kuliah.id")
            ->join("mata_kuliah","kelas_mata_kuliah.mata_kuliah_id","mata_kuliah.id")
            ->where("krs.mahasiswa_id" ,'=',Auth::user()->mahasiswa->id)
            ->select(
                DB::raw("SUM(krs.total_sks) as total_krs"),
                DB::raw("ROUND(SUM(
                CASE
                    WHEN krs_detail.nilai_huruf = 'A' THEN 4 
                    WHEN krs_detail.nilai_huruf = 'B' THEN 3 
                    WHEN krs_detail.nilai_huruf = 'C' THEN 2 
                    WHEN krs_detail.nilai_huruf = 'D' THEN 1
                    ELSE 0
                    END * mata_kuliah.sks
                ) / SUM(total_sks), 2) as ipk")
                )
            ->first();

            $fetch_ips = DB::table("krs")
            ->join("krs_detail","krs_detail.krs_id",'=',"krs.id")
            ->join("kelas_mata_kuliah","krs_detail.kelas_mata_kuliah_id","kelas_mata_kuliah.id")
            ->join("mata_kuliah","kelas_mata_kuliah.mata_kuliah_id","mata_kuliah.id")
            ->where("krs.mahasiswa_id" ,'=',Auth::user()->mahasiswa->id)
            ->select(
                         "krs.semester",
                DB::raw("ROUND(SUM(
                CASE
                    WHEN krs_detail.nilai_huruf = 'A' THEN 4 
                    WHEN krs_detail.nilai_huruf = 'B' THEN 3 
                    WHEN krs_detail.nilai_huruf = 'C' THEN 2 
                    WHEN krs_detail.nilai_huruf = 'D' THEN 1
                    ELSE 0
                    END * mata_kuliah.sks
                ) / SUM(total_sks), 2) as ipk")
            )
            ->groupBy("krs.semester")
            ->get();
         
            $fetch_profil = Mahasiswa::where("id",Auth::user()->mahasiswa->id)->first();
            $fetch_jadwal = DB::table("krs")
            ->join("krs_detail","krs_detail.krs_id","=","krs.id")
            ->join("kelas_mata_kuliah","kelas_mata_kuliah.id","=","krs_detail.kelas_mata_kuliah_id")
            ->join("dosen","dosen.id","=", "kelas_mata_kuliah.dosen_id")
            ->join("mata_kuliah","mata_kuliah.id" ,"=","kelas_mata_kuliah.mata_kuliah_id")
            ->join("pertemuan","pertemuan.kelas_mata_kuliah_id","=","kelas_mata_kuliah.id")
            ->where("krs.mahasiswa_id","=",Auth::user()->mahasiswa->id)
            ->where("pertemuan.tanggal", now()->toDateString())            
            ->select("mata_kuliah.nama_mata_kuliah","pertemuan.tanggal","dosen.nama_dosen","kelas_mata_kuliah.jam_selesai",
            "kelas_mata_kuliah.jam_mulai","mata_kuliah.sks")
            ->get();
         
            return Inertia::render('Dashboard/DashboardMahasiswa',[
                "data_total_sks_ipk"=>$fetch_total_sks_ipk,
                "data_jadwal"=>$fetch_jadwal,
                "data_profile"=>$fetch_profil,
                "data_ips"=>$fetch_ips,
            ]);
    }

    public function dashboard_admin(){
        $fetch_total_mahasiswa = Mahasiswa::count();
        $fetch_total_dosen = Dosen::count();
        $fetch_total_mata_kuliah = MataKuliah::count();
        $fetch_total_fakultas = Fakultas::count();   
        $fetch_total_prodi = Prodi::count();
        $fetch_total_krs = KelasMataKuliah::count();

        $fetch_mahasiswa_dosen_fakultas = Fakultas::withCount(["mahasiswa as total_mahasiswa","dosen as total_dosen"])->get();
      
        
        $fetch_mahasiswa_angkatan =Mahasiswa::select("angkatan")
        ->selectRaw('COUNT(*) as total')
        ->groupBy('angkatan')
        ->orderBy("angkatan","DESC")
        ->get();
        
        $fetch_pendapatan_fakultas = Fakultas::select('fakultas.id','fakultas.nama_fakultas')
            ->selectRaw('COALESCE(SUM(golongan_ukt.nominal),0) as total_pendapatan')
            ->leftJoin('mahasiswa', 'fakultas.id', '=', 'mahasiswa.fakultas_id')
            ->leftJoin('golongan_ukt', 'mahasiswa.golongan_ukt_id', '=', 'golongan_ukt.id')
            ->groupBy('fakultas.id','fakultas.nama_fakultas')
            ->orderBy('total_pendapatan','DESC')
            ->get();
            
            return Inertia::render("Dashboard/DashboardAdmin",[
            "data_total_mahasiswa"=>$fetch_total_mahasiswa,
            "data_total_dosen"=>$fetch_total_dosen,
            "data_total_mata_kuliah"=>$fetch_total_mata_kuliah,
            "data_total_fakultas"=>$fetch_total_fakultas,        
            "data_total_prodi"=>$fetch_total_prodi,
            "data_total_krs"=>$fetch_total_krs,
            "data_total_mahasiswa_dosen_group_fakultas"=>$fetch_mahasiswa_dosen_fakultas,
            "data_total_mahasiswa_group_angkatan"=>$fetch_mahasiswa_angkatan,
            "data_total_pendapatan_group_fakultas"=>$fetch_pendapatan_fakultas
        ]);
    }
}