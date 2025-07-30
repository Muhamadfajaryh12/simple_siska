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
        if ($role == "dosen" && auth()->user()->role != "Dosen" ) {
            abort(403);
        }
        if ($role == "mahasiswa" && auth()->user()->role != "Mahasiswa" ) {
            abort(403);
        }
        if ($role == "admin" && auth()->user()->role != 'Admin'){
            abort(403);
        }
        return $next($request);
    }
}