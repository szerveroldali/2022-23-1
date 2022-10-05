<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <?php
        $a = 1;
    ?>
    <?= $a; ?>

    @php
        $b = 2;
    @endphp
    {{ $b }}

    @php
        $records = []
    @endphp

    @if (count($records) === 1)
        I have one record!
    @elseif (count($records) > 1)
        I have multiple records!
    @else
        I don't have any records!
    @endif

    @for ($i = 0; $i < 10; $i++)
        The current value is {{ $i }}
    @endfor
</body>
</html>
