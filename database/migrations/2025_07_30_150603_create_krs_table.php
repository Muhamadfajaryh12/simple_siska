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
            $table->enum("status",["disetujui","menunggu","ditolak"]);
            $table->integer("semester");
            $table->string("tahun_ajaran",255);
            $table->unsignedBigInteger("mahasiswa_id");
            $table->foreign("mahasiswa_id")->references("id")->on("mahasiswa")->onDelete("cascade");
            $table->timestamps();
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