<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
            'users_count' => User::count(),
            'posts' => Post::all(),
            'categories' => Category::all(),
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
                'title' => ['required', 'min:3'],
                'description' => ['nullable', 'max:255'],
                'text' => ['required'],
                // maga a tömb
                'categories' => ['nullable', 'array'],
                // a tömb elemei, az adott category id-val létezik-e kategória?
                'categories.*' => ['numeric', 'integer', 'exists:categories,id'],
                // fájlfeltöltés
                'cover_image' => ['nullable', 'file', 'image', 'max:4096']
            ],
            [
                'required' => 'This field is required',
                'name.required' => 'Name is required',
                'style.in' => 'Invalid style',
            ]
        );

        // filename
        $fn = null;

        if ($request->hasFile('cover_image')) {
            $file = $request->file('cover_image');

            $fn = 'ci_' . Str::random(10) . '.' . $file->getClientOriginalExtension();

            Storage::disk('public')->put($fn, $file->get());
        }

        $post = Post::factory()->create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'text' => $validated['text'],
            'cover_image_path' => $fn,
        ]);

        // kategóriák hozzárendelése id alapján
        // ha egy kategória sem lett kijelölve, akkor nincs ilyen key
        if (isset($validated['categories'])) {
            $post->categories()->sync($validated['categories']);
        }

        Session::flash("post_created", $validated['title']);

        return Redirect::route('posts.create');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return view('posts.show', [
            'post' => $post
        ]);
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
