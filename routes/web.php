<?php

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Fakultas\FakultasController;
use App\Http\Controllers\Kelas\KelasController;
use App\Http\Controllers\KRS\KRSController;
use App\Http\Controllers\Matakuliah\MatakuliahController;
use App\Http\Controllers\Prodi\ProdiController;
use App\Http\Controllers\ProfileController;
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

// Route::get('/', function () {
//     // return Inertia::render('Welcome', [
//     //     'canLogin' => Route::has('login'),
//     //     'canRegister' => Route::has('register'),
//     //     'laravelVersion' => Application::VERSION,
//     //     'phpVersion' => PHP_VERSION,
//     // ]);

//     return Inertia::render('login');
// });


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth','checkRole:Dosen'])->group(function(){
    Route::get('/fakultas',[FakultasController::class,'index'])->name('fakultas.index');
    Route::get('/fakultas_create',[FakultasController::class,'create'])->name('fakultas.create');
    Route::get('/fakultas_update/{id}',[FakultasController::class,'update'])->name('fakultas.update');
    
    Route::post('/fakultas_store',[FakultasController::class,'store'])->name('fakultas.store');
    Route::put('/fakultas_change/{id}',[FakultasController::class,'change'])->name('fakultas.change');
    
    
    Route::get('/prodi',[ProdiController::class,'index'])->name('prodi.index');
    Route::get('/prodi_create',[ProdiController::class,'create'])->name('prodi.create');
    Route::post('/prodi_store',[ProdiController::class,'store'])->name('prodi.store');
    
    
    Route::get('/user_create',[UserController::class,'create'])->name('user.create');
    Route::post('/user_store',[UserController::class,'store'])->name('user.store');
    
    Route::get('/mahasiswa',[UserController::class,'mahasiswaIndex'])->name('user.mahasiswaIndex');
    Route::get('/dosen',[UserController::class,'dosenIndex'])->name('user.dosenIndex');
    
    
    Route::get('/matakuliah',[MatakuliahController::class,'index'])->name('matakuliah.index');
    Route::get('/matakuliah_create',[MatakuliahController::class,'create'])->name('matakuliah.create');
    Route::post('/matakuliah_store',[MatakuliahController::class,'store'])->name('matakuliah.store');
    
    Route::get('/kelas_create',[KelasController::class,'create'])->name('kelas.create');
    Route::post('/kelas_store',[KelasController::class,'store'])->name('kelas.store');

    Route::get('/verifikasi_krs',[KRSController::class,'index_dosen'])->name('krs_dosen.index');
    Route::get('/verifikasi_krs/{id}/{semester}',[KRSController::class,'index_verifikasi'])->name('krs_dosen.verifikasi');
    Route::get('/penilaian_krs/{id}/{semester}',[KRSController::class,'index_penilaian'])->name('krs_dosen.penilaian');

    Route::post('/verifikasi_krs',[KrsController::class,'verifikasi'])->name('krs.verifikasi');
    Route::post('/penilaian_krs',[KrsController::class,'penilaian'])->name('krs.penilaian');
    Route::get('/dashboard_dosen',[DashboardController::class,'dashboard_dosen'])->name('dashboard.dosen');


});

Route::middleware(['auth','checkRole:Mahasiswa'])->group(function(){
    Route::get('/dashboard',[DashboardController::class,'dashboard_mahasiswa'])->name('dashboard');
    Route::get('/krs',[KRSController::class,'index'])->name('krs_mahasiswa.index');
    Route::post('/krs',[KRSController::class,'store'])->name('krs_mahasiswa.store');
    Route::get('/krs_nilai',[KRSController::class,'index_nilai_krs'])->name('krs_mahasiswa.nilai');
    Route::get('/krs_detail',[KRSController::class,'detail'])->name('krs_mahasiswa.detail');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';