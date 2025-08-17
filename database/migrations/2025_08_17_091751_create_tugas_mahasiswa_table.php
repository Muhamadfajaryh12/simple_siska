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
        Schema::create('tugas_mahasiswa', function (Blueprint $table) {
            $table->id();
            $table->text("file_pengumpulan")->nullable();
            $table->integer("nilai")->nullable();
            $table->enum("status",["menunggu","selesai"]);
            $table->date("submit_date")->nullable();
            $table->unsignedBigInteger("tugas_id");
            $table->unsignedBigInteger("mahasiswa_id");
            $table->foreign("tugas_id")->references("id")->on("tugas")->onDelete("cascade");
            $table->foreign("mahasiswa_id")->references("id")->on("mahasiswa")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tugas_mahasiswa');
    }
};