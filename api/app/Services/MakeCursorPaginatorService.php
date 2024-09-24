<?php

namespace App\Services;

use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Number;

class MakeCursorPaginatorService
{

    public static function paginate($baseQuery, $filters)
    {
        if (!empty($filters['search'])) {
            $baseQuery->where('word', 'like', $filters['search'] . '%');
        }

        $totalDocs = $baseQuery->count();

        if ($filters['cursor']) {
            $baseQuery->where('id', '>', Crypt::decryptString($filters['cursor']));
        }

        $data = $baseQuery
            ->limit($filters['limit'])
            ->orderBy('word')
            ->get();

        $nextCursor = $data->isNotEmpty() ? Crypt::encryptString($data->last()->id) : null;
        $previousCursor = $filters['cursor'] ? Crypt::encryptString($data->first()->id) : null;

        return response()->json([
            'results' => $data->pluck('word'),
            'totalDocs' => $totalDocs,
            'previous' => $previousCursor,
            'next' => $nextCursor,
            'hasNext' => $data->count() === intval($filters['limit']),
            'hasPrev' => $previousCursor !== null,
        ]);
    }
}
