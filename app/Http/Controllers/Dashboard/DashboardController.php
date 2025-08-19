<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\KelasMataKuliah;
use App\Models\KRS;
use App\Models\Mahasiswa;
use App\Models\Matakuliah;
use App\Models\Prodi;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard_dosen(){
        $fetch_mata_kuliah = Matakuliah::count();
        $fetch_fakultas = Fakultas::count();
        $fetch_prodi = Prodi::count();
        $fetch_dosen = User::where('status','dosen')->get();
        $fetch_mahasiswa = User::where('status','mahasiswa')->get();

        return Inertia::render('Dashboard/DashboardDosen',[
            'data_mata_kuliah'=>$fetch_mata_kuliah,
            'data_fakultas'=>$fetch_fakultas,
            'data_prodi'=>$fetch_prodi,
            'data_dosen'=>$fetch_dosen,
            'data_mahasiswa'=>$fetch_mahasiswa
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