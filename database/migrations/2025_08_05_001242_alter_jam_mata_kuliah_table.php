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
        Schema::table('mata_kuliah', function (Blueprint $table) {
        $table->string('jam_mulai')->after('jadwal'); 
        $table->string('jam_selesai')->after('jam_mulai'); 
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};