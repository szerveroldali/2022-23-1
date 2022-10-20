<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

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
        $validated = $request -> validate(
            ['name' => 'required|min:3|unique:categories',
            'text-color' => 'required',
            'bg-color' => 'required|regex:/^#([0-9a-f]{8})$/i'],
            ['name.required' => 'A név megadása kötelező!',
            'name.min' => 'A név legalább :min karakter hosszú!',
            'name.unique' => 'A név már foglalt!',
            'bg-color.required' => 'Háttérszínt ki kell tölteni!',
            'bg-color.regex' => 'A formátum helytelen!']
        );

        // itt fixen minden átment :)
        $validated['text_color'] = $validated['text-color'];
        $validated['bg_color'] = $validated['bg-color'];

        Category::create($validated);

        return redirect() -> route('posts.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        return view('categories.edit', ['category' => $category]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request -> validate(
            ['name' => 'required|min:3|unique:categories',
            'text-color' => 'required',
            'bg-color' => 'required|regex:/^#([0-9a-f]{8})$/i'],
            ['name.required' => 'A név megadása kötelező!',
            'name.min' => 'A név legalább :min karakter hosszú!',
            'name.unique' => 'A név már foglalt!',
            'bg-color.required' => 'Háttérszínt ki kell tölteni!',
            'bg-color.regex' => 'A formátum helytelen!']
        );

        // itt fixen minden átment :)
        $validated['text_color'] = $validated['text-color'];
        $validated['bg_color'] = $validated['bg-color'];

        $category -> update($validated);

        return redirect() -> route('posts.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        //
    }
}
