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
    public function create(){
        $fetch = Fakultas::all();
        return Inertia::render('Prodi/CreateProdi',[
            'fakultas'=> $fetch
        ]);
    }

    public function edit_index($id){
        $fetch_fakultas = Fakultas::all();
        $fetch_program_studi = Prodi::findOrFail($id);
        return Inertia::render('Prodi/UpdateProdi',[
            'data_fakultas'=> $fetch_fakultas,
            'data_prodi' => $fetch_program_studi
        ]);
    }

    public function store(ProdiRequest $request){
        Prodi::create($request->validated());
    }

    public function update (ProdiRequest $request, $id) {
        $selectData = Prodi::findOrFail($id);
        $selectData->update($request->validated());
    }

    public function delete($id){
        $selectData = Prodi::findOrFail($id);
        $selectData->delete();
    }
    
}