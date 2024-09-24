<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Services\MakeCursorPaginatorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HistoryController extends Controller
{

    public function index(Request $request)
    {
        $user = Auth::user();

        $filters = $request->validate([
            'cursor' => 'nullable|string',
            'limit' => 'nullable|integer|min:1|max:100',
            'search' => 'nullable|string',
        ]);

        $historyBaseQuery = History::query()
            ->where('user_id', $user->id);


        return MakeCursorPaginatorService::paginate($historyBaseQuery, $filters);
    }
}
