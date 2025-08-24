<?php

use App\Http\Controllers\AbsenController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dosen\DosenController;
use App\Http\Controllers\Fakultas\FakultasController;
use App\Http\Controllers\GolonganUktController;
use App\Http\Controllers\Kelas\KelasController;
use App\Http\Controllers\KelasMataKuliahController;
use App\Http\Controllers\KRS\KRSController;
use App\Http\Controllers\Mahasiswa\MahasiswaController;
use App\Http\Controllers\Matakuliah\MatakuliahController;
use App\Http\Controllers\Nilai;
use App\Http\Controllers\NilaiController;
use App\Http\Controllers\PertemuanController;
use App\Http\Controllers\Prodi\ProdiController;
use App\Http\Controllers\SemesterAjaranController;
use App\Http\Controllers\UktController;
use App\Http\Controllers\TugasController;
use App\Http\Controllers\TugasMahasiswaController;
use App\Http\Controllers\User\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['auth','checkRole:Admin'])->group(function(){

    Route::prefix("/fakultas")->group(function(){
        Route::get('/',[FakultasController::class,'index'])->name('fakultas.index');
        Route::get('/form',[FakultasController::class,'create'])->name('fakultas.create');
        Route::get('/form/{id}',[FakultasController::class,'update'])->name('fakultas.update');

        Route::post('/store',[FakultasController::class,'store'])->name('fakultas.store');
        Route::put('/edit/{id}',[FakultasController::class,'edit'])->name('fakultas.edit');
        Route::delete("/{id}",[FakultasController::class,"destroy"])->name("fakultas.destroy");
    });
    
    Route::prefix("program_studi")->group(function(){
        Route::get('/',[ProdiController::class,'index'])->name('prodi.index');
        Route::get('/form',[ProdiController::class,'create'])->name('prodi.create');
        Route::get('/form/{id}',[ProdiController::class,'edit_index'])->name("prodi.update");
        
        Route::post('/store',[ProdiController::class,'store'])->name('prodi.store');
        Route::put('/{id}',[ProdiController::class,'edit'])->name("prodi.edit");
        Route::delete('/{id}',[ProdiController::class,'destroy'])->name("prodi.destroy");
    });

    Route::get('/user_create',[UserController::class,'create'])->name('user.create');
    Route::post('/user_store',[UserController::class,'store'])->name('user.store');
    
    Route::prefix("mahasiswa")->group(function(){
        Route::get('/',[MahasiswaController::class,'index'])->name('mahasiswa.index');
        Route::get('/form',[MahasiswaController::class,'create_index'])->name('mahasiswa.create');
        Route::get("/form/{id}",[MahasiswaController::class,"update_index"])->name("mahasiswa.update");

        Route::post("/store",[MahasiswaController::class,"store"])->name("mahasiswa.store");
        Route::put('/{id}',[MahasiswaController::class,"edit"])->name("mahasiswa.edit");
        Route::delete('/{id}',[MahasiswaController::class,"delete"])->name("mahasiswa.delete");
    });
    
    Route::prefix("dosen")->group(function(){
        Route::get('/',[DosenController::class,'index'])->name('dosen.index');
        Route::get("/form",[DosenController::class,"create_index"])->name("dosen.create");
        Route::get('/form/{id}',[DosenController::class,"update_index"])->name("dosen.update");

        Route::post('/store',[DosenController::class,"store"])->name("dosen.store");
        Route::put('/{id}',[DosenController::class,"edit"])->name("dosen.edit");
        Route::delete('/{id}',[DosenController::class,"delete"])->name("dosen.delete");
    });
    

    Route::prefix("/mata_kuliah")->group(function(){
        Route::get('/',[MatakuliahController::class,'index'])->name('matakuliah.index');
        Route::get('/form',[MatakuliahController::class,'create'])->name('matakuliah.create');
        Route::get('/form/{id}',[MatakuliahController::class,"update"])->name("mata_kuliah.update");
    
        Route::post('/store',[MatakuliahController::class,'store'])->name('mata_kuliah.store');
        Route::put('/{id}',[MatakuliahController::class,"edit"])->name('mata_kuliah.edit');
        Route::delete('/{id}',[MatakuliahController::class,"destroy"])->name('mata_kuliah.destroy');

    });

    Route::prefix("kelas_mata_kuliah")->group(function(){
        Route::get("/",[KelasMataKuliahController::class,"index"])->name("kelas_mata_kuliah.index");
        Route::get("/form",[KelasMataKuliahController::class,"create_index"])->name("kelas_mata_kuliah.create");
        Route::get('/form/{id}',[KelasMataKuliahController::class,"update_index"])->name("kelas_mata_kuliah.update");

        Route::post("/",[KelasMataKuliahController::class,"store"])->name("kelas_mata_kuliah.store");
        Route::put('/{id}',[KelasMataKuliahController::class,"edit"])->name("kelas_mata_kuliah.edit");
        Route::delete("/{id}",[KelasMataKuliahController::class,"destroy"])->name("kelas_mata_kuliah.destroy");

    });

    Route::prefix("/kelas")->group(function(){
        Route::get('/',[KelasController::class,'index'])->name('kelas.index');   
        Route::get('/form',[KelasController::class,'create'])->name('kelas.create');
        Route::get("/form/{id}",[KelasController::class,"update"])->name("kelas.update");
        Route::get("/{id}",[KelasController::class,"detail_index"])->name("kelas.detail");
        
        Route::post('/store',[KelasController::class,'store'])->name('kelas.store');
        Route::put("/{id}",[KelasController::class,"edit"])->name("kelas.edit");
        Route::delete('/{id}',[KelasController::class,"destroy"])->name("kelas.destroy");
    });
    

    Route::prefix("/golongan_ukt")->group(function(){
        Route::get('/',[GolonganUktController::class,"index"])->name("golongan_ukt.index");
        Route::get('/form',[GolonganUktController::class,"create"])->name("golongan_ukt.create");

        Route::post('/',[GolonganUktController::class,"store"])->name("golongan_ukt.store");
    });
    
    Route::get('admin/dashboard',[DashboardController::class,"dashboard_admin"])->name("dashboard.admin");

    Route::prefix("/tahun_ajaran")->group(function(){
        Route::get("/",[SemesterAjaranController::class,"index"])->name("tahun_ajaran.index");
        Route::post('/',[SemesterAjaranController::class,"store"])->name("tahun_ajaran.store");
        Route::put('/{id}',[SemesterAjaranController::class,"edit"])->name("tahun_ajaran.edit");
    });

    Route::prefix("/ukt")->group(function(){
        Route::get("/",[UktController::class,"admin_index"])->name("ukt.admin_index");
    });
});
//DOSEN
Route::middleware(["auth",'checkRole:Dosen'])->group(function(){
    Route::prefix("/krs")->group(function(){
        Route::get('/verifikasi',[KRSController::class,'index_dosen'])->name('krs_dosen.index');
        Route::get('/verifikasi/{id}',[KRSController::class,'index_verifikasi'])->name('krs_dosen.verifikasi');
        Route::get('/penilaian_krs/{id}',[KRSController::class,'index_penilaian'])->name('krs_dosen.penilaian');

        Route::put('/verifikasi_krs/{id}',[KrsController::class,'verifikasi'])->name('krs.verifikasi');
        Route::post('/penilaian_krs',[KrsController::class,'penilaian'])->name('krs.penilaian');
        // Route::get('/dashboard',[DashboardController::class,'dashboard_dosen'])->name('dashboard.dosen');
    });

    Route::prefix("/nilai")->group(function(){
        Route::get("/",[NilaiController::class,"index_nilai_dosen"])->name("nilai_dosen.index");
        Route::get("/{id}",[NilaiController::class,"index_detail_kelas_nilai"])->name("nilai_dosen.detail");

        Route::post("/",[NilaiController::class,"store"])->name("nilai.store");
    });        Route::put("/",[NilaiController::class,"edit"])->name("nilai.edit");

    
    Route::prefix("kelas_mengajar")->group(function(){
        Route::get('/',[KelasMataKuliahController::class,"kelas_mengajar_index"])->name("kelas_mengajar.index");
        Route::get('/{id}',[KelasMataKuliahController::class,"kelas_mengajar_detail"])->name("kelas_mengajar.detail");

        Route::put('/{id}',[PertemuanController::class,"edit"])->name("pertemuan.edit");
    });


    Route::prefix("/tugas")->group(function(){
        Route::post('/',[TugasController::class,"store"])->name("tugas.store");
    });

    Route::prefix("/tugas_nilai")->group(function(){
        Route::put('/',[TugasMahasiswaController::class,"edit_nilai"])->name("tugas_mahasiswa_nilai.edit");
    });

    // Route::prefix('/dashboard')->group(function(){
    //     Route::get('/',[DashboardController::class,"dashboard_dosen"])->name("dashboard.dosen");
    // });
});

Route::prefix("mahasiswa")->middleware(['auth','checkRole:Mahasiswa'])->group(function(){
    // Route::get('/dashboard',[DashboardController::class,'dashboard_mahasiswa'])->name('dashboard');

    Route::prefix("/jadwal")->group(function(){
        Route::get('/',[PertemuanController::class,"jadwal_perkuliahan_mahasiswa"])->name("jadwal_perkuliahan_mahasiswa.index");
    });

    Route::prefix("/kartu_rencana_studi")->group(function(){
        Route::get('/',[KRSController::class,'index'])->name('krs_mahasiswa.index');
        Route::post('/',[KRSController::class,'store'])->name('krs_mahasiswa.store');
        Route::get('/history',[KRSController::class,'index_krs_history'])->name('krs_mahasiswa.history');
    });

    Route::prefix("absensi")->group(function(){
        Route::post('/',[AbsenController::class,"store"])->name("absen.store");
    });

    Route::prefix("tugas")->group(function(){
        Route::get('/',[TugasController::class,"tugas_kuliah_mahasiswa_index"])->name("tugas_kuliah_mahasiswa.index");
        Route::post('/{id}',[TugasMahasiswaController::class,"edit"])->name("tugas_mahasiswa.edit");

    });

    Route::prefix("profile")->group(function(){
        Route::get('/',[MahasiswaController::class,"profile_index"])->name("profile.index");
        Route::put('/{id}',[MahasiswaController::class,"edit"])->name("profile.edit");
    });

    Route::prefix("tagihan_ukt")->group(function(){
        Route::get("/",[UktController::class,"mahasiswa_index"])->name("tagihan_ukt.mahasiswa_index");
    });
    Route::put("/change_password",[UserController::class,"change_password"])->name("change_password");
});

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';