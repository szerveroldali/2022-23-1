<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            // 'posts' => Post::all(),
            // 6 db post jelenjen meg oldalanként
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

        $post = new Post();
        $post->title = $validated['title'];
        $post->description = $validated['description'];
        $post->text = $validated['text'];
        $post->cover_image_path = $fn;
        $post->author()->associate(Auth::user());
        $post->save();

        // $post = Post::create([
        //     'title' => $validated['title'],
        //     'description' => $validated['description'],
        //     'text' => $validated['text'],
        //     'cover_image_path' => $fn,
        //     // 'author_id' => Auth::id(),
        // ]);

        // $post = Post::factory()->create([
        //     'title' => $validated['title'],
        //     'description' => $validated['description'],
        //     'text' => $validated['text'],
        //     'cover_image_path' => $fn,
        //     // 'author_id' => Auth::id(),
        // ]);

        // $post->author()->associate(Auth::user());
        // // Mivel módosul az author_id mezője, menteni kell a postot
        // $post->save();

        // kategóriák hozzárendelése id alapján
        // ha egy kategória sem lett kijelölve, akkor nincs ilyen key
        if (isset($validated['categories'])) {
            $post->categories()->sync($validated['categories']);
        }

        Session::flash("post_created", $validated['title']);

        // redirect()->route(...)
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
        // Jogosultságkezelés
        $this->authorize('update');

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
        $this->authorize('update');

        $validated = $request->validate(
            [
                'title' => ['required', 'min:3'],
                'description' => ['nullable', 'max:255'],
                'text' => ['required'],
                // maga a tömb
                'categories' => ['nullable', 'array'],
                // a tömb elemei, az adott category id-val létezik-e kategória?
                'categories.*' => ['numeric', 'integer', 'exists:categories,id'],
                // checkbox:
                'remove_cover_image' => 'nullable|boolean',
                // fájlfeltöltés
                'cover_image' => ['nullable', 'file', 'image', 'max:4096']
            ],
            [
                'required' => 'This field is required',
                'name.required' => 'Name is required',
                'style.in' => 'Invalid style',
            ]
        );

        // Image path
        $cover_image_path = $post->cover_image_path;
        $remove_cover_image = isset($validated['remove_cover_image']);

        if ($request->hasFile('cover_image') && !$remove_cover_image) {
            $file = $request->file('cover_image');

            $cover_image_path = 'ci_' . Str::random(10) . '.' . $file->getClientOriginalExtension();

            Storage::disk('public')->put($cover_image_path, $file->get());
        }

        if ($remove_cover_image) {
            $cover_image_path = null;
        }

        // Ha volt korábban kép, és töröltük v felülírtuk, akkor a szemétként ottmaradt fájlt töröljük ki
        if ($cover_image_path !== $post->cover_image_path && $post->cover_image_path !== null) {
            // Előző fájl törlése (ezen a ponton a post még nem frissült ugye)
            Storage::disk('public')->delete($post->cover_image_path);
        }

        $post->title = $validated['title'];
        $post->description = $validated['description'];
        $post->text = $validated['text'];
        $post->cover_image_path = $cover_image_path;
        $post->save();

        if (isset($validated['categories'])) {
            // Itt jó a sync, mivel a sync meghívása után csak a sync-nek átadott kategóriák lesznek a posthoz rendelve
            $post->categories()->sync($validated['categories']);
        }

        Session::flash("post_updated", $validated['title']);

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
        $this->authorize('delete');

        // Kitörli a postot az adatbázisból
        $post->delete();

        Session::flash("post_deleted", $post->title);

        return Redirect::route('posts.index');
    }
}
