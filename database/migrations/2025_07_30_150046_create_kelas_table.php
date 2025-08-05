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
        Schema::create('kelas', function (Blueprint $table) {
            $table->id();
            $table->string("kelas");
            $table->unsignedBigInteger("prodi_id");
            $table->unsignedBigInteger("dosen_id");
            $table->foreign("prodi_id")->references(columns: "id")->on("prodi")->onDelete("cascade");
            $table->foreign("dosen_id")->references(columns: "id")->on("dosen")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kelas');
    }
};