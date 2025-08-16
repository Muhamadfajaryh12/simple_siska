<?php

namespace App\Http\Controllers;

use App\Models\GolonganUkt;
use App\Models\Prodi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GolonganUktController extends Controller
{

    public function index(){
        $fetch_golongan_ukt = GolonganUkt::with('prodi')->get();
        $fetch_prodi = Prodi::all();
        return Inertia::render("GolonganUkt/GolonganUkt",[
            "data_golongan_ukt"=> $fetch_golongan_ukt,
            "data_prodi"=>$fetch_prodi
        ]);
    }
    public function create(){
        $fetch_prodi = Prodi::all();
        return Inertia::render("GolonganUkt/CreateGolonganUkt",[
            "data_prodi"=>$fetch_prodi
        ]);
    }

    public function store (Request $request){
        try{
            $validation = $request->validate([
                "data.*.prodi_id" =>"required",
                "data.*.golongan"=>"required",
                "data.*.nominal"=>"required"
            ]);

            GolonganUkt::insert($validation['data']);
            return redirect()->back()->with('success',"berhasil");
        }
        catch(\Exception $e){
            return redirect()->back()->with('error',$e->getMessage());
        }
    }
}