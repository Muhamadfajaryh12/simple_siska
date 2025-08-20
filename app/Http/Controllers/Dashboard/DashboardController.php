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

            return Inertia::render('Dashboard/DashboardMahasiswa');
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