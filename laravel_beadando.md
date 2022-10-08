<!-- omit in toc -->

# Szerveroldali webprogramozás 2022/23/1 - Laravel beadandó

<!-- omit in toc -->

## Tartalomjegyzék

- [Szerveroldali webprogramozás 2022/23/1 - Laravel beadandó](#szerveroldali-webprogramozás-2022231---laravel-beadandó)
  - [Tartalomjegyzék](#tartalomjegyzék)
  - [Változtatások](#változtatások)
  - [Fontos tudnivalók](#fontos-tudnivalók)
  - [Feladat](#feladat)
    - [Adatmodellek](#adatmodellek)
    - [Kapcsolatok](#kapcsolatok)
  - [Értékelés](#értékelés)
    - [Minimumkövetelmények (0 pont)](#minimumkövetelmények-0-pont)
    - [Megvalósításra szerezhető pontszám (55 pont)](#megvalósításra-szerezhető-pontszám-55-pont)
    - [Védésre szerezhető pontszám (5 pont)](#védésre-szerezhető-pontszám-5-pont)
  - [Hasznos hivatkozások](#hasznos-hivatkozások)

## Változtatások

- **2022. október 8.**
  - `Comment` modell mezőinek pontosítása.
  - Hibás címkéhez tartozó tárgyak lekérése esetén 404-es hiba előírása.
  - Hasznos hivatkozások bővítése: _SQLite Viewer_ kiegészítő _VS Code_-hoz.
- **2022. október 5.**
  - A hallgatók számára közzétett első verzió. Amennyiben menet közben változás vagy pontosítás történik a feladatban, azt itt kiemelten jelezni fogjuk.

## Fontos tudnivalók

Amennyiben az alábbiak közül **bármelyik** nem teljesül a beadott munkára, a beadandó feladat **elutasított**, tehát átmenő gyakorlati érdemjegy nem kapható!

- Az elkészült projektet **HATÁRIDŐRE** (2022. november 13. 23:59) a végleges állapotában fel kell tölteni a kurzus Canvas felületére! Késés alapvetően **NEM** megengedett; kivéve egyéni megegyezésre a gyakorlatvezető felé **időben jelzett, igazolható, méltányossági** alapon (pl. haláleset, tartós betegség). _(Az "el kellett utaznom", "zh-t írtam tegnap" és "nem működik a(z) gépem/internet" típusú megkereséseket mérlegelés nélkül el fogjuk utasítani, hiszen circa **1,5 hónap** állt rendelkezésre ezek áthidalására.)_
- A csomagkezelők által karbantartott mappákat (`vendor` és `node_modules`) beküldeni **TILOS**!
- A beadott feladatot a gyakorlatvezetővel egyeztetett időpontban szóban meg **KELL** védeni. A védés során a beadott munkával **MEGEGYEZŐ** verziót kell bemutatni, a beadás után tehát **TILOS** tovább dolgozni.
- A beadandó feladat **EGYÉNI** munka, tehát bárminemű összedolgozás, másolás, csalás **TILOS**! A felsoroltak gyanúja esetén akár **MINDEN** érintett hallgató beadását véglegesen visszautasíthatjuk! Ez nem azt jelenti, hogy nem lehet dokumentációt használni vagy együtt ötletelni, de a kódon mindenki önállóan kell dolgozzon. Emiatt különösen érdemes arra ügyelni, hogy időközben ne szivárogjon ki a munka például publikus git repoba.
- A beadott munka tisztaságát tanúsító, itt olvasható szövegnek `STATEMENT.md` fájlnéven, a hallgató adataival egyértelműen kitöltve szerepelnie **KELL** a beadott állományban:

```
  # Nyilatkozat

  Én, <NÉV> (Neptun kód: <NEPTUN KÓD>) kijelentem, hogy ezt a megoldást én küldtem be a Szerveroldali webprogramozás Laravel beadandó feladatához.
  A feladat beadásával elismerem, hogy tudomásul vettem a nyilatkozatban foglaltakat.

  - Kijelentem, hogy ez a megoldás a saját munkám.
  - Kijelentem, hogy nem másoltam vagy használtam harmadik féltől származó megoldásokat.
  - Kijelentem, hogy nem továbbítottam megoldást hallgatótársaimnak, és nem is tettem azt közzé.
  - Tudomásul vettem, hogy az Eötvös Loránd Tudományegyetem Hallgatói Követelményrendszere (ELTE szervezeti és működési szabályzata, II. Kötet, 74/C. §) kimondja, hogy mindaddig, amíg egy hallgató egy másik hallgató munkáját - vagy legalábbis annak jelentős részét - saját munkájaként mutatja be, az fegyelmi vétségnek számít.
  - Tudomásul vettem, hogy a fegyelmi vétség legsúlyosabb következménye a hallgató elbocsátása az egyetemről.
```

## Feladat

A feladatod egy **számítógépes múzeum** kínálatát kezelő webes alkalmazás elkészítése, ahol az admin kezeli a kiállított tárgyakat, a bejelentkezett felhasználók pedig értékelhetik az említett tárgyakat.

Szeretnénk, ha a feladatot alapvetően kellő **alkotói szabadsággal** fognátok meg, nem pedig kőbe vésett dologként. Lényegében minden (tiszta módon keletkezett) megoldás elfogadható, amíg a leírt követelményeket teljesíti; tehát abban, ami nincs a továbbiakban specifikálva, **szabadon** mozoghattok. Érdemes jól tanulmányozni az elvárásokat, ugyanis **csak az ér pontot, amit expliciten leírtunk** a pontozásban; a kurzus teljesítése szempontjából tehát felesleges egy túlgondolt/bonyolultabb feladatot megoldani, persze mindig örülünk, ha extra szorgalmasak vagytok. :)

A feladathoz kötött **kiinduló csomag nincs**, javasolt azonban a **Laravel Breeze** (esetleg: Laravel UI) használata, amely a frontend beüzemelésen felül még a hitelesítés alapját is biztosítja.

### Adatmodellek

- `Item` - egy kiállított tárgy alapvető adatai
  - `id`
  - `name` (string)
  - `description` (szöveg)
  - `obtained` (dátum)
  - `image` (string, lehet null)
  - `időbélyegek`
- `Comment` - a kiállított tárgyakhoz hozzá lehet szólni
  - `id`
  - `text` (szöveg)
  - `időbélyegek`
- `Label` - a kiállított tárgyak felcímkézhetők tulajdonságokkal
  - `id`
  - `name` (string)
  - `display` (logikai)
  - `color` (string, hexadecimális színkód)
  - `időbélyegek`
- `User` - ez már készen érkezik, csak egy mezővel kell kiegészíteni
  - `is_admin` (logikai, alapértelmezetten hamis)

### Kapcsolatok

- `Item` 1 - N `Comment`
- `User` 1 - N `Comment`
- `Item` N - N `Label`

## Értékelés

### Minimumkövetelmények (0 pont)

Külön pontszám nélküli **minimumkövetelményként** teljesítendők az alábbi programozási feladatok:

- Az alkalmazást **Laravel 9** keretrendszerben, **SQLite** adatbázis használatával kell megvalósítani!
- A csomagkezelők által karbantartott mappákat (`vendor` és `node_modules`) feltölteni **TILOS**! Ugyanakkor alapelvárás, hogy a beadott _.zip_-ből az alkalmazás a következő inicializációs fájlokkal (és nem többel) **beüzemelhető** legyen:
  - [init.bat](https://gist.githubusercontent.com/totadavid95/10c2b013a5c8a0a98d16cb21c45d217a/raw/b94112422523b68a159a0b96912f86fe46868ac3/init.bat) (Windows-on)
  - [init.sh](https://gist.githubusercontent.com/totadavid95/10c2b013a5c8a0a98d16cb21c45d217a/raw/b94112422523b68a159a0b96912f86fe46868ac3/init.sh) (Linux-on / Mac-en)
- Fontos az **igényesen kidolgozott felhasználói felület** (frontend). Ez nem azt jelenti, hogy mindent csicsázni kell, de pl. legyen egy közös elrendezése az oldalaknak, ahonnan minden funkcionalitás elérhető a felhasználók számára (nem kell útvonalakat kutatni a kódban és/vagy lekéréseket kézzel építgetni), az űrlapmezők legyenek egyértelműen felcímkézve, hiba esetén kapjanak megfelelő tájékoztatást a **pontos** hibáról. A frontend technológia is szabadon választható: javasolt a Tailwind CSS vagy Bootstrap.
- Az **időzóna** legyen magyar időre állítva az alkalmazás konfigurációjában!
- A felküldött adatokat **minden esetben** validálni kell **szerveroldalon**! HTML szintű validáció (pl. `required` attribútum) **ne is legyen** a kódban, mert ez abszolút nem véd az alkalmazásunkat kijátszani szándékozók ellen!

### Megvalósításra szerezhető pontszám (55 pont)

- **Seeder** (4 pont)
  - Mind a négyféle modellből kerüljön tárolásra észszerű mennyiségben, valamint a köztük lévő kapcsolatokból is generálj!
  - A seeder ezzel az egy paranccsal legyen hívható: `php artisan db:seed`
  - A felhasználók **csak** `userX@szerveroldali.hu` (ahol X eleme természetes számok) e-mail címmel és `password` jelszóval jöjjenek létre az egyszerűség kedvéért!
  - Egy speciális felhasználó, az **admin** fiók elérése legyen fixen: `admin@szerveroldali.hu` - `adminpwd`
- **Főoldal** (5 pont)
  - Az alkalmazás gyökér útvonalán jelenjen meg az az oldal, amelyen a múzeumban lévő azon tárgyak listája látható. A tárgynak látszódjon a képe (vagy placeholder kép, ha nincs hozzá feltöltve), neve és a hosszú leírás első néhány sora, valamint gombbal lehessen a tárgyhoz tartozó részletező oldalra kerülni!
  - Ezt az oldalt bárki (vendég, bejelentkezett, admin) megtekintheti.
  - Rendezd a tárgyakat a beszerzés dátuma (`obtained`) szerint csökkenő sorrendbe!
  - Lapozással biztosítsd, hogy csak bizonyos (pl. 9, 10, 12, stb.) számú tárgy jelenjen meg egyidejűleg az oldalon, utána lapozni kelljen!
- **Részletező oldal** (5 pont)
  - A részletező oldalon megjelenik (szintén bárki számára) a paraméterként kapott tárgy minden adata, immáron a teljes szöveggel.
  - Ezen az oldalon meg kell jeleníteni minden olyan címkét is, amivel a tárgyat felcímkéztük **ÉS** `display` mezője igaz.
  - Amennyiben vannak hozzászólások, azok is itt jelenjenek meg időrendi sorrendben! Ha nincs hozzászólás, erről is természetesen tájékoztatni kell a felhasználót.
  - Amennyiben olyan tárgyat kérnénk le, amely nem létezik (rossz ID), adjon az oldal 404-es hibát!
- **Új címke felvitele** (6 pont)
  - Az **admin** tudjon úgy címkét felvinni, amelynek van neve (string), láthatósága (logikai) és színe (hex színkód).
- **Meglévő címke módosítása** (3 pont)
  - Az **admin** a címkéket módosítani is tudja.
- **Címkéhez tartozó tárgyak listázása** (2 pont)
  - Kell egy lehetőség (pl. a tárgy részletező oldalán az egyes címkékre kattintva) csak az adott címkével rendelkező tárgyak listázására.
  - Amennyiben olyan címkét kérnénk le, amely nem létezik (rossz ID), adjon az oldal 404-es hibát!
- **Új kiállított tárgy felvitele** (8 pont)
  - Az **admin** tudjon új tárgyat felvinni, amelyhez a kötelező adatokon túl opcionálisan tartozhat feltöltött kép is, illetve jelölőmezők segítségével lehessen a tárgyhoz tartozó címkéket kiválasztani.
  - A képfeltöltés **ténylegesen** legyen fájlfeltöltés, tehát nem elég csupán a kép nevét eltárolni!
- **Kiállított tárgy módosítása** (10 pont)
  - Az **admin** a részletező oldalról átlépve tudja módosítani is a kiállított tárgyak adatait. Ha már van feltöltött kép, és nem tölt fel fájlt, akkor maradjon meg az előző kép; különben értelemszerűen le kell cserélni. Ügyelni kell arra is, hogy a címkék megfelelően szinkronban maradjanak!
- **Törlés megvalósítása** (4 pont)
  - Az **admin** tudja az címkéket és a tárgyakat törölni is. Itt arra kell vigyázni, hogy törlés esetén ne maradjanak sehol hivatkozások nem létező tárgyra vagy címkére.
- **Hozzászólások kezelése** (8 pont)
  - A **bejelentkezett** felhasználó a tárgy részletező lapján tudjon hozzászólást írni. A felhasználó a **saját** hozzászólását szerkesztheti vagy törölheti is, de más felhasználókét nem!
  - Az **admin** speciális felhasználóként bárkinek a hozzászólását módosíthatja vagy törölheti.

### Védésre szerezhető pontszám (5 pont)

A maradék 5 pont a védés során mutatott **általános jártasságra** szerezhető a témában.

Nem várjuk el senkitől, hogy két hónap alatt mesterévé váljon a Laravel lelki világának; viszont azt igen, hogy a **saját projektjét** alapvetően tudja navigálni és a **gyakorlaton lefedett** ismeretekkel kapcsolatos kérdésekre tudjon értékelhetően válaszolni. Normál esetben a védés 10-15 percnél tovább nem tart.

**Amennyiben a hallgató a szóbeli védés során teljes tájékozatlanságot mutat, a beadandó feladat CSALÁS gyanújával visszautasítható!**

## Hasznos hivatkozások

Az alábbiakban adunk néhány hasznos hivatkozást, amiket érdemes szemügyre venni a beadandó elkészítésekor.

- [Órai anyagok 2022/23/1](https://github.com/szerveroldali/2022-23-1)
- [Laravel nyelvi csomag - magyarosításhoz](https://github.com/Laravel-Lang/lang) (opcionális)
- Tantárgyi Laravel jegyzetek:
  - [Laravel projektszerkezet](https://github.com/szerveroldali/leirasok/blob/main/LaravelProjektszerkezet.md)
  - [Kimenet generálása](http://webprogramozas.inf.elte.hu/#!/subjects/webprog-server/handouts/laravel-01-kimenet)
  - [Bemeneti adatok, űrlapfeldolgozás](http://webprogramozas.inf.elte.hu/#!/subjects/webprog-server/handouts/laravel-02-bemenet)
  - [Adattárolás, egyszerű modellek](http://webprogramozas.inf.elte.hu/#!/subjects/webprog-server/handouts/laravel-03-adatt%C3%A1rol%C3%A1s)
  - [Relációk a modellek között](http://webprogramozas.inf.elte.hu/#!/subjects/webprog-server/handouts/laravel-04-rel%C3%A1ci%C3%B3k)
  - [Hitelesítés és jogosultságkezelés](http://webprogramozas.inf.elte.hu/#!/subjects/webprog-server/handouts/laravel-05-hiteles%C3%ADt%C3%A9s)
- Hivatalos dokumentációk:
  - [Laravel dokumentáció](https://laravel.com/docs)
    - [Blade direktívák](https://laravel.com/docs/9.x/blade)
    - [Resource Controllers](https://laravel.com/docs/9.x/controllers#resource-controllers)
    - [Validációs szabályok](https://laravel.com/docs/9.x/validation#available-validation-rules)
    - [Migrációknál elérhető mezőtípusok](https://laravel.com/docs/9.x/migrations#available-column-types)
  - [Laravel API dokumentáció](https://laravel.com/api/master/index.html)
  - [PHP dokumentáció](https://www.php.net/manual/en/)
  - [Bootstrap 5 dokumentáció](https://getbootstrap.com/docs/)
- Programok, fejlesztői eszközök:
  - [PHP és Composer telepítő](https://github.com/totadavid95/PhpComposerInstaller) (php + composer)
  - [Node.js](https://nodejs.org/en/download/) (node + npm)
  - [Visual Studio Code](https://code.visualstudio.com/)
    - [Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)
    - [Laravel Extension Pack](https://marketplace.visualstudio.com/items?itemName=onecentlin.laravel-extension-pack)
    - [SQLite Viewer](https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer)
  - [DB Browser for SQLite](https://sqlitebrowser.org/)
- További CSS framework tippek (opcionális):
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Material Bootstrap](https://mdbootstrap.com/)
  - [Material UI, React-hez](https://material-ui.com/)
  - [Fontawesome ikonkészlet](https://fontawesome.com/)
  - [Bulma](https://bulma.io/)
