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
        Schema::create('golongan_ukt', function (Blueprint $table) {
            $table->id();
            $table->string("golongan"); 
            $table->string("nominal");
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
        Schema::dropIfExists('golongan_ukt');
    }
};