<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthenticatorService
{

    public static function authenticate(array $data)
    {
        $isValidCredentials = Auth::attempt($data);

        if (!$isValidCredentials) {
            return null;
        }

        $expirationDate = now()->addHours(2);

        $user = Auth::user();

        $token = JWTAuth::fromUser($user);

        DB::table('personal_access_tokens')->insert([
            'type' => 'Bearer',
            'user_id' => $user->id,
            'name' => 'dictionary',
            'token' => $token,
            'expires_at' => $expirationDate
        ]);

        return [
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $expirationDate,
            'user' => $user
        ];
    }
}
