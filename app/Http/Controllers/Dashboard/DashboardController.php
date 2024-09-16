<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\KRS;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard_dosen(){
        $fetch_data = User::all();
        return Inertia::render('Dashboard/DosenDashboard',[
            'datas'=>$fetch_data
        ]);
    }

    public function dashboard_mahasiswa(){
        $fetch_data = KRS::with('mata_kuliah')
        ->where('id_user',Auth::user()->id)->get();
            return Inertia::render('Dashboard/DashboardMahasiswa',[
            'data_krs'=>$fetch_data
        ]);
    }
}