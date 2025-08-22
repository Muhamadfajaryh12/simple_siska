<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Fakultas;
use App\Models\Prodi;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class UserController extends Controller
{   
    public function create(){
        $fetch= Prodi::all();

        return Inertia::render('User/FormCreateUser',[
            'prodi'=>$fetch
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
        try{
            User::create([
                'nama'=>$request->nama,
                'nomor_induk'=>$request->nomor_induk,
                'email'=>$request->email,
                'password'=>Hash::make($request->password),
                'status'=>$request->status,
                'jenis_kelamin'=>$request->jenis_kelamin,
                'id_prodi'=>$request->id_prodi
            ]);
            return redirect()->route('user.create')->with([
                'message' => 'User berhasil ditambahkan.',
                'status' => 'success'
            ]);
        }
        catch(\Exception $e){
            return redirect()->back()->with([
            'message' => 'Terjadi kesalahan saat menambahkan user.',
            'status' => 'error'
            ]);       
        }
    }

    public function change_password(Request $request){
        try{
            $validation = $request->validate([
                "password_new" => "required",
                "password_old"=>"required"
            ]);

            $user = User::findOrFail(Auth::user()->id);

            if (!Hash::check($validation["password_old"], $user->password)) {
                return redirect()->back()->with("error", "Password lama tidak sesuai");
            }   

            $user->update([
                "password"=>Hash::make($validation["password_new"])
            ]);
            return redirect()->back()->with("success","Berhasil mengganti password");
        }catch(\Exception $e){
            return redirect()->back()->with("error",$e->getMessage());
        }
    }
}