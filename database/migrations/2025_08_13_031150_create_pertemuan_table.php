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
        Schema::create('pertemuan', function (Blueprint $table) {
            $table->id();
            $table->string("pertemuan_ke");
            $table->date("tanggal");
            $table->string("materi")->nullable();
            $table->unsignedBigInteger("kelas_mata_kuliah_id"); 
            $table->foreign("kelas_mata_kuliah_id")->references("id")->on("kelas_mata_kuliah")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pertemuan');
    }
};