<?php

namespace App\Http\Controllers\Prodi;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProdiRequest;
use App\Models\Fakultas;
use App\Models\Prodi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdiController extends Controller
{

    public function index(){
        $fetch = Prodi::with('fakultas')->get();
        return Inertia::render('Prodi/Prodi',[
            'data' =>$fetch
        ]);
    }
    public function create (){
        $fetch = Fakultas::all();
        return Inertia::render('Prodi/FormCreateProdi',[
            'fakultas'=> $fetch
        ]);
    }

    public function store(ProdiRequest $request){
        Prodi::create($request->validated());
    }

    public function update (ProdiRequest $request, $id) {
        $selectData = Prodi::findOrFail($id);
        $selectData->update($request->validated());
    }
    
}