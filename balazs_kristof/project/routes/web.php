<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

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

Route::get('/', function() {
    return redirect()->route('posts.index');
});

Route::get('/home', function() {
    return redirect()->route('posts.index');
});

Route::resource('posts', PostController::class);
Route::resource('categories', CategoryController::class);

// -----------------------------------------

Auth::routes();
