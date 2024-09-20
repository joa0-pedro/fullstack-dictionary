<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Services\MakeCursorPaginatorService;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->validate([
            'cursor' => 'nullable|string',
            'limit' => 'nullable|integer|min:1|max:100',
            'search' => 'nullable|string',
        ]);

        $historyBaseQuery = History::query()
            ->where('user_id', '64f77e76-bb6c-4321-b726-ca4220cbd392');


        return MakeCursorPaginatorService::paginate($historyBaseQuery, $filters);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
