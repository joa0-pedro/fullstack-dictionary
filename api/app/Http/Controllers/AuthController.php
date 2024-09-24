<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\AuthenticatorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function signUp(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
        ]);

        User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        unset($validatedData['name']);

        $tokenData = AuthenticatorService::authenticate($validatedData);

        if (!$tokenData) {
            return response()->json(['error' => 'Credenciais inválidas'], 401);
        }

        return response()->json([
            'id' => $tokenData['user']->id,
            'name' => $tokenData['user']->name,
            'token' => $tokenData['token']
        ], 201);
    }

    public  function signIn(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $tokenData = AuthenticatorService::authenticate($credentials);

        if (!$tokenData) {
            return response()->json(['error' => 'Credenciais inválidas'], 401);
        }

        return response()->json([
            'id' => $tokenData['user']->id,
            'name' => $tokenData['user']->name,
            'token' => $tokenData['token']
        ], 200);
    }

    public function logout(Request $request)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['error' => 'Token não fornecido.'], 401);
        }

        $user = $request->user();

        DB::table('personal_access_tokens')->where('user_id', $user->id)->delete();

        return response()->json(['message' => 'Logout realizado com sucesso.'], 200);
    }
}
