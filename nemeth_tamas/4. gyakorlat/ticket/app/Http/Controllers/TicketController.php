<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tickets = Auth::user()->tickets()->where('done', false)->paginate(5);
        // $tickets = Auth::user()->tickets->where('done', false)->sortByDesc(function ($ticket) {
        //     return $ticket->comments->sortByDesc('created_at')->first();
        // });
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
            'text' => 'required|max:1000',
            'file' => 'file'
        ]);

        $ticket = Ticket::create($validated);
        $ticket->users()->attach(Auth::id(), ['is_submitter' => true, 'is_responsible' => true]);

        if ($request->hasFile('attachment')) {
            $path = $request->file('attachment')->store('public');
            $ticket->comments()->create([
                'text' => $validated['text'],
                'user_id' => Auth::id(),
                'filename' => $request->file('attachment')->getClientOriginalName(),
                'filename_hash' => $path,
            ]);
        } else {
            $ticket->comments()->create([
                'text' => $validated['text'],
                'user_id' => Auth::id(),
            ]);
        }

        return redirect()->route('tickets.show', ['ticket' => $ticket->id]);
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
        if(!$ticket->users->contains($id) && !Auth::user()->is_admin) {
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
        $ticket = Ticket::findOrFail($id);
        if(!$ticket->users->contains(Auth::id()) && !Auth::user()->is_admin) {
            abort(401);
        }
        return view('site.ticket_form', ['ticket' => $ticket]);
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
            'title' => 'required|string',
            'priority' => 'required|integer|min:0|max:3',
        ]);
        $ticket = Ticket::findOrFail($id);
        if(!$ticket->users->contains(Auth::id()) && !Auth::user()->is_admin) {
            abort(401);
        }
        $ticket->update($validated);
        return redirect()->route('tickets.show', ['ticket' => $ticket->id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ticket = Ticket::findOrFail($id);
        if(!$ticket->users->contains(Auth::id()) && !Auth::user()->is_admin) {
            abort(401);
        }
        $ticket->delete();
        return redirect()->route('tickets');
    }

    /**
     * Display a listing of the closed tickets.
     */
    public function closed()
    {
        $tickets = Auth::user()->tickets()->where('done', true)->paginate(5);
        // $tickets = Auth::user()->tickets->where('done', true)->sortByDesc(function ($ticket) {
        //     return $ticket->comments->sortByDesc('created_at')->first();
        // });
        return view('site.tickets', ['tickets' => $tickets]);
    }

    /**
     * Display a listing of all tickets.
     */
    public function all()
    {
        if(!Auth::user()->is_admin) {
            abort(401);
        }
        $tickets = Ticket::paginate(5);
        // $tickets = Ticket::all()->sortByDesc(function ($ticket) {
        //     return $ticket->comments->sortByDesc('created_at')->first();
        // });
        return view('site.tickets', ['tickets' => $tickets]);
    }

    public function newComment(Request $request, $id)
    {
        $validated = $request->validate([
            'text' => 'required|max:1000',
            'file' => 'file'
        ]);
        $ticket = Ticket::findOrFail($id);
        if(!$ticket->users->contains($id) && !Auth::user()->is_admin) {
            abort(401);
        }

        if ($request->hasFile('attachment')) {
            $path = $request->file('attachment')->store('public');
            $ticket->comments()->create([
                'text' => $validated['text'],
                'user_id' => Auth::id(),
                'filename' => $request->file('attachment')->getClientOriginalName(),
                'filename_hash' => $path,
            ]);
        } else {
            $ticket->comments()->create([
                'text' => $validated['text'],
                'user_id' => Auth::id(),
            ]);
        }

        return redirect()->route('tickets.show', ['ticket' => $ticket->id]);
    }

    public function getUsers($id)
    {
        $ticket = Ticket::findOrFail($id);
        if(!$ticket->users->contains(Auth::id()) && !Auth::user()->is_admin) {
            abort(401);
        }
        $usersOnTicket = $ticket->users;
        $usersNotOnList = User::all()->diff($usersOnTicket);
        return view('site.ticket_users', ['usersOnTicket' => $usersOnTicket, 'usersNotOnList' => $usersNotOnList, 'ticket' => $ticket]);
    }

    public function addUser(Request $request, $ticketId, $userId)
    {
        $validated = $request->validate(['is_responsible' => 'nullable|integer|exists:App\Models\User,id']);
        $ticket = Ticket::findOrFail($ticketId);
        if(!$ticket->users->contains(Auth::id()) && !Auth::user()->is_admin) {
            abort(401);
        }
        $user = User::findOrFail($userId);
        if (isset($validated['is_responsible'])) {
            $ticket->users()->attach($user, ['is_responsible' => true]);
        } else {
            $ticket->users()->attach($user);
        }
        return redirect()->route('tickets.getUsers', ['ticket' => $ticket->id]);
    }

    public function deleteUser($ticketId, $userId)
    {
        $ticket = Ticket::findOrFail($ticketId);
        if(!$ticket->users->contains(Auth::id()) && !Auth::user()->is_admin) {
            abort(401);
        }
        $user = User::findOrFail($userId);
        $ticket->users()->detach($user);
        return redirect()->route('tickets.getUsers', ['ticket' => $ticket->id]);
    }
}
