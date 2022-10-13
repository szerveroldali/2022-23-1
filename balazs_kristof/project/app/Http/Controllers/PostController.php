<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    //
    public function index()
    {
        return view('posts.index', [
            'posts' => \App\Models\Post::all()
        ]);
    }

    public function show($id)
    {
        return view('posts.show', [
            'post' => \App\Models\Post::find($id)
        ]);
    }
}
