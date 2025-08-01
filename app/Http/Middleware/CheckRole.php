<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role)
    {
        if ($role == "Dosen" && auth()->user()->role != "Dosen" ) {
            abort(403);
        }
        if ($role == "Mahasiswa" && auth()->user()->role != "Mahasiswa" ) {
            abort(403);
        }
        if ($role == "Admin" && auth()->user()->role != 'Admin'){
            abort(403);
        }
        return $next($request);
    }
}