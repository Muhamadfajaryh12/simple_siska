<?php

namespace App\Http\Controllers\Prodi;

use App\Http\Controllers\Controller;
use App\Models\Prodi;
use Illuminate\Http\Request;

class ProdiController extends Controller
{
    public function store (Request $request){

        $validation_prodi = $request->validate([
            'nama_prodi' => 'required|string|max:255',
            'kode_prodi' => 'required|string|max:255|unique:prodi,kode_prodi',
            'id_fakultas' => 'required|integer'
        ]);
        Prodi::create($validation_prodi);
    }
}