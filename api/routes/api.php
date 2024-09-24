<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FavoriteWordController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WordController;
use App\Http\Middleware\CheckTokenExpiration;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'Fullstack Challenge 🏅 - Dictionary']);
});

Route::post('/auth/signUp', [AuthController::class, 'signUp'])->name('login');
Route::post('/auth/signIn', [AuthController::class, 'signIn'])->name('register');
Route::post('/auth/logout', [AuthController::class, 'logout']);

Route::middleware(['auth', CheckTokenExpiration::class])->group(function () {
Route::get('/entries/en', [WordController::class, 'index']);
Route::get('/entries/en/{word}', [WordController::class, 'show']);

Route::post('/entries/en/{word}/favorite', [FavoriteWordController::class, 'store']);
Route::delete('/entries/en/{word}/unfavorite', [FavoriteWordController::class, 'destroy']);

Route::get('/user/me', [UserController::class, 'show']);
Route::get('/user/me/history', [HistoryController::class, 'index']);
Route::get('/user/me/favorites', [FavoriteWordController::class, 'index']);
});
