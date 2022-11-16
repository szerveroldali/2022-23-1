<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('categories.create');
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
                'name' => 'required|max:32',
                'color' => 'required|size:7',
            ]
        );

        Category::factory()->create($validated);

        Session::flash('category_created');

        return redirect()->route('categories.create');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return view('categories.show', [
            'post_count' => \App\Models\Post::count(),
            'category' => \App\Models\Category::findOrFail($id),
            'posts' => \App\Models\Category::findOrFail($id)->posts()->paginate(1),
            'categories' => \App\Models\Category::all(),
            'user_count' => \App\Models\User::count(),
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
        return view('categories.edit', ['category' => \App\Models\Category::find($id)]);
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
        $validated = $request->validate(
            [
                'name' => 'required|max:32',
                'color' => 'required|size:7',
            ]
        );

        $category = \App\Models\Category::find($id);
        $category->update($validated);

        Session::flash('category_updated');

        return redirect()->route('categories.edit', ['category' => \App\Models\Category::find($id)]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        \App\Models\Category::find($id)->delete();
        Session::flash('category_deleted');
        return redirect()->route('posts.index');
    }
}
