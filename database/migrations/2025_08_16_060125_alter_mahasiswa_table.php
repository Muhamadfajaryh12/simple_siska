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
        Schema::table("mahasiswa",function (Blueprint $table)
        {   
            $table->integer("semester")->default(1)->after("angkatan");
            $table->unsignedBigInteger("golongan_ukt_id")->nullable()->after("kelas_id");
            $table->foreign("golongan_ukt_id")->references("id")->on("golongan_ukt")->onDelete("cascade");
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