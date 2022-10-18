<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     * TODO: Legyen lapozható! (pagination)
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tickets = Auth::user()->tickets->where('done', false)->sortByDesc(function ($ticket) {
            return $ticket->comments->sortByDesc('created_at')->first();
        });
        return view('site.tickets', ['tickets' => $tickets]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('site.ticket_form');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'priority' => 'required|integer|min:0|max:3',
            'text' => 'required|string|max:1000',
            'file' => 'file'
        ]);
        dd($validated);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $ticket = Ticket::findOrFail($id);
        if(!$ticket->users->contains(Auth::id()) && !Auth::user()->is_admin) {
            abort(401);
        }
        return view('site.ticket', ['ticket' => $ticket]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Display a listing of the closed tickets.
     * TODO: Legyen lapozható! (pagination)
     */
    public function closed()
    {
        $tickets = Auth::user()->tickets->where('done', true)->sortByDesc(function ($ticket) {
            return $ticket->comments->sortByDesc('created_at')->first();
        });
        return view('site.tickets', ['tickets' => $tickets]);
    }

    /**
     * Display a listing of all tickets.
     * TODO: Csak admin férjen hozzá!
     */
    public function all()
    {
        $tickets = Ticket::all()->sortByDesc(function ($ticket) {
            return $ticket->comments->sortByDesc('created_at')->first();
        });
        return view('site.tickets', ['tickets' => $tickets]);
    }
}
