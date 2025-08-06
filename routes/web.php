<?php

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dosen\DosenController;
use App\Http\Controllers\Fakultas\FakultasController;
use App\Http\Controllers\Kelas\KelasController;
use App\Http\Controllers\KRS\KRSController;
use App\Http\Controllers\Mahasiswa\MahasiswaController;
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

Route::middleware(['auth','checkRole:Admin'])->group(function(){

    Route::prefix("/fakultas")->group(function(){
        Route::get('/',[FakultasController::class,'index'])->name('fakultas.index');
        Route::get('/form',[FakultasController::class,'create'])->name('fakultas.create');
        Route::get('/form/{id}',[FakultasController::class,'update'])->name('fakultas.update');

        Route::post('/store',[FakultasController::class,'store'])->name('fakultas.store');
        Route::put('/edit/{id}',[FakultasController::class,'edit'])->name('fakultas.edit');
        Route::delete("/{id}",[FakultasController::class,"destroy"])->name("fakultas.destroy");
    });
    
    Route::prefix("prodi")->group(function(){
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
    
    Route::prefix("/kelas")->group(function(){
        Route::get('/',[KelasController::class,'index'])->name('kelas.index');   
        Route::get('/form',[KelasController::class,'create'])->name('kelas.create');
        Route::post('/store',[KelasController::class,'store'])->name('kelas.store');
    });
    
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