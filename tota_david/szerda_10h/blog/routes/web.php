<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('posts.index');
});

Route::resource('posts', PostController::class);
Route::resource('categories', CategoryController::class);

// Route::get('/posts', function () {
//     return view('posts.index', [
//         'users_count' => \App\Models\User::count(),
//         'categories_count' => \App\Models\Category::count(),
//         'posts_count' => \App\Models\Post::count(),
//     ]);
// })->name('posts.index');

Auth::routes();
