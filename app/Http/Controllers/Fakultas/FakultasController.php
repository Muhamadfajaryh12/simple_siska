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
        return Inertia::render('Fakultas/CreateFakultas');
    }

    public function update($id){
        $fetch = Fakultas::findOrFail($id);

        return Inertia::render('Fakultas/UpdateFakultas',[
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
         return redirect()->back()->with('success', 'Behasil!');

        }catch(\Exception $e){
         return redirect()->back()->with('error', 'Gagal!');

        }
    }

    public function edit(Request $request, $id){
        $validation_fakultas = $request->validate([
            'nama_fakultas' => 'required|string|max:255',
            'kode_fakultas' => 'required|string|max:255|unique:fakultas,kode_fakultas'
        ]);
    
  
        try {
            $fakultas = Fakultas::findOrFail($id);
            $fakultas->update($validation_fakultas);
             return redirect()->back()->with('success', 'Berhasil!');

        } catch (\Exception $e) {
         return redirect()->back()->with('error', 'Gagal!');
        }
    }

    public function destroy($id){
        try{
            $fakultas = Fakultas::findOrFail($id);
            $fakultas->delete();
            return redirect()->back()->with('success',"Berhasil");
        }catch(\Exception $e){
            return redirect()->back()->with('error',"Gagal");
        }
    }

    
};