<?php

namespace App\Http\Controllers;

use App\Models\FavoriteWord;
use App\Models\User;
use App\Models\Word;
use App\Services\MakeCursorPaginatorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteWordController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $filters = $request->validate([
            'cursor' => 'nullable|string',
            'limit' => 'nullable|integer|min:1|max:100',
            'search' => 'nullable|string',
        ]);

        $favoriteBaseQuery = FavoriteWord::query()
            ->where('user_id', '64f77e76-bb6c-4321-b726-ca4220cbd392')
            ->leftJoin('words', 'favorite_words.word_id', '=', 'words.id');

        return MakeCursorPaginatorService::paginate($favoriteBaseQuery, $filters);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $wordRecord = Word::query()->where('word', $request->word)->first();

        $favoriteWord = FavoriteWord::query()->where('user_id', '64f77e76-bb6c-4321-b726-ca4220cbd392')->where('word_id', $wordRecord->id)->first();

        if ($favoriteWord) {
            return response()->json([], 200);
        }

        User::query()->find('64f77e76-bb6c-4321-b726-ca4220cbd392')->favoriteWords()->attach($wordRecord->id);
    }

    public function destroy(string $word)
    {
        $user = Auth::user();

        $favoriteWord = FavoriteWord::query()
            ->where('user_id', '64f77e76-bb6c-4321-b726-ca4220cbd392')
            ->leftJoin('words', 'favorite_words.word_id', '=', 'words.id')
            ->where('words.word', $word)
            ->select('favorite_words.*')
            ->first();

        if ($favoriteWord) {
            $favoriteWord->delete();
            return response()->json(['message' => 'Palavra favorita removida com sucesso.'], 200);
        }

        return response()->json(['message' => 'Palavra favorita não encontrada.'], 404);
    }
}
