<?php

use App\Http\Controllers\Fakultas\FakultasController;
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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/fakultas',[FakultasController::class,'index'])->name('fakultas.index');
Route::get('/fakultas_create',[FakultasController::class,'create'])->name('fakultas.create');
Route::get('/fakultas_update/{id}',[FakultasController::class,'update'])->name('fakultas.update');

Route::post('/fakultas_store',[FakultasController::class,'store'])->name('fakultas.store');
Route::put('/fakultas_change/{id}',[FakultasController::class,'change'])->name('fakultas.change');


Route::get('/prodi',[ProdiController::class,'index'])->name('prodi.index');
Route::get('/prodi_create',[ProdiController::class,'create'])->name('prodi.create');
Route::post('/prodi_store',[ProdiController::class,'store'])->name('prodi.store');


Route::get('/user_create',[UserController::class,'create'])->name('user.create');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';