@extends('layouts.layout')

@section('title', 'Felhasználók rendezése')

@section('content')
    <div class="d-flex">
        <h1 class="ps-3 me-auto">{{ $ticket->title }}
            @switch($ticket->priority)
                @case(0)
                    <span class="badge bg-info">Alacsony</span>
                    @break
                @case(1)
                    <span class="badge bg-success">Normál</span>
                    @break
                @case(2)
                    <span class="badge bg-warning">Magas</span>
                    @break
                @case(3)
                    <span class="badge bg-danger">Azonnal</span>
                    @break
            @endswitch
        </h1>
        <a href="{{ route('tickets.show', ['ticket' => $ticket->id]) }}" class="btn btn-outline-secondary mx-1">
            <i class="fa-solid fa-xmark fa-fw fa-xl"></i>
        </a>
    </div>
    <hr />
    <div class="row gx-5">
        <div class="col">
            <h2>Felhasználók</h2>
            <ul class="list-group">
                @foreach ($usersNotOnList as $user)
                    <li class="list-group-item d-flex align-items-center">
                        <div class="me-auto">
                            {{ $user->name }} |
                            <span class="text-secondary">{{ $user->email }}</span>
                        </div>
                        <form action="" method="post">
                            <div class="form-check form-switch pe-3">
                                <input
                                    type="checkbox"
                                    class="form-check-input"
                                    role="switch"
                                    id="{{ $user->id }}"
                                    value="{{ $user->id }}"
                                />
                            </div>
                            <button class="btn btn-primary" type="submit">
                                <i class="fa-solid fa-angles-right fa-fw"></i>
                            </button>
                        </form>
                    </li>
                @endforeach
            </ul>
        </div>
        <div class="col">
            <h2>A feladathoz hozzárendelt felhasználók</h2>
            <ul class="list-group">
                @foreach ($usersOnTicket as $user)
                    <li class="list-group-item d-flex align-items-center">
                        <div class="me-auto">
                            {{ $user->name }} |
                            <span class="text-secondary">{{ $user->email }}</span>
                        </div>
                        <form action="" method="post">
                            <div class="form-check form-switch pe-3">
                                <input
                                    type="checkbox"
                                    class="form-check-input"
                                    role="switch"
                                    id="{{ $user->id }}"
                                    value="{{ $user->id }}"
                                />
                            </div>
                            <button class="btn btn-primary" type="submit">
                                <i class="fa-solid fa-angles-left fa-fw"></i>
                            </button>
                        </form>
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
@endsection
