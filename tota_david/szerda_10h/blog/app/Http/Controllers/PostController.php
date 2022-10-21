<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('posts.index', [
            'users_count' => \App\Models\User::count(),
            //'categories_count' => \App\Models\Category::count(),
            //'posts_count' => \App\Models\Post::count(),
            'posts' => \App\Models\Post::all(),
            'categories' => \App\Models\Category::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('posts.create', [
            'categories' => Category::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                // 'title' => 'required|min:3',
                'title' => [
                    'required', 'min:3',
                ],
                'description' => [
                    'nullable',
                    'max:255',
                ],
                'text' => 'required',
                'categories' => 'nullable|array',
                'categories.*' => 'numeric|integer|exists:categories,id',
                'cover_image' => 'nullable|file|mimes:jpg,bmp,png|max:4096'
            ],
            [
                'name.required' => 'Name is required'
            ]
        );

        $cover_image_path = null;

        if ($request->hasFile('cover_image')) {
            $file = $request->file('cover_image');

            $cover_image_path = 'cover_image_' . Str::random(10) . '.' . $file->getClientOriginalExtension();

            Storage::disk('public')->put(
                $cover_image_path,
                $file->get()
            );
        }

        $post = Post::factory()->create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'text' => $validated['text'],
            'cover_image_path' => $cover_image_path,
        ]);

        Session::flash('post_created', $post->title);

        return redirect()->route('posts.create');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        //
    }
}
