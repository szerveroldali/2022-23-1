@extends('elrendezes')

@section('title', 'Másik')

@section('content')
<h1>Ez a másik.</h1>
@php
$num = 4;
$posts = [
    (object)[
        'title'   => 'Egy almafa',
        'author'  => 'John Doe',
        'content' => 'Aliquam erat volutpat. Maecenas erat turpis, malesuada sed lorem quis, tincidunt bibendum orci. Cras non ipsum a nibh posuere tristique.'
    ],
    (object)[
        'title'   => 'Két katica',
        'author'  => 'Yamada Hanako',
        'content' => 'Etiam cursus lectus vel accumsan aliquam. Maecenas dapibus blandit felis vel ultricies. Proin vitae ante id sem interdum sagittis.'
    ],
    (object)[
        'title'   => 'Három kiscica',
        'author'  => 'Petar Petrović',
        'content' => 'Mauris finibus id sem a pulvinar. In metus ante, consequat vel neque eget, ultrices eleifend lacus. Duis blandit elementum imperdiet.'
    ],
    (object)[
        'title'   => 'Négy porszívó',
        'author'  => 'Kim Yuna',
        'content' => 'Nunc vehicula congue ipsum sed tincidunt. Aenean ut nibh leo. Aenean ut justo quis risus maximus consequat sed ac lorem.'
    ],
];
@endphp

@if ($num == 3)
    <h2>Három</h2>
@elseif ($num == 4)
    <h2>Négy</h2>
@else 
    <h2>Valami más</h2>
@endif

@switch($num)
    @case(1)
        Egy.
        @break
    @case(2)
        Kettő.
        @break
    @default
        Nem egy, nem kettő.
@endswitch

@unless ($num == 5)
    Nem öt.
@endunless
<br>
@for($i = 0; $i < 10; $i++)
    {{ $i }}<br>
@endfor

@forelse($posts as $p)
    <h2>{{ $loop -> iteration }}. {{ $p -> title }}</h2>
    <i>Szerző: {{ $p -> author}}</i><br>
    {{ $p -> content }}
@empty
    Nincsenek bejegyzések.
@endforelse
@endsection

</body>
</html>