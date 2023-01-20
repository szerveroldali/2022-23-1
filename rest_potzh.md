# Szerveroldali webprogramozás - REST API pót/javító zárthelyi

_2023. január 11. 12:00-15:00_

Tartalom:

- [Szerveroldali webprogramozás - REST API pót/javító zárthelyi](#szerveroldali-webprogramozás---rest-api-pótjavító-zárthelyi)
  - [Tudnivalók](#tudnivalók)
  - [Hasznos hivatkozások](#hasznos-hivatkozások)
  - [Kezdőcsomag segédlet](#kezdőcsomag-segédlet)
  - [Feladatok](#feladatok)
    - [1. feladat: Modellek és kapcsolatok (3 pont)](#1-feladat-modellek-és-kapcsolatok-3-pont)
    - [2. feladat: Seeder (3 pont)](#2-feladat-seeder-3-pont)
    - [3. feladat: `GET /generate-share-link` (1 pont)](#3-feladat-get-generate-share-link-1-pont)
    - [4. feladat: `GET /validate-share-link/:link` (2 pont)](#4-feladat-get-validate-share-linklink-2-pont)
    - [5. feladat: `GET /files` (1 pont)](#5-feladat-get-files-1-pont)
    - [6. feladat: `GET /files/:id` (1 pont)](#6-feladat-get-filesid-1-pont)
    - [7. feladat: `POST /files` (1,5 pont)](#7-feladat-post-files-15-pont)
    - [8. feladat: `PATCH /files/:id` (1,5 pont)](#8-feladat-patch-filesid-15-pont)
    - [9. feladat: `POST /login` (2 pont)](#9-feladat-post-login-2-pont)
    - [10. feladat: `GET /my-files` (2 pont)](#10-feladat-get-my-files-2-pont)
    - [11. feladat: `GET /users` (4 pont)](#11-feladat-get-users-4-pont)
    - [12. feladat: `POST /new-share` (4 pont)](#12-feladat-post-new-share-4-pont)
    - [13. feladat: `POST /download` (4 pont)](#13-feladat-post-download-4-pont)
## Tudnivalók

<details>
<summary>Tudnivalók megjelenítése</summary>

- A zárthelyi megoldására **180 perc** áll rendelkezésre, amely a kidolgozás mellett **magába foglalja** a kötelező nyilatkozat értelmezésére és kitöltésére, a feladatok elolvasására, az anyagok letöltésére, összecsomagolására és feltöltésére szánt időt is.
- **A zárthelyi idejében a tárgy _Teams_ csoportjának _Általános/General_ csatornáján írásos formában rendelkezésre állunk. Érdemes a csatorna üzeneteit figyelemmel kísérni az időközben érkező információk vagy esetleges kérdések miatt.**
- A kidolgozást a Canvas rendszeren keresztül kell beadni egyetlen **.zip** állományként. **A rendszer pontban 15:00-kor lezár, ezután nincs lehetőség beadásra!**
- A beadást és nyilatkozat kitöltését megkönnyítendő létrehoztunk egy parancsot a kezdőcsomagban, amely `npm run zip` hívásával futtatható. Igyekeztünk a legjobb tudásunk szerint elkészíteni csomagolót, de beadás előtt mindenképpen ellenőrizd a `zipfiles` mappában létrejött állomány tartalmát! **A helyes és hiánytalan feltöltés ellenőrzése a hallgató feladata, az ebből fakadó hibákért felelősséget nem vállalunk!**
- A `node_modules` könyvtár beadása **TILOS!**
- A megfelelően kitöltött `statement.txt` (nyilatkozat) nélküli megoldásokat **nem értékeljük**. Ha esetleg a nyilatkozat kimaradt vagy hibás, utólag Canvas hozzászólásban pótolható.
- A feladatok megoldásához **bármilyen segédanyag használható** (dokumentáció, előadás, órai anyag, cheat sheet). A zárthelyi időtartamában igénybe vett **emberi segítség azonban tilos** (szinkron, aszinkron, chat, fórum, stb)! Ennek tudomásul vételéről nyilatkoztok a kötelezően beküldendő nyilatkozatban is.
- A feladatokat **Node.js** környezetben, **JavaScript** nyelven kell megoldani, a **tantárgy keretein belül tanult** technológiák használatával és a biztosított **kezdőcsomagból kiindulva**!
</details>

## Hasznos hivatkozások

<details>
<summary>Hasznos hivatkozások megjelenítése</summary>

- Dokumentációk
  - [Sequelize dokumentáció](https://sequelize.org/master/)
  - [Model querying - basics](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)
  - [Model querying - finders](https://sequelize.org/docs/v6/core-concepts/model-querying-finders/)
  - [Sequelize asszociációk](https://github.com/szerveroldali/leirasok/blob/main/SequelizeAsszociaciok.md) (tantárgyi leírás)
  - [Fastify dokumentáció](https://www.fastify.io/docs/latest/)
- Eszközök:
  - [SQLite Viewer (VS Code kiegészítő)](https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer)
  - [Firecamp (Chrome kiegészítő)](https://chrome.google.com/webstore/detail/firecamp-a-campsite-for-d/eajaahbjpnhghjcdaclbkeamlkepinbl)
  - [DB Browser for SQLite](https://sqlitebrowser.org/)
  - [Postman](https://www.postman.com/)

</details>

## Kezdőcsomag segédlet

<details>
<summary>Kezdőcsomag segédlet megjelenítése</summary>

A zárthelyihez kezdőcsomagot biztosítunk, amelynek használata **kötelező**. A csomagot GitHub-ról lehet letölteni, a függőségek telepítése után (`npm i`) kezdhető meg a fejlesztés.

- A kezdőcsomag elérhető ebben a GitHub repository-ban:
  - https://github.com/szerveroldali/zh_kezdocsomag
  - vagy: [Közvetlen letöltési link](https://github.com/szerveroldali/zh_kezdocsomag/archive/refs/heads/main.zip) _(.zip fájl)_
- Hasznos parancsok:
  - `npm run db`˙- adatbázis migrációk futtatása (üres adatbázisból indulva) és seedelés
  - `npm run dev` - `server.js` futtatása watch módban (változtatásra a szerver újraindul)
  - `npm run zip` - zárthelyi becsomagolása
  - `npm run test` - automatikus tesztelő
- Az automatikus tesztelőről
  - **FONTOS! Nem az a feladat, hogy addig futtasd a tesztelőt, amíg minden át nem megy; hanem az, hogy a dolgozatot oldd meg a legjobb tudásod szerint! Ehhez a tesztelő csak egy segédlet, ami lehetőség szerint egy gyors visszajelzést ad a munkádról azáltal, hogy leteszteli a főbb eseteket, és ha azokon átmegy a megoldásod, akkor _valószínűleg_ jó.**
  - A tesztelő használata nem kötelező.
  - A tesztelő által adott eredmények csak tájékoztató jellegűek, melyektől a végleges értékelés pozitív és negatív irányba is eltérhet.
  - Használat módja:
    - `npm run test` - minden feladat tesztelése
    - pl. `npm run test 3 5` - csak a 3. és 5. feladat tesztelése
  - Természetesen a tesztelő csak akkor fog működni, ha a kezdőcsomag `test` könyvtárába elhelyezésre kerültek a zárthelyi idején közzétett fájlok!
  </details>

## Feladatok

Készíts _Node.js_ környezetben, _JavaScript_ nyelv használatával egy **REST API**-t az alábbi pontoknak megfelelően! A tantárgy gyakorlati tematikájához illeszkedve adatbázisként _SQLite3_, ORM-ként _Sequelize_, kiszolgálóként pedig _Fastify_ keretrendszer használata kötelező. (A zárthelyihez kiadott [kezdőcsomagban](https://github.com/szerveroldali/zh_kezdocsomag) ezen csomagok már inicializálva vannak.)

### 1. feladat: Modellek és kapcsolatok (3 pont)

> :warning: **A modelleket és a seedert odaadjuk obfuszkált formában, így az 1. és 2. feladat a dolgozat végére halasztható vagy akár ki is hagyható. Értelemszerűen a kihagyott feladatokra nem jár pont! Ha valamelyiket kihagyod, ott az obfuszkált verziókat add be!**

Hozd létre az alábbi modelleket Sequelize CLI használatával! Az `id`, `createdAt` és `updatedAt` mezők a alapértelmezetten létrejönnek, így ezeket a feladat bővebben nem fejti ki. Alapesetben egyik mező értéke sem lehet `null`, hacsak nem adtunk külön `nullable` kikötést! Tehát alapértelmezés szerint a migráció minden mezőjére
```js
allowNull: false
```
van érvényben, ahol a feladat ettől eltérően nem jelzi.

A következő modelleket kell kigenerálni/létrehozni: 

- `User` - felhasználó
  - `id`
  - `email` - string, egyedi (unique)
  - `realname` - string, nullable, a felhasználó valódi neve
  - `isPremium` - boolean, prémium előfizető-e
  - `createdAt`
  - `updatedAt`
- `File` - feltöltött fájlok
  - `id`
  - `filename` - string, a feltöltött fájl neve
  - `filesize` - integer, a feltöltött fájl mérete bájtban
  - `downloaded` - integer, az eddigi letöltések száma
  - `UserId` - integer, a fájlt feltöltő felhasználó azonosítója
  - `createdAt`
  - `updatedAt`
- `Share` - megosztások
  - `id`
  - `link` - string, egyedi (unique)
  - `isEditable` - boolean, a megosztott fájlok szerkeszthetők-e
  - `createdAt`
  - `updatedAt`

A fenti modellek közötti asszociációk (kapcsolatok):

- `User` 1 : N `File`
- `File` N : N `Share`

_Természetesen 1:N kapcsolatot egy felvett mezővel, N:N kapcsolatot pedig külön kapcsolótábla létrehozásával tárolunk._

### 2. feladat: Seeder (3 pont)

Hozz létre egy seedert, melynek segítségével feltölthető az adatbázis mintaadatokkal!

A megoldás akkor számít teljes értékűnek, ha az alábbiak **mindegyike** teljesül:
1. a seeder mindegyik modellből generál észszerű számban
2. a generált modellek minden esetet lefednek (pl. egy nullable mező néhol ki van töltve adattal, néhol pedig `null` értékű; logikai mező változatosan igaz vagy hamis, stb.)
3. a kapcsolatok is megfelelően fel vannak töltve

A seedert az automatikus tesztelő nem tudja értékelni, minden esetben a gyakorlatvezető fogja kézzel pontozni.

### 3. feladat: `GET /generate-share-link` (1 pont)

Tegyük fel, hogy a megosztó linkeket ezentúl _(értsd: a seedernél még erre nem kellett figyelni, hiszen nem kötöttük ki az egyszerűség kedvéért)_ az alábbi formátum szerint generáljuk: `XXXXXXXXXX_YYYYYYYY_ZZZ`, ahol az `X`-ek a Unix időbélyeg számjegyei a generálás pillanatában, `Y` betűk helyén véletlenszerű alfanumerikus karakterek állnak és `ZZZ` egy háromjegyű szám 000-tól 999-ig.

A végpontot meghívva egyszerű szöveges kimenetként generálódjon egy véletlenszerű azonosító ennek a formátumnak megfelelően!

- Minta kérés: `GET http://localhost:4000/generate-share-link`
- Válasz helyes kérés esetén: `200 OK`
```txt
1673430159_kceqe4xy_023
```

_(Technikai segítség: a JavaScript nyelvben többnyire olyan időbélyegekkel találkozunk, amelyek ezredmásodperceket is tartalmaznak - ezeket el kell osztani 1000-rel, hogy a fent várt karakterszámot kapjuk!)_

### 4. feladat: `GET /validate-share-link/:link` (2 pont)

Most fordítsuk meg a feladatot, vagyis dekódoljuk az előző feladatban előállított szöveg három részét!

- Minta kérés: `GET http://localhost:4000/validate-share-link/1673430159_kceqe4xy_023`
- Válasz, ha `link` paraméter hiányzik / üres string: `400 BAD REQUEST`
- Válasz, ha van kitöltött `link` paraméter, de nem felel meg az előző feladatban leírt formátumnak: `418 I'M A TEAPOT` 
- Ha az előző feladatban generáltnak megfelelő formátumú a szöveg, akkor `200 OK` válasz mellett adjuk vissza, hogy milyen dátum (`date`), alfanumerikus string (`alpha`) és szám (`number`) alapján képeztük!
```json
{
  "date": "2023-01-11T09:42:39.000Z",
  "alpha": "kceqe4xy",
  "number": 23
}
```

### 5. feladat: `GET /files` (1 pont)

Lekéri az összes létező fájlt.

- Minta kérés: `GET http://localhost:4000/files`
- Válasz helyes kérés esetén: `200 OK`
```json
[
  {
    "id": 1,
    "filename": "card_orchestrate_busily.dist",
    "filesize": 349299091,
    "downloads": 3911,
    "UserId": 1,
    "createdAt": "2023-01-11T...",
    "updatedAt": "2023-01-11T..."
  },
  {
    "id": 2,
    "filename": "reboot_indio.knp",
    "filesize": 912930351,
    "downloads": 601,
    "UserId": 5,
    "createdAt": "2023-01-11T...",
    "updatedAt": "2023-01-11T..."
  },
  stb.
]
```

### 6. feladat: `GET /files/:id` (1 pont)

Lekéri a megadott azonosítójú fájl adatait.

- Minta kérés: `GET http://localhost:4000/files/2`
- Válasz, ha az `id` paraméter hiányzik: `400 BAD REQUEST`
- Válasz, ha a megadott `id`-vel nem létezik állat: `404 NOT FOUND`
- Válasz helyes kérés esetén: `200 OK`
```json
{
  "id": 2,
  "filename": "reboot_indio.knp",
  "filesize": 912930351,
  "downloads": 601,
  "UserId": 5,
  "createdAt": "2023-01-11T...",
  "updatedAt": "2023-01-11T..."
},
```

### 7. feladat: `POST /files` (1,5 pont)

Létrehoz egy új fájlt a kérés törzsében (body) megadott adatokkal. A törzsnek minden mezőt kötelezően tartalmaznia kell, kivéve a `downloads` számlálót, amely ha nincs megadva, akkor 0 értékkel tárolódjon el!

_(A valóságban nyilván hitelesített felhasználó töltene fel fájlt, de a zárthelyi ezen feladatánál egyelőre nem szükséges ezzel foglalkozni, bárki meghívhatja a végpontot.)_

- Minta kérés: `POST http://localhost:4000/files`
```json
{
  "filename" : "new_file.zip",
  "filesize": 9870,
  "UserId": 3
}
```
- Válasz, ha a kérés törzse (body) hiányos vagy hibás adatot tartalmaz: `400 BAD REQUEST`
- Válasz helyes kérés esetén: `201 CREATED`
```json
{
  "id": ...,
  "filename": "new_file.zip",
  "filesize": 9870,
  "UserId": 3,
  "downloads": 0,
  "updatedAt": "2023-01-11T...",
  "createdAt": "2023-01-11T..."
}
```

### 8. feladat: `PATCH /files/:id` (1,5 pont)

Az adott azonosítójú fájl megadott mezőinek felülírása.

_(Hitelesítés ennél a feladatnál sem szükséges még.)_

- Minta kérés: `PATCH http://localhost:4000/files/13`
```json
{
  "filesize": 20000
}
```
- Válasz, ha a kérés bármelyik része (paraméter vagy törzs) hibás: `400 BAD REQUEST`
- Válasz, ha a megadott `id`-vel nem létezik fájl: `404 NOT FOUND`
- Válasz helyes kérés esetén: `200 OK`
```json
{
  "id": 13,
  "filename": "qkjhrwahpky.mp4",
  "filesize": 20000,
  "downloads": 3847,
  "UserId": 10,
  "createdAt": "2023-01-11T...",
  "updatedAt": "2023-01-11T..."
}
```

### 9. feladat: `POST /login` (2 pont)

**Hitelesítés.** Az egyszerűség kedvéért nincs jelszókezelés, csak egy létező felhasználó e-mail címét kell felküldeni a kérés törzsében (body). Ha a megadott e-mail címmel létezik felhasználó az adatbázisban, azt sikeres bejelentkezésnek vesszük és kiállítjuk a tokent. Ne felejtsd el a payload-ba a felhasználó adatait elhelyezni!

_(Technikai részletek: A token aláírásához `HS256` algoritmust használj `secret` titkosító kulccsal! A kiadott kezdőcsomag alapbeállításon erre a működésre van konfigurálva, de ha szükségessé válna a [tokent ellenőrizni](https://jwt.io/), akkor hasznos ezekről tudni.)_

- Minta kérés: `POST http://localhost:4000/login`
```json
{
  "email": "gipsz.jakab@inf.elte.hu"
}
```
- Válasz, ha a kérés hibás: `400 BAD REQUEST`
- Válasz, ha a megadott e-mail címmel nem létezik felhasználó: `404 NOT FOUND`
- Válasz helyes kérés esetén: `200 OK`
```json
{
  "token": "ey..."
}
```

### 10. feladat: `GET /my-files` (2 pont)

**Hitelesített végpont!** Lekéri az összes olyan fájlt, amelynek a hitelesített felhasználó a feltöltője. Az egyes fájlokhoz adjuk meg azokat a megosztásokat is, amelyekben szerepelnek, de a kapcsolótáblát ne ismételjük fölöslegesen! (Lásd minta!)

Emlékeztető! A hitelesített végpontokra a következő fejléccel kell kérést küldeni:
```
Authorization: Bearer <token>
```

- Minta kérés: `GET http://localhost:4000/my-files`
- Válasz hitelesítetlen kérés esetén: `401 UNAUTHORIZED`
- Válasz helyes kérés esetén: `200 OK`
```json
[
  {
    "id": 1,
    "filename": "card_orchestrate_busily.dist",
    "filesize": 349299091,
    "downloads": 3911,
    "UserId": 1,
    "createdAt": "2023-01-11T...",
    "updatedAt": "2023-01-11T...",
    "Shares": [
      {
        "id": 1,
        "link": "1672886278_7x5047uq_764",
        "isEditable": true,
        "createdAt": "2023-01-11T...",
        "updatedAt": "2023-01-11T..."
      },
      stb.
    ]
  },
  stb.
]
```

### 11. feladat: `GET /users` (4 pont)

**Hitelesített végpont!** A hitelesített felhasználók lekérhetik az összes felhasználó listáját, kiegészítve a következő mezőkkel:
- `fileCount` - a felhasználó által feltöltött fájlok száma
- `totalFileSize` - a felhasználó által feltöltött fájlok méretének összege

Az eredmény legyen a feltöltött fájlok száma szerint csökkenő sorrendbe rendezett! Amennyiben két felhasználó között egyezés van a feltöltött fájlok számában, akkor az kerüljön előre, akinek nagyobb a feltöltött fájlok összmérete! Ha az összméret is egyezik, akkor azonosító szerint növekvő sorrendben szerepeljenek!

- Minta kérés: `GET http://localhost:4000/users`
- Válasz hitelesítetlen kérés esetén: `401 UNAUTHORIZED`
- Válasz helyes kérés esetén: `200 OK`
```json
[
  {
    "id": 1,
    "email": "Braxton37@hotmail.com",
    "realname": "Teresa Langworth",
    "isPremium": true,
    "createdAt": "2023-01-11T...",
    "updatedAt": "2023-01-11T...",
    "fileCount": 8,
    "totalFileSize": 4081924681
  },
  {
    "id": 6,
    "email": "Jeanie_Ledner10@gmail.com",
    "realname": "Lola Ankunding",
    "isPremium": true,
    "createdAt": "2023-01-11T...",
    "updatedAt": "2023-01-11T...",
    "fileCount": 8,
    "totalFileSize": 3813231605
  },
  stb.
]
```

### 12. feladat: `POST /new-share` (4 pont)

**Hitelesített végpont!** Ezzel a végponttal egy hitelesített felhasználó új megosztást hozhat létre, amelybe elhelyezheti a **saját** állományait!

A kérés törzse tartalmazza, hogy a megosztott fájlok más által szerkeszthetők-e (`isEditable`), valamint egy tömbként a megosztásban elhelyezett fájlok azonosítóit (`fileIds`)! A megosztás tárolásához persze ezeken felül egy szöveges link is szükséges, ehhez használd a 3. feladatban előállított generátort!

Előállítandó az alábbi minta szerinti objektum, amely tartalmazza a létrejött megosztás (`createdShare`) adatait, ideértve a benne szereplő fájlokat is a kapcsolótábla adatainak fölösleges szerepeltetése nélkül; valamint az elfogadott (`sharedFileIds`) és elutasított (`rejectedFileIds`) fájlazonosítók tömbjét! A fájlazonosító akkor kerül elutasításra, ha nem létezik ilyen azonosítóval fájl; vagy létezik, de nem a felhasználó töltötte fel!

- Minta kérés: `POST http://localhost:4000/new-share`
```json
{
  "isEditable": true,
  "fileIds": [-999, "nem", 2, 3, 4, 6] 
}
```
- Válasz, ha a bemenet nem tartalmazza a szükséges mezőket: `400 BAD REQUEST`
- Válasz hitelesítetlen kérés esetén: `401 UNAUTHORIZED`
- Válasz helyes kérés esetén: `201 CREATED`
```json
{
  "sharedFileIds": [4, 6],
  "rejectedFileIds": [-999, "nem", 2, 3],
  "createdShare": {
    "id": ...,
    "link": "1673430159_77qqpglt_906",
    "isEditable": true,
    "createdAt": "2023-01-11T...",
    "updatedAt": "2023-01-11T...",
    "Files": [
      {
        "id": 4,
        "filename": "hm_idaho_lompoc.mpg",
        "filesize": 109377195,
        "downloads": 4069,
        "UserId": 1,
        "createdAt": "2023-01-11T...",
        "updatedAt": "2023-01-11T..."
      },
      stb.
    ]
  }
}
```

### 13. feladat: `POST /download` (4 pont)

**Hitelesített végpont!** A prémiumra előfizető felhasználóknak (`isPremium`) lehetőségük van egyszerre több megosztás linkjét megadva letölteni az összes bennük szereplő fájlt.

Ha a kérésben szereplő bármelyik megosztólink érvénytelen, akkor egyetlen fájl letöltéseinek száma se módosuljon, még az érvényes megosztásokon keresztül elérhetőké sem!

Helyes kérés esetén a letöltött fájlok letöltéseinek száma (`downloads`) növekedjen 1-gyel! Vigyázzunk azonban arra, hogy ha egy fájl több megadott megosztásban is szerepel, akkor is csak egyszer "töltődjön le"! A válasz ilyenkor tartalmazza az érintett megosztásokat és a bennük lévő fájlokat (a kapcsolótábla adatai nélkül), a linkek felsorolásának sorrendjét megtartva. (Lásd minta!)

- Minta kérés: `POST http://localhost:4000/download`
```json
["1673430159_7x5047uq_764", "1673430159_hdqt37tt_560"]
```
- Válasz, ha a törzs nem tömb: `400 BAD REQUEST`
- Válasz hitelesítetlen kérés esetén: `401 UNAUTHORIZED`
- Válasz, ha a hitelesített felhasználó nem prémium előfizető: `403 FORBIDDEN`
- Válasz, ha egy vagy több link nem mutat létező megosztásra: `404 NOT FOUND`
- Válasz helyes kérés esetén: `200 OK`
```json
[
  {
    "id": 3,
    "link": "1673430159_hdqt37tt_560",
    "isEditable": true,
    "createdAt": "2023-01-11T...",
    "updatedAt": "2023-01-11T...",
    "Files": [
      {
        "id": 26,
        "filename": "international_ivory.uvu",
        "filesize": 230679537,
        "downloads": 1896,
        "UserId": 1,
        "createdAt": "2023-01-11T...",
        "updatedAt": "2023-01-11T..."
      },
      stb.
    ]
  },
  stb.
]
```