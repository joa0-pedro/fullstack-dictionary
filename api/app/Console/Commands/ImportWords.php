<?php

namespace App\Console\Commands;

use App\Models\Word;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class ImportWords extends Command
{
    protected $signature = 'words:import';
    protected $description = 'Importa a lista de palavras do GitHub para o banco de dados';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $url = 'https://raw.githubusercontent.com/meetDeveloper/freeDictionaryAPI/refs/heads/master/meta/wordList/english.txt';
        $response = Http::get($url);

        if ($response->ok()) {
            $words = explode("\n", $response->body());

            $this->info('Iniciando a importação...');

            $batchSize = 1000;
            $wordBatch = [];

            $this->withProgressBar($words, function ($word) use (&$wordBatch, $batchSize) {
                $word = trim($word);

                if (!empty($word)) {
                    $wordBatch[] = ['word' => $word];


                    if (count($wordBatch) >= $batchSize) {
                        Word::query()->insertOrIgnore($wordBatch);
                        $wordBatch = [];
                    }
                }
            });

            if (count($wordBatch) > 0) {
                Word::query()->insertOrIgnore($wordBatch);
            }

            $this->info("\nImportação concluída com sucesso!");
        } else {
            $this->error('Erro ao baixar a lista de palavras.');
        }
    }
}
