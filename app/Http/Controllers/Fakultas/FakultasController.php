<?php

namespace App\Http\Controllers\Fakultas;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Fakultas;
use Inertia\Inertia;

class FakultasController extends Controller
{

    public function index(){
        $fetch = Fakultas::all();

        return Inertia::render('Fakultas/Fakultas',[
            'data'=>$fetch
        ]);
    }

    public function create(){
        return Inertia::render('Fakultas/FormCreateFakultas');
    }

  
    public function store (Request $request)
    {
        $validation_fakultas = $request->validate([
            'nama_fakultas' => 'required|string|max:255',
            'kode_fakultas' => 'required|string|max:255|unique:fakultas,kode_fakultas'
        ]);
        Fakultas::create($validation_fakultas);
    }

    
};