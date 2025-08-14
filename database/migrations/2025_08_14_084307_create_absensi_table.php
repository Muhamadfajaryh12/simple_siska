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
        Schema::create('absensi', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("mahasiswa_id");
            $table->unsignedBigInteger("pertemuan_id");
            $table->enum('status', ['hadir', 'izin', 'sakit', 'alpha'])->default('hadir');
            $table->foreign("mahasiswa_id")->references("id")->on("mahasiswa")->onDelete("cascade");
            $table->foreign("pertemuan_id")->references("id")->on("pertemuan")->onDelete("cascade");
            $table->timestamp('waktu_absen')->nullable();
            $table->timestamps();        
            $table->unique(['mahasiswa_id', 'pertemuan_id']);
            $table->index('mahasiswa_id');
            $table->index('pertemuan_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absensi');
    }
};