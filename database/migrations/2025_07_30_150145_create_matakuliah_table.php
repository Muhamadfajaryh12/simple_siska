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
            $table->string("nama_mata_kuliah",255);
            $table->string("kode_mata_kuliah",255);
            $table->integer("sks");
            $table->integer("semester");
            $table->unsignedBigInteger("prodi_id");
            $table->foreign("prodi_id")->references("id")->on("prodi")->onDelete("cascade");
            $table->timestamps();
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