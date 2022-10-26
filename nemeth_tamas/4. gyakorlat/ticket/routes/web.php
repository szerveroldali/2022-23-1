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

Route::middleware('auth')->group(function () {
    // Lezárt jegyek
    Route::get('tickets/closed', [TicketController::class, 'closed'])->name('tickets.closed');
    // Összes feladat
    Route::get('tickets/all', [TicketController::class, 'all'])->name('tickets.all');
    // Hibajegyekhez tartozó összes végpont (CRUD)
    Route::resource('tickets', TicketController::class);
    // Új komment
    Route::post('tickets/{ticket}/comment', [TicketController::class, 'newComment'])->name('tickets.newComment');
    // Felhasználók listája egy ticket-nél
    Route::get('tickets/{ticket}/users', [TicketController::class, 'getUsers'])->name('tickets.getUsers');
    // Felhasználó hozzáadása ticket-hez
    Route::post('tickets/{ticket}/users/{user}', [TicketController::class, 'addUser'])->name('tickets.addUser');
    // Felhasználó levétele ticket-ről
    Route::delete('tickets/{ticket}/users/{user}', [TicketController::class, 'deleteUser'])->name('tickets.deleteUser');

    // Felhasználó
    Route::get('users', [UserController::class, 'index'])->name('users.index');

    Route::get('/', function () {
        return redirect()->route('tickets.index');
    })->name('tickets');
});

require __DIR__.'/auth.php';
