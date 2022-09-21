<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

    <h1>Fejléc - {{ $title ?? 'Hmmm' }}</h1>
    Lehet itt valami menüsor.
    <hr>

    {{ $slot }}

    <hr>
    <i>Kopirájt akármi.</i>
</body>
</html>