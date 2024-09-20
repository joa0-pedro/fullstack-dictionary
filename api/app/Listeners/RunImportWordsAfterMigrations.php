<?php

namespace App\Listeners;

use Illuminate\Database\Events\MigrationsEnded;
use Illuminate\Support\Facades\Artisan;

class RunImportWordsAfterMigrations
{
    public function handle(MigrationsEnded $event)
    {
        if ($event->method === "up") {
            Artisan::call('words:import');

            echo "\nImportação de palavras concluída!";
        }
    }
}
