<?php

use App\Models\Word;
use App\Services\MakeCursorPaginatorService;
use Illuminate\Http\Request;
use App\Models\History;
use App\Models\User;
use Database\Factories\WordFactory;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Psr7\Response;
use Illuminate\Support\Facades\Auth;
use Pest\Laravel\mock;

it('returns paginated words', function () {
    Word::factory()->count(15)->create();

    $response = $this->getJson('/api/entries/en?limit=10');

    $response->assertStatus(200);
    $response->assertJsonCount(10, 'data');
});

it('returns filtered words based on search', function () {
    // Cria 5 palavras com a palavra "example" no banco
    Word::factory()->count(5)->create(['word' => 'example']);

    // Cria mais palavras aleatórias
    Word::factory()->count(10)->create();

    // Faz a requisição com o filtro de busca
    $response = $this->getJson('/api/entries/en?search=example');

    // Verifica se apenas as palavras "example" foram retornadas
    $response->assertStatus(200);
    $response->assertJsonCount(5, 'data');
});

it('returns word details and saves to history', function () {
    // Cria um usuário autenticado
    $user = User::factory()->create();
    $this->actingAs($user);
    $word = 'example';

    // Faz a requisição para buscar uma palavra
    $response = $this->getJson(`/api/entries/en/$word`);

    // Verifica se a resposta foi bem-sucedida
    $response->assertStatus(200);
    $response->assertJsonStructure([
        'word',
        'definition'
    ]);

    // Verifica se a palavra foi salva no histórico
    $this->assertDatabaseHas('history', [
        'user_id' => $user->id,
        'word' => 'example'
    ]);
});

it('returns 404 for a non-existent word', function () {
    // Cria um usuário autenticado
    $user = User::factory()->create();
    $this->actingAs($user);

    // Faz a requisição para uma palavra que não existe
    $response = $this->getJson('/api/words/nonexistentword');

    // Verifica se o status 404 é retornado
    $response->assertStatus(404);
    $response->assertJson([
        'message' => 'Palavra não encontrada.'
    ]);
});
