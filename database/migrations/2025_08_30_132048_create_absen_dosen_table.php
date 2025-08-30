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
        Schema::create('absen_dosen', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger("pertemuan_id");
            $table->unsignedBigInteger("dosen_id");
            $table->enum("status",["hadir","izin"]);
            $table->foreign("pertemuan_id")->references("id")->on("pertemuan")->onDelete("cascade");
            $table->foreign("dosen_id")->references("id")->on("dosen")->onDelete("cascade"); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absen_dosen');
    }
};