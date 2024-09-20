<?php

namespace App\Providers;

use App\Listeners\RunImportWordsAfterMigrations;
use Illuminate\Database\Events\MigrationsEnded;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        MigrationsEnded::class => [
            RunImportWordsAfterMigrations::class,
        ],
    ];

    public function boot()
    {
        parent::boot();
    }
}
