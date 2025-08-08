<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Fakultas;
use App\Models\KRS;
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
}