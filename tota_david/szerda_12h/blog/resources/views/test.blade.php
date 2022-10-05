<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <?php $a = "Valami"; ?>
    <?php echo '$a: ' . $a; ?>

    <br>

    @php $b = "Valami2"; @endphp
    $b: {{ $b }}

    <br>

    @for ($i = 0; $i < 10; $i++)
        The current value is {{ $i }} <br>
    @endfor
</body>
</html>
