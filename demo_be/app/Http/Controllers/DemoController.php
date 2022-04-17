<?php

namespace App\Http\Controllers;

use App\Models\Stat;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class DemoController extends Controller
{
    public function stat() {
        $countSeen = Stat::select('post_id', 'posts.title', DB::raw('COUNT(post_id) as count'))
            ->join('posts', 'post_id', 'posts.id')
            ->where('date', date('Y-m-d'))->where('action_type', 1)->groupBy('post_id')->get()->toArray();
        $countReact = Stat::select('post_id', 'posts.title', DB::raw('COUNT(post_id) as count'))
            ->join('posts', 'post_id', 'posts.id')
            ->where('date', date('Y-m-d'))->where('action_type', 2)->groupBy('post_id')->get()->toArray();
        return response([
            'status_code' => Response::HTTP_OK,
            'contents' => [
                'entities' => [
                    'seen_stat' => $countSeen,
                    'react_stat' => $countReact
                ]
            ]
        ], Response::HTTP_OK);
    }
}
