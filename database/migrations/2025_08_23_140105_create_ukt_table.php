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
        Schema::create('ukt', function (Blueprint $table) {
            $table->id();
            $table->string("semester");
            $table->date("tanggal_pembayaran");
            $table->string("nominal_pembayaran");
            $table->unsignedBigInteger("mahasiswa_id");
            $table->enum("status",["lunas","belum lunas"])->default("belum lunas");
            $table->foreign("mahasiswa_id")->references("id")->on("mahasiswa")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ukt');
    }
};