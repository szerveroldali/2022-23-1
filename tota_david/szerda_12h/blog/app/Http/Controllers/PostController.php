<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
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
            'users_count' => User::count(),
            // 'posts' => Post::all(),
            'posts' => Post::paginate(6),
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
                'title' => 'required|min:3',
                'description' => 'nullable|max:255',
                'text' => 'required',
                'categories' => 'nullable|array',
                'categories.*' => 'numeric|integer|exists:categories,id',
                'cover_image' => 'nullable|file|image|max:4096',
            ]
        );

        $cover_image_path = null;

        if ($request->hasFile('cover_image')) {
            $file = $request->file('cover_image');

            $cover_image_path = 'cover_image_' . Str::random(10) . '.' . $file->getClientOriginalExtension();

            Storage::disk('public')
                ->put(
                    // File útvonala
                    $cover_image_path,
                    // File tartalma
                    $file->get()
                );
        }

        $post = new Post();
        $post->title = $validated['title'];
        $post->description = $validated['description'];
        $post->text = $validated['text'];
        $post->cover_image_path = $cover_image_path;
        // $post->author_id = Auth::id();
        $post->author()->associate(Auth::user());
        $post->save();

        // $post = Post::create([
        //     'title' => $validated['title'],
        //     'description' => $validated['description'],
        //     'text' => $validated['text'],
        //     'cover_image_path' => $cover_image_path,
        //     'author_id' => Auth::id(),
        // ]);

        // $post = Post::factory()->create([
        //     'title' => $validated['title'],
        //     'description' => $validated['description'],
        //     'text' => $validated['text'],
        //     'cover_image_path' => $cover_image_path,
        //     'author_id' => Auth::id(),
        // ]);

        // Ez is egy valid megoldás a user hozzárendelésére:
        // $post->author()->associate(Auth::user());
        // Mivel a post megváltozik (author_id), menteni kell
        // $post->save();

        // "Debug"
        //error_log(json_encode($validated));

        // Category-k hozzárendelése a post-hoz az id lista alapján
        if (isset($validated['categories'])) {
            $post->categories()->sync($validated['categories']);
        }

        Session::flash('post_created', $validated['title']);

        // return redirect()->route('posts.create');
        // return Redirect::route('posts.create');
        return Redirect::route('posts.show', $post);
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
            'post' => $post,
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
        // Jogosultságkezelés
        $this->authorize('update', $post);

        return view('posts.edit', [
            'post' => $post,
            'categories' => Category::all(),
        ]);
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
        // Jogosultságkezelés
        $this->authorize('update', $post);

        $validated = $request->validate(
            [
                'title' => 'required|min:3',
                'description' => 'nullable|max:255',
                'text' => 'required',
                'categories' => 'nullable|array',
                'categories.*' => 'numeric|integer|exists:categories,id',
                // checkbox:
                'remove_cover_image' => 'nullable|boolean',
                'cover_image' => 'nullable|file|image|max:4096',
            ]
        );

        $cover_image_path = $post->cover_image_path;
        $remove_cover_image = isset($validated['remove_cover_image']);

        if ($request->hasFile('cover_image') && !$remove_cover_image) {
            $file = $request->file('cover_image');

            $cover_image_path = 'cover_image_' . Str::random(10) . '.' . $file->getClientOriginalExtension();

            Storage::disk('public')
                ->put(
                    // File útvonala
                    $cover_image_path,
                    // File tartalma
                    $file->get()
                );
        }

        if ($remove_cover_image) {
            $cover_image_path = null;
        }

        // Régi fájl törlése
        // Ha a path módosult az eredetihez képest
        if ($cover_image_path != $post->cover_image_path && $post->cover_image_path !== null) {
            Storage::disk('public')->delete($post->cover_image_path);
        }

        // Post adatainak frissítése
        $post->title = $validated['title'];
        $post->description = $validated['description'];
        $post->text = $validated['text'];
        $post->cover_image_path = $cover_image_path;
        $post->save();

        // Category-k hozzárendelése a post-hoz az id lista alapján
        if (isset($validated['categories'])) {
            // A sync azt fogja csinálni, hogy csak a megadott kategóriák lesznek hozzárendelve
            $post->categories()->sync($validated['categories']);
        }

        // Ilyenkor a post_updated default értéke true
        Session::flash('post_updated');

        return Redirect::route('posts.show', $post);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);

        $post->delete();

        Session::flash('post_deleted', $post->title);

        return Redirect::route('posts.index');
    }
}
