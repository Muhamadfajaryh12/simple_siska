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
        Schema::create('krs', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->int('id_mata_kuliah');
            $table->int('id_user');
            $table->int('nilai_angka');
            $table->string('nilai_huruf');
            $table->foreign('id_mata_kuliah')->references('id')->on('mata_kuliah');
            $table->foreign('id_user')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('krs');
    }
};