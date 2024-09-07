<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Fakultas;
use App\Models\Prodi;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function create(){
        $fetch= Prodi::all();

        return Inertia::render('User/FormCreateUser',[
            'prodi'=>$fetch
        ]);
    }

    public function mahasiswaIndex () {
        $fetch_mahasiswa = User::with('prodi') 
        ->where('status', 'Mahasiswa') 
        ->get(); 
        $fetch_prodi = Prodi::all();

        return Inertia::render('User/Mahasiswa/Mahasiswa', [
        'data' => $fetch_mahasiswa,
        'data_prodi'=>$fetch_prodi
        ]);
    }

    public function dosenIndex () {
        $fetch_dosen = User::with('prodi') 
        ->where('status', 'Dosen') 
        ->get(); 
        $fetch_prodi = Prodi::all();

        return Inertia::render('User/Dosen/Dosen', [
        'data' => $fetch_dosen,
        'data_prodi'=>$fetch_prodi
        ]);
    }
    public function store(Request $request){
        $request->validate([
            'nama'=>'required|string|max:255',
            'nomor_induk'=>'required|string',
            'email'=>'required|string',
            'password'=>'required|string',
            'status'=>'required',
            'jenis_kelamin'=>'required',
            'id_prodi'=>'required'
        ]);

        User::create([
            'nama'=>$request->nama,
            'nomor_induk'=>$request->nomor_induk,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'status'=>$request->status,
            'jenis_kelamin'=>$request->jenis_kelamin,
            'id_prodi'=>$request->id_prodi
        ]);
        
    }
}