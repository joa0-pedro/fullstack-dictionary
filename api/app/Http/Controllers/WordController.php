<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Models\Word;
use App\Services\MakeCursorPaginatorService;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class WordController extends Controller
{

    public function index(Request $request)
    {
        $filters = $request->validate([
            'cursor' => 'nullable|string',
            'limit' => 'nullable|integer|min:1|max:100',
            'search' => 'nullable|string',
        ]);

        $wordsBaseQuery = Word::query();

        return MakeCursorPaginatorService::paginate($wordsBaseQuery, $filters);
    }

    public function show($word)
    {
        $client = new Client();

        try {
            $response = $client->get("https://api.dictionaryapi.dev/api/v2/entries/en/{$word}");
            $data = json_decode($response->getBody(), true);

            $historyData = History::query()
                ->where('user_id', '64f77e76-bb6c-4321-b726-ca4220cbd392')
                ->where('word', $word);

            if ($historyData->exists()) {
                $historyData->update(['accessed_at' => now()]);

                return response()->json($data, 200);
            }

            History::query()->create([
                'user_id' => '64f77e76-bb6c-4321-b726-ca4220cbd392',
                'word' => $word,
                'accessed_at' => now(),
            ]);

            return response()->json($data, 200);
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            if ($e->getResponse()->getStatusCode() === 404) {
                return response()->json(['message' => 'Palavra não encontrada.'], 404);
            }
            return response()->json(['message' => 'Erro ao buscar a palavra.'], 500);
        }
    }
}
