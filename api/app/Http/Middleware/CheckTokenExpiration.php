<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckTokenExpiration
{
    public function handle(Request $request, Closure $next)
    {
        $token = DB::table('personal_access_tokens')->where('token', $request->bearerToken())->first();
        if ($token && $token->expires_at < now()) {
            DB::table('personal_access_tokens')->where('id', $token->id)->delete();


            return response()->json(['message' => 'Usuario expirado, por favor efetue o login novamente.'], 401);
        }

        return $next($request);
    }
}
