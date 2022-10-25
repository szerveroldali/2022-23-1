<?php

use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
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

// Lezárt jegyek
Route::get('tickets/closed', [TicketController::class, 'closed'])->middleware(['auth'])->name('tickets.closed');
// Összes feladat
Route::get('tickets/all', [TicketController::class, 'all'])->middleware('auth')->name('tickets.all');
// Hibajegyekhez tartozó összes végpont (CRUD)
Route::resource('tickets', TicketController::class)->middleware(['auth']);
// Új komment
Route::post('tickets/{ticket}/comment', [TicketController::class, 'newComment'])->middleware('auth')->name('tickets.newComment');

// Felhasználó
Route::get('users', [UserController::class, 'index'])->middleware('auth')->name('users.index');

Route::get('/', function () {
    return redirect()->route('tickets.index');
})->middleware('auth')->name('tickets');

require __DIR__.'/auth.php';
