<?php

namespace App\Http\Controllers;

use App\Models\FavoriteWord;
use App\Models\History;
use App\Models\User;
use App\Services\AuthenticatorService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        }

        $formattedDate = Carbon::parse($user->created_at)->format('d/m/Y');

        $historyCount = History::where('user_id', $user->id)->count();
        $favoriteWordCount = FavoriteWord::where('user_id', $user->id)->count();

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'created_at' => $formattedDate,
            ],
            'historicCount' => $historyCount,
            'favoriteWordCount' => $favoriteWordCount,
        ]);
    }

}
