<?php

//use App\Models\User;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('posts.index');
});

// Route::resource('posts', PostController::class);
// Route::resource('categories', CategoryController::class);

// Egyszerre:
Route::resources([
    'posts' => PostController::class,
    'categories' => CategoryController::class,
]);

// Route::get('/posts', function () {
//     return view('posts.index', [
//         'users_count' => User::count(),
//     ]);
// })->name('posts.index');

Auth::routes();
