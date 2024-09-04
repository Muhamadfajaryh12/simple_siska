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
            $table->unsignedBigInteger('id_mata_kuliah');
            $table->unsignedBigInteger('id_user');
            $table->integer('nilai_angka');
            $table->string('nilai_huruf');
            $table->foreign('id_mata_kuliah')->references('id')->on('mata_kuliah')->onDelete('cascade');
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
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