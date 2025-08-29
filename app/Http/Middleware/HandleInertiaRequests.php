<?php

namespace App\Http\Middleware;

use App\Models\SemesterAjaran;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $tahunAjaranAktif = SemesterAjaran::where("status","aktif")->first();
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'tahun_ajaran'=>$tahunAjaranAktif->semester_ajaran
            ],    
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error'=> fn() => $request->session()->get('error')
            ],
        ];
    }
}