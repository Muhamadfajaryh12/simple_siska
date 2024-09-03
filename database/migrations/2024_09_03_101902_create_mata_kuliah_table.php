<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mata_kuliah', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('nama_mata_kuliah');
            $table->timestamps('jadwal');
            $table->int('sks');
            $table->int('semester');
            $table->int('id_kelas');
            $table->int('id_fakultas');
            $table->int('id_prodi');
            $table->int('id_dosen')->nullable();
            $table->foreign('id_kelas')->references('id')->on('kelas');
            $table->foreign('id_fakultas')->references('id')->on('fakultas');
            $table->foreign('id_prodi')->references('id')->on('prodi');
            $table->foreign('id_dosen')->references('id')->on('users');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mata_kuliah');
    }
};