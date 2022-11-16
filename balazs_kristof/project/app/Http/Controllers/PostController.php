<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

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
            'posts' => \App\Models\Post::paginate(3),
            'categories' => \App\Models\Category::all(),
            'user_count' => \App\Models\User::count(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        if (!Auth::check()) {
            Session::flash('login_required');
            return redirect()->route('posts.index');
        }
        return view('posts.create', [
            'categories' => \App\Models\Category::all(),
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
        if (!Auth::check()) {
            Session::flash('login_required');
            return redirect()->route('posts.index');
        }
        $validated = $request->validate([
            'title' => 'required',
            'text' => 'required',
        ]);
        $path = $request->file('cover_image')->store('public/cover_images');

        //\App\Models\Post::factory()->create($validated);
        $post = \App\Models\Post::factory()->make($validated);
        $post->cover_image = $path;
        $post->save();

        Session::flash('post_created');

        return redirect()->route('posts.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return view('posts.show', [
            'post' => \App\Models\Post::findOrFail($id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return view('posts.edit', [
            'post' => \App\Models\Post::find($id),
            'categories' => \App\Models\Category::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required',
            'text' => 'required',
        ]);

        \App\Models\Post::find($id)->update($validated);

        Session::flash('post_updated');

        return redirect()->route('posts.edit', $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        \App\Models\Post::find($id)->delete();
        Session::flash('post_deleted');
        return redirect()->route('posts.index');
    }
}
