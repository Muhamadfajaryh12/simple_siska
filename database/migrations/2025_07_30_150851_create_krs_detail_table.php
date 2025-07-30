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
        Schema::create('krs_detail', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("krs_id");
            $table->unsignedBigInteger("mata_kuliah_id");
            $table->foreign("krs_id")->references( "id")->on("krs")->onDelete("cascade");
            $table->foreign("mata_kuliah_id")->references( "id")->on("mata_kuliah")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('krs_detail');
    }
};