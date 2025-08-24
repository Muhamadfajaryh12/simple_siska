<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use App\Models\SemesterAjaran;
use App\Models\Ukt;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SemesterAjaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fetch_semester_ajaran = SemesterAjaran::all();
        return Inertia::render("TahunAjaran/TahunAjaran",[
            "data_semester_ajaran"=>$fetch_semester_ajaran
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $validation = $request->validate([
                "semester_ajaran"=>"required"
            ]);

            SemesterAjaran::create([
                "semester_ajaran"=>$validation["semester_ajaran"],
                "status"=>"nonaktif"
            ]);

            return redirect()->back()->with("success","Berhasil menambahkan semester ajaran");

        }catch(\Exception $e){
            return redirect()->back()->with("error",$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function update(string $id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function edit( $id)
    {
        try{

            SemesterAjaran::where("status","aktif")->update([
                "status"=>"nonaktif"
            ]);
            
            $semester_ajaran = SemesterAjaran::findOrFail($id);
            $semester_ajaran->update([
                "status"=>"aktif"
            ]);

            $mahasiswa = Mahasiswa::all();

            foreach($mahasiswa as $item){
                $item->update([
                    "semester"=> $item->semester + 1
                ]);
                
                Ukt::create([
                    "semester_ajaran_id"=>$id,
                    "mahasiswa_id"=>$item->id
                ]);
            }

            return redirect()->back()->with("success","Berhasil mengganti tahun ajaran");
        }catch(\Exception $e){
            return redirect()->back()->with("error",$e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}