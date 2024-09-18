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

    public function update($id){
        $fetch = Fakultas::findOrFail($id);

        return Inertia::render('Fakultas/FormUpdateFakultas',[
            'fakultas'=>$fetch
        ]);
    }
    public function store (Request $request)
    {
        $validation_fakultas = $request->validate([
            'nama_fakultas' => 'required|string|max:255',
            'kode_fakultas' => 'required|string|max:255|unique:fakultas,kode_fakultas'
        ]);
        try{

            Fakultas::create($validation_fakultas);
            return redirect()->route('fakultas.create')->with([
                'message' => 'Fakultas berhasil ditambahkan.',
                'status' => 'success'
            ]);
        }catch(\Exception $e){
            return redirect()->back()->with([
                'message' => 'Terjadi kesalahan saat menambahkan fakultas.',
                'status' => 'error'
                ]); 
        }
    }

    public function change(Request $request, $id){
        $validation_fakultas = $request->validate([
            'nama_fakultas' => 'required|string|max:255',
            'kode_fakultas' => 'required|string|max:255|unique:fakultas,kode_fakultas'
        ]);
    
  
        try {
            $fakultas = Fakultas::findOrFail($id);
            $fakultas->update($validation_fakultas);

        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['update_error' => 'Gagal memperbarui fakultas. Silakan coba lagi.']);
        }
    
    }


    
};