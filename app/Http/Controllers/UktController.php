<?php

namespace App\Http\Controllers;

use App\Models\Prodi;
use App\Models\SemesterAjaran;
use App\Models\Ukt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UktController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function admin_index()
    {
        $fetch_tagihan_ukt = Ukt::with(["mahasiswa.prodi","semester_ajaran"])->get();
        $fetch_prodi = Prodi::all();
        $fetch_semester_ajaran = SemesterAjaran::all();
        return Inertia::render("Ukt/Admin/TagihanUkt",[
            "data_tagihan_ukt"=>$fetch_tagihan_ukt,
            "data_prodi"=>$fetch_prodi,
            "data_semester_ajaran"=>$fetch_semester_ajaran
        ]);
    }

    public function mahasiswa_index(){
        $fetch_tagihan_ukt = Ukt::with(["mahasiswa.prodi","mahasiswa.golongan_ukt","semester_ajaran"])->where("mahasiswa_id",Auth::user()->mahasiswa->id)->get();

        return Inertia::render("Ukt/Mahasiswa/TagihanUkt",[
            "data_tagihan_ukt"=>$fetch_tagihan_ukt
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
        //
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}