<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function create(){
        return Inertia::render('User/FormCreateUser');
    }

    public function store(Request $request){
        $request->validate([
            'nama'=>'required|string|max:255',
            'nomor_induk'=>'required|number|max:16|min:16',
            'email'=>'required|string',
            'password'=>'required|string',
            'status'=>'required',
            'jenis_kelamin'=>'required'
        ]);

        $user = User::create([
            'nama'=>$request->nama,
            'nomor_induk'=>$request->nomor_induk,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'status'=>$request->status,
            'jenis_kelamin'=>$request->jenis_kelamin
        ]);
        
    }
}