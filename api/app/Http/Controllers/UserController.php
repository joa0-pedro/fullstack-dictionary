<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\AuthenticatorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function store(Request $request)
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
}
