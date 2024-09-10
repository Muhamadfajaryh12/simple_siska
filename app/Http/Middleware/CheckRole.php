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
    public function handle(Request $request, Closure $next, string $status)
    {
        if ($status == 'admin' && auth()->user()->status != 'Dosen' ) {
            abort(403);
        }
        if ($status == 'user' && auth()->user()->status != 'Mahasiswa' ) {
            abort(403);
        }
        return $next($request);
    }
}