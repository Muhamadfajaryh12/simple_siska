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
            $table->string('jadwal');
            $table->integer('sks');
            $table->integer('semester');
            $table->unsignedBigInteger('id_kelas');
            $table->unsignedBigInteger('id_fakultas');
            $table->unsignedBigInteger('id_prodi');
            $table->unsignedBigInteger('id_dosen');
            $table->foreign('id_kelas')->references('id')->on('kelas')->onDelete('cascade');
            $table->foreign('id_fakultas')->references('id')->on('fakultas')->onDelete('cascade');
            $table->foreign('id_prodi')->references('id')->on('prodi')->onDelete('cascade');
            $table->foreign('id_dosen')->references('id')->on('users')->onDelete('cascade');

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