# 1. gyakorlat

## Platformok

- Gyakorlati kódok, ZH kezdőcsomagok, stb.
    - [Tantárgyi közös GitHub repo](https://github.com/szerveroldali/2022-23-1)
- Hivatalosabb tematika, követelmények, számonkérések beadása, előadásdiák, stb.
    - [Tantárgyi Canvas felület](https://canvas.elte.hu/courses/30103)
- Gyakorlati videók (estis csoport felvétele)
    - [YouTube lejátszási lista](https://www.youtube.com/playlist?list=PL4alkMYFMfltGP3P5c_IU65GGiwNR-eFn)
- Teams? Egyelőre csak vészhelyzetre! (pl. távoktatás, betegség, stb.)
s
## Gyak. tematika (röviden)

- ma: bevezető óra, ismétlés, átmenet natív PHP-ből
- félév közepéig: Laravel MVC
- félév második fele: Node.js (REST API, GraphQL, Websocket)

## Követelmények (előzetesen)

- **Hivatalos és naprakész infók a Canvas felületen, ez csak kivonat!**
    - https://canvas.elte.hu/courses/30103/pages/kovetelmenyek-szamonkeresek-tudnivalok?module_item_id=406827
- alapkövetelmény: max 3 hiányzás, minden számonkérés megírása
- katalógus: nappalin 90 perc, estin a **saját** 45 perc kötelező
- számonkérések
    - 1 db Laravel beadandó; össz. 60 pont - előzetés határidő: nov. 13 este - **KÉSÉS NINCS!**
        - értékelés: **védés/bemutatás**, kb. 10-15 perc, egyéni időpontban *(jó lenne mindenkinek nov. 14-ei héten letudni)*
    - Node.js részből 2 db ZH; össz. 60 pont
        - REST API; 30 pontért, november vége / december eleje (pontosan?)
        - GraphQL és Websocket; 30 pontért, szorgalmi időszak vége (pontosan?)
    - pót/javító ZH vizsgaidőszakban
    - minimum 40% mindhárom komponensből!

## Telepítő!

- szükséges környezet: PHP, Composer, Xdebug + Node.js
- Tóta Dávid féle okos telepítő:
    - https://github.com/totadavid95/PhpComposerInstaller
    - hiba esetén olvass README-t, mert 99%, hogy megválaszolta már; vagy lásd ugyanott a kézi telepítés módját

## Honnan jöttünk és hová tartunk?

- Webfejlesztés (leánykori nevén Web1) - statikus honlapok: tervezés, HTML + CSS, Bootstrap alapok
- Webprogramozás (leánykori nevén Web2) - dinamikus oldalak: natív JavaScript, natív PHP
- Szerveroldali webprogramozás (vagyis ez a tárgy) - csomagkezelők, keretrendszerek!
    - ötlet: ne fejlesszünk le olyan dolgot, amit más már lefejlesztett előttünk (sőt egy népszerű csomag esetében valószínűleg jobb is a megoldása)
    - következmény: kevesebb kód = kevesebb hibalehetőség :)

## Composer alapok I.

- Új projekt létrehozása (miután feltelepült a környezet):
`composer init`
- Egyelőre a type legyen project és minden mást skippeljünk nyugodtan!
- Generálódik: `composer.json` (projektleíró fájl). Valahogyan ebben kellene definálni a dependenciákat (behúzott csomagokat).
- Honnan veszek csomagokat? Package repository!
    - pl. https://packagist.org/
    - Példa kedvéért telepítsünk innen Faker-t. Adatokat lehet vele generálni teszteléshez.
    - `composer require fakerphp/faker`
- Mi történt a parancs futtatásakor? Sok minden!
    1. `composer.json` bővült egy sorral
        - `"fakerphp/faker": "^1.20"` (értelmezés: `^` jel az `1.xx` főverziót megköti, hogy ne legyen egy frissebb verzióból gond, de a `.20` már lehet frissebb)
    2. `composer.lock` létrejött (és sok dzsuva van benne)
    3. `vendor` mappába konkrétan bekerült a Faker teljes forráskódja
        - **VENDOR MAPPÁT SOHA NEM ADUNK BE SZÁMONKÉRÉSEN ÉS NEM TÖLTÜNK FEL GIT REPOBA! (.gitignore)**
        - Miért? Mert teljesen fölösleges tárhelyfoglalás. Majd a csomagkezelő kezeli annak, aki letölti a dolgunkat. **Értelemszerűen emiatt nem szerencsés belepiszkálni a csomagokba!** 
    4. `vendor\autoload.php` úgy frissül, hogy behívja az új csomagot

## Faker demó

```
<?php
    require_once('vendor/autoload.php');
    $faker = Faker\Factory::create();
    echo $faker -> name() . PHP_EOL;
    echo $faker -> email() . PHP_EOL;
    echo $faker -> text() . PHP_EOL;
?>
```

## Composer alapok II.

- Mi történik, ha más letölti a projektem, de nincs meg neki hozzá a `vendor` mappa?
- Megoldás: `composer install`

## Laravel bevezető

- A kódbázis hármas felosztása elméletben:
    - M - model (ő felelős az adatok kezeléséért; **nem** nyúlunk közvetlenül adatfájlokhoz/adatbázishoz)
    - V - view / nézet (ő fog megjelenni a felhasználónak valamilyen formában; nekünk most egy HTML oldal)
    - C - controller / vezérlő (HTTP kérés feldolgozása, modellhez hozzányúl, nézetet megjeleníti)

- Valóságban nem ilyen mindig ilyen egyszerű, mert van pl.
    - routing - végpontok összekötése vezérlőlogikával
    - mindenféle háttérben futó service
    - meg persze ennél sokkal összetettebb use-case-ek is

- Honnan teremsek Laravel projektet? Hát ezért tanultuk a Composert! :)
    - `composer create-project --prefer-dist laravel/laravel PROJEKTNÉV`
    - Hozzuk létre a `laravel_intro` Laravel projektet!

### Laravel mappaszerkezet
- **app/Models**
    - itt fogjuk létrehozni az adatmodelleket
- **app/Http/Controllers**
    - az egyes végpontokhoz rendelt (\* majd látjuk hamarosan a routing-ot) vezérlőlogikák
- **app/Http/Middleware**
    - na... ez már egy félig-meddig bonyolult fogalom lehet
    - úgymond egy közbeékelt logika, ami a kérésen előbb hajtódik végre, mint a controller
    - pl. egy hitelesítést igénylő útvonalon:
        - (web MW) -> (auth MW) -> (kiszolgálás)
        - de ha nincs bejelentkezve a felhasználó, akkor auth MW megakadályozza a kiszolgálást
- **app/Http/Requests**
    - pl. űrlapok validálását-feldolgozását jó gyakorlat ide kiszervezni, de lehet akár a vezérlő része is
- **bootstrap**
    - nem piszkálós mappa, itt állítódik fel (bootstrapelődik) az alkalmazás az `app.php`-ben
    - semmi köze a Bootstrap CSS-hez :)
- **config**
    - konfigurációs kulcs-érték párok, nagyon ehhez sem fogunk hozzányúlni
- **database/migrations**
    - egy migráció célja, hogy az adatbázis tábláit létrehozzák (*up* metódus) vagy eldobják (*down* metódus)
- **database/factories**
    - itt definiálható, hogy hogyan lehet példaadatokkal feltölteni az adatbázist, ha a migráció létrehozta a táblákat
    - Figyelem! Itt még nem töltünk fel semmit, csak megadjuk a modellt. (Vegyük észre a Faker-t egyébként!)
- **database/seeders**
    - itt fogunk tetszőleges számú factory-t meghívni, és elvégezni a seedelést
- **public**
    - ez az a mappa, amit egy webszervernek ki kell szolgálnia a külvilág felé
    - `www`, `htdocs`, `public_html` megfelelője a különböző környezetekben
    - a mappa fölötti dolgok kellenek, de ne legyenek közvetlenül elérhető kivülről
- **resources**
    - itt vannak pl. CSS és JS fájlok, de miért nem a public-ba raktuk akkor őket? így nem érjük el!
    - *VITE* (vagy *Laravel Mix* - hasonló, csak régebbi) fogja ezeket az erőforrásokat feldolgozni, és feldolgozás után kerül a public-ba!
        - Hogyan?
        - Először telepítsuk a Node-os csomagokat! `npm install` (npm = Node Package Manager)
        - Majd futtassuk a fordítás! `npm run build` vagy `npm run dev`
- **resources/views**
    - erről következő órán részletesen, egyelőre: itt vannak a nézetek, amik a *Blade* sablonnyelven íródnak
- **routes**
    - itt főleg a `web.php` az érdekes számunkra, itt lehet definiálni, hogy melyik végponthoz milyen vezérlőlogika kapcsolódik... hamarosan részletesek látjuk ezt is
- **storage**
    - tárolóhely naplóknak, feltöltött fájloknak, Laravel saját dolgainak (pl. cache, session), stb.
- **.env**
    - itt adjuk meg a környezetünk adatait, pl. mi az adatbázisunk elérése!
    - **.gitingore EZT IS!**

## Laravel - lássuk már élesben!

- Futtatás: `php artisan serve` (ezt ajánlott a fejlesztéshez használni)
- Vagy a public könyvtárból: `php -S localhost:8000`
- Mi töltődik be, ha megnyitom a böngészőben? `welcome.blade.php`
- Játszunk el kicsit a végpontokkal, új nézettel, Blade direktívákkal! Részletek ezekről jövő héten...
