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
        Schema::create('dosen', function (Blueprint $table) {
            $table->id();
            $table->string("nama_dosen",255);
            $table->string("nip",255)->unique();
            $table->unsignedBigInteger("fakultas_id");
            $table->unsignedBigInteger("prodi_id");
            $table->unsignedBigInteger("user_id");
            $table->foreign("fakultas_id")->references("id")->on("fakultas")->onDelete("cascade");
            $table->foreign("prodi_id")->references("id")->on("prodi")->onDelete("cascade");
            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dosen');
    }
};