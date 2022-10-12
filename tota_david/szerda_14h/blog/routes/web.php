<?php

// use App\Models\User;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Redirect::route('posts.index');
});

// Route::resource('posts', PostController::class);
// Route::resource('categories', CategoryController::class);

// Egységesítve (ugyanaz, mint fent):
Route::resources([
    'posts' => PostController::class,
    'categories' => CategoryController::class
]);

Auth::routes();

// Route::get('/', function () {
//     return view('welcome');
// });

// Route::get('/posts', function () {
//     return view('posts.index', [
//         'users_count' => User::count(),
//     ]);
// })->name('posts.index');

// Route::get('/posts/create', function () {
//     return view('posts.create');
// });

// Route::get('/posts/x', function () {
//     return view('posts.show');
// });

// Route::get('/posts/x/edit', function () {
//     return view('posts.edit');
// });

// // -----------------------------------------

// Route::get('/categories/create', function () {
//     return view('categories.create');
// });

// Route::get('/categories/x', function () {
//     return view('categories.show');
// });

// -----------------------------------------

