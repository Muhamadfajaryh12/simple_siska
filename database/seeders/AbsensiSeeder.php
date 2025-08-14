<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AbsensiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $data = [
            [
                'mahasiswa_id' => 1,
                'pertemuan_id' => 1,
                'status' => 'hadir',
                'waktu_absen' => Carbon::now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
        DB::table('absensi')->insert($data);

    }
}