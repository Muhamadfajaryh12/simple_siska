<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard_dosen(){
        $fetch_data = User::all();
        return Inertia::render('Dashboard/DosenDashboard',[
            'datas'=>$fetch_data
        ]);
    }
}