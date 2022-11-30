# Szerveroldali webprogramozás - REST API zárthelyi

_2. turnus: 2022. november 30. 16:30-19:30_

Tartalom:

- [Szerveroldali webprogramozás - REST API zárthelyi](#szerveroldali-webprogramozás---rest-api-zárthelyi)
  - [Tudnivalók](#tudnivalók)
  - [Hasznos hivatkozások](#hasznos-hivatkozások)
  - [Kezdőcsomag segédlet](#kezdőcsomag-segédlet)
  - [Feladatok](#feladatok)
    - [1. feladat: Modellek és kapcsolatok (3 pont)](#1-feladat-modellek-és-kapcsolatok-3-pont)
    - [2. feladat: Seeder (3 pont)](#2-feladat-seeder-3-pont)
    - [3. feladat: `GET /animals` (1 pont)](#3-feladat-get-animals-1-pont)
    - [4. feladat: `GET /animals/:id` (1,5 pont)](#4-feladat-get-animalsid-15-pont)
    - [5. feladat: `POST /animals` (1,5 pont)](#5-feladat-post-animals-15-pont)
    - [6. feladat: `PATCH /animals/:id` (2 pont)](#6-feladat-patch-animalsid-2-pont)
    - [7. feladat: `POST /login` (2 pont)](#7-feladat-post-login-2-pont)
    - [8. feladat: `GET /my-animals` (2 pont)](#8-feladat-get-my-animals-2-pont)
    - [9. feladat: `GET /my-animals/with-place` (2 pont)](#9-feladat-get-my-animalswith-place-2-pont)
    - [10. feladat: `POST /my-animals` (4 pont)](#10-feladat-post-my-animals-4-pont)
    - [11. feladat: `POST /clean-places` (4 pont)](#11-feladat-post-clean-places-4-pont)
    - [12. feladat: `POST /move-animals` (4 pont)](#12-feladat-post-move-animals-4-pont)

## Tudnivalók

<details>
<summary>Tudnivalók megjelenítése</summary>

- A zárthelyi megoldására **180 perc** áll rendelkezésre, amely a kidolgozás mellett **magába foglalja** a kötelező nyilatkozat értelmezésére és kitöltésére, a feladatok elolvasására, az anyagok letöltésére, összecsomagolására és feltöltésére szánt időt is.
- A kidolgozást a Canvas rendszeren keresztül kell beadni egyetlen **.zip** állományként. **A rendszer pontban 19:30-kor lezár, ezután nincs lehetőség beadásra!**
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
  - https://github.com/szerveroldali/restapi_kezdocsomag
  - vagy: [Közvetlen letöltési link](https://github.com/szerveroldali/restapi_kezdocsomag/archive/refs/heads/main.zip) _(.zip fájl)_
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

Készíts _Node.js_ környezetben, _JavaScript_ nyelv használatával egy **REST API**-t az alábbi pontoknak megfelelően! A tantárgy gyakorlati tematikájához illeszkedve adatbázisként _SQLite3_, ORM-ként _Sequelize_, kiszolgálóként pedig _Fastify_ keretrendszer használata kötelező. (A zárthelyihez kiadott [kezdőcsomagban](https://github.com/szerveroldali/restapi_kezdocsomag) ezen csomagok már inicializálva vannak.)

### 1. feladat: Modellek és kapcsolatok (3 pont)

> :warning: **A modelleket és a seedert odaadjuk obfuszkált formában, így az 1. és 2. feladat a dolgozat végére halasztható vagy akár ki is hagyható. Értelemszerűen a kihagyott feladatokra nem jár pont! Ha valamelyiket kihagyod, ott az obfuszkált verziókat add be!**

Hozd létre az alábbi modelleket Sequelize CLI használatával! Az `id`, `createdAt` és `updatedAt` mezők a alapértelmezetten létrejönnek, így ezeket a feladat bővebben nem fejti ki. Alapesetben egyik mező értéke sem lehet `null`, hacsak nem adtunk külön `nullable` kikötést! Tehát alapértelmezés szerint a migráció minden mezőjére
```js
allowNull: false
```
van érvényben, ahol a feladat ettől eltérően nem jelzi.

A következő modelleket kell kigenerálni/létrehozni: 

- `Place` - élőhely
  - `id`
  - `cleaned` - boolean, kitakarították-e az élőhelyet
  - `capacity` - integer, az élőhelyben még kényelmesen elhelyezhető állatok maximális száma
  - `createdAt`
  - `updatedAt`
- `Animal` - állat
  - `id`
  - `name` - string, az állat neve
  - `weight` - float, az állat tömege
  - `birthdate` - date, az állat születésének napja
  - `image` - string, nullable, kép az állatról
  - `PlaceId` - integer, az állat élőhelyének azonosítója
  - `createdAt`
  - `updatedAt`
- `Handler` - állatgondozó
  - `id`
  - `name` - string, a gondozó teljes neve, egyedi (unique)
  - `power` - integer, a gondozó tekintélye a szervezeten belül (nagyobb = jobb)
  - `createdAt`
  - `updatedAt`

A fenti modellek közötti asszociációk (kapcsolatok):

- `Place` 1 : N `Animal`
- `Animal` N : N `Human`

_Természetesen 1:N kapcsolatot egy felvett mezővel, N:N kapcsolatot pedig külön kapcsolótábla létrehozásával tárolunk._

### 2. feladat: Seeder (3 pont)

Hozz létre egy seedert, melynek segítségével feltölthető az adatbázis mintaadatokkal!

A megoldás akkor számít teljes értékűnek, ha az alábbiak **mindegyike** teljesül:
1. a seeder mindegyik modellből generál észszerű számban
2. a generált modellek minden esetet lefednek (pl. egy nullable mező néhol ki van töltve adattal, néhol pedig `null` értékű; logikai mező változatosan igaz vagy hamis, stb.)
3. a kapcsolatok is megfelelően fel vannak töltve

Kis technikai segítség a szép seederhez:
- születési dátumra opciók: [faker.date.birthdate()](https://fakerjs.dev/api/date.html#birthdate) vagy [faker.date.recent()](https://fakerjs.dev/api/date.html#recent)
- állatos kép URL: [faker.image.animals()](https://fakerjs.dev/api/image.html#animals) -  a kép nem fog minden megtekintéskor változni, ha a harmadik paraméter igaz

A seedert az automatikus tesztelő nem tudja értékelni, minden esetben a gyakorlatvezető fogja kézzel pontozni.

### 3. feladat: `GET /animals` (1 pont)

Lekéri az összes létező állatot.

- Minta kérés: `GET http://localhost:4000/animals`
- Válasz helyes kérés esetén: `200 OK`
```json
[
  {
    "id": 1,
    "name": "John",
    "weight": 32.42,
    "birthdate": "2021-09-25T18:33:20.128Z",
    "image": null,
    "PlaceId": 1,
    "createdAt": "2022-11-30T...",
    "updatedAt": "2022-11-30T..."
  },
  {
    "id": 2,
    "name": "Kelli",
    "weight": 6.51,
    "birthdate": "2015-11-06T19:47:21.856Z",
    "image": "https://loremflickr.com/640/480/animals?lock=66212",
    "PlaceId": 7,
    "createdAt": "2022-11-30T...",
    "updatedAt": "2022-11-30T..."
  },
  stb.
]
```

### 4. feladat: `GET /animals/:id` (1,5 pont)

Lekéri a megadott azonosítójú állat adatait.

- Minta kérés: `GET http://localhost:4000/animals/6`
- Válasz, ha az `id` paraméter hiányzik vagy nem egész szám: `400 BAD REQUEST`
- Válasz, ha a megadott `id`-vel nem létezik élőhely: `404 NOT FOUND`
- Válasz helyes kérés esetén: `200 OK`
```json
{
  "id": 6,
  "name": "Luna",
  "weight": 4.69,
  "birthdate": "2019-12-31T15:17:47.608Z",
  "image": "https://loremflickr.com/640/480/animals?lock=31911",
  "PlaceId": 3,
  "createdAt": "2022-11-30T...",
  "updatedAt": "2022-11-30T..."
}
```

### 5. feladat: `POST /animals` (1,5 pont)

Létrehoz egy új állatot a kérés törzsében (body) megadott adatokkal. A törzsnek minden kötelezően kitöltendő mezőt tartalmaznia kell; viszont az `image` hiányozhat, amely esetben a visszaadott objektum ezen mezője `null` értéket kell tartalmazzon.

_(A valóságban nyilván hitelesített felhasználó hozna létre állatot, de a zárthelyi ezen feladatánál egyelőre nem szükséges ezzel foglalkozni, bárki meghívhatja a végpontot.)_

- Minta kérés: `POST http://localhost:4000/animals`
```json
{
  "name" : "Winnie",
  "weight" : 8.6,
  "birthdate" : "2018-07-09",
  "image" : null,
  "PlaceId" : 2
}
```
- Válasz, ha a kérés törzse (body) hiányos vagy hibás adatot tartalmaz: `400 BAD REQUEST`
- Válasz helyes kérés esetén: `201 CREATED`
```json
{
  "id": ...,
  "name": "Winnie",
  "weight": 8.6,
  "birthdate": "2018-07-09T00:00:00.000Z",
  "image": null,
  "PlaceId": 2,
  "updatedAt": "2022-11-30T...",
  "createdAt": "2022-11-30T..."
}
```

### 6. feladat: `PATCH /animals/:id` (2 pont)

Az adott azonosítójú állat megadott mezőinek felülírása.

_(Hitelesítés ennél a feladatnál sem szükséges még.)_

- Minta kérés: `PATCH http://localhost:4000/animals/13`
```json
{
  "weight": 12.3
}
```
- Válasz, ha a kérés bármelyik része (paraméter vagy törzs) hibás: `400 BAD REQUEST`
- Válasz, ha a megadott `id`-vel nem létezik állat: `404 NOT FOUND`
- Válasz helyes kérés esetén: `200 OK`
```json
{
  "id": 13,
  "name": "Delaney",
  "weight": 12.3,
  "birthdate": "2012-12-28T00:16:57.719Z",
  "image": null,
  "PlaceId": 9,
  "createdAt": "2022-11-30T...",
  "updatedAt": "2022-11-30T..."
}
```

### 7. feladat: `POST /login` (2 pont)

**Hitelesítés.** Az egyszerűség kedvéért nincs jelszókezelés, csak egy létező gondozó teljes nevét kell felküldeni a kérés törzsében (body). Ha a megadott névvel létezik gondozó az adatbázisban, azt sikeres bejelentkezésnek vesszük és kiállítjuk a tokent. Ne felejtsd el a payload-ba a felhasználó adatait elhelyezni! 

_(Technikai részletek: A token aláírásához `HS256` algoritmust használj `secret` titkosító kulccsal! A kiadott kezdőcsomag alapbeállításon erre a működésre van konfigurálva, de ha szükségessé válna a [tokent ellenőrizni](https://jwt.io/), akkor hasznos ezekről tudni.)_

- Minta kérés: `POST http://localhost:4000/login`
```json
{
  "name": "Sarah Connor"
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

### 8. feladat: `GET /my-animals` (2 pont)

**Hitelesített végpont!** Lekéri az összes olyan állatot, amelynek a hitelesített felhasználó gondozója.

Emlékeztető! A hitelesített végpontokra a következő fejléccel kell kérést küldeni:
```
Authorization: Bearer <token>
```

- Minta kérés: `GET http://localhost:4000/my-animals`
- Válasz hitelesítetlen kérés esetén: `401 UNAUTHORIZED`
- Válasz helyes kérés esetén: `200 OK`
```json
[
  {
    "id": 7,
    "name": "Herminio",
    "weight": 1.88,
    "birthdate": "2014-01-12T08:48:37.433Z",
    "image": "https://loremflickr.com/640/480/animals?lock=70244",
    "PlaceId": 6,
    "createdAt": "2022-11-30T...",
    "updatedAt": "2022-11-30T...",
    "AnimalHandler": {
        "createdAt": "2022-11-30T...",
        "updatedAt": "2022-11-30T...",
        "AnimalId": 7,
        "HandlerId": 3
    }
  },
  stb.
]
```

### 9. feladat: `GET /my-animals/with-place` (2 pont)

**Hitelesített végpont!** Lekéri az összes olyan állatot, amelynek a hitelesített felhasználó gondozója. Az előző feladathoz képest a különbség kimenet formátumában van, ugyanis most minden állathoz az élőhelyének adatait is tartalmazza a válasz. A kapcsolótáblát (amely csak ismételné az állat és a gondozó azonosítóját), illetve az állatokhoz tartozó `PlaceId` mezőket ne vegyük bele fölöslegesen a válaszba! (Lásd a példát!)

- Minta kérés: `GET http://localhost:4000/my-animals/with-place`
- Válasz hitelesítetlen kérés esetén: `401 UNAUTHORIZED`
- Válasz helyes kérés esetén: `200 OK`
```json
[
  {
    "id": 7,
    "name": "Herminio",
    "weight": 1.88,
    "birthdate": "2014-01-12T08:48:37.433Z",
    "image": "https://loremflickr.com/640/480/animals?lock=70244",
    "createdAt": "2022-11-30T...",
    "updatedAt": "2022-11-30T...",
    "Place": {
      "id": 6,
      "cleaned": false,
      "capacity": 45,
      "createdAt": "2022-11-30T...",
      "updatedAt": "2022-11-30T..."
    }
  },
  stb.
]
``` 

### 10. feladat: `POST /my-animals` (4 pont)

**Hitelesített végpont!** Segítségével a hitelesített gondozó általa gondozottként jelölhet meg egyszerre több állatot az azonosítójuk alapján. (Figyelem! Egy állatnak több gondozója is lehet egyszerre, ezek közé kell bekerüljön a hitelesített gondozó, de a többi is meg kell maradjon!)

Minden állatazonosító az alábbi három esetből pontosan egybe tartozik:
- `invalidAnimals`: a megadott azonosítóval nem létezik állat
- `alreadyMyAnimals`: létezik állat a megadott azonosítóval, és már kapcsolatban áll a hitelesített gondozóval
- `adoptedAnimals`: létezik állat a megadott azonosítóval, és most került be a gondozottak közé

A válaszobjektumban az egyes állatok azonosítóját a fenti három tömb egyikében vissza kell adni attól függően, hogy melyik eset lépett fel.

- Minta kérés: `POST http://localhost:4000/my-animals`
```json
{
  "animals": [4, "puppy", 6, 7]
}
```
- Válasz formailag helytelen kérés esetén: `400 BAD REQUEST`
- Válasz hitelesítetlen kérés esetén: `401 UNAUTHORIZED`
- Válasz helyes kérés esetén: `200 OK`
```json
{
  "invalidAnimals": ["puppy"],
  "alreadyMyAnimals": [4, 7],
  "adoptedAnimals": [6]
}
```

### 11. feladat: `POST /clean-places` (4 pont)

**Hitelesített végpont!** Segítségével egy legalább 100-as tekintélyű (`power >= 100`) gondozó kitakarítottnak jelölhet egyszerre több élőhelyet, amelyek azonosítóit tömbként küldi fel.

Minden élőhely az alábbi három esetből pontosan egybe tartozik:
- `invalidPlaces`: a megadott azonosítóval nem létezik élőhely
- `alreadyCleanPlaces`: az élőhely létezik és más eleve tiszta (`cleaned` alapból igaz)
- `clearedPlaces`: az élőhely létezik és most kerül kitakarításra (`cleaned` mező most változott igazra)

A válaszobjektumban az egyes élőhelyek azonosítóját a fenti három tömb egyikében vissza kell adni attól függően, hogy melyik eset lépett fel.

- Minta kérés: `POST http://localhost:4000/clean-places`
```json
{
  "places": [2, "cage", -3, 4]
}
```
- Válasz formailag helytelen kérés esetén: `400 BAD REQUEST`
- Válasz hitelesítetlen kérés esetén: `401 UNAUTHORIZED`
- Válasz, ha a gondozónak nincs elég ereje: `403 FORBIDDEN`
- Válasz helyes kérés esetén: `200 OK`
```json
{
  "invalidPlaces": ["cage", -3],
  "alreadyCleanPlaces": [2],
  "cleanedPlaces": [4]
}
```

### 12. feladat: `POST /move-animals` (4 pont)

**Hitelesített végpont!** Segítségével egy legalább 100-as tekintélyű (`power >= 100`) gondozó állatokat helyezhet át egyik élőhelyről a másikra, amennyiben az élőhely kapacitása megengedi. A kérésben mellékelni kell az áthelyezendő állatok azonosítóit, illetve a leendő élőhelyük azonosítóját. (Lásd: minta kérés!)

A válaszban az eredeti tömb kiegészítése egy `success` mezővel, amely azt jelzi, hogy az adott áthelyezés sikeres volt-e.

Nem sikeres az áthelyezés, ha az alábbiak közül bármelyik fennáll:
- az objektumnak nincs `AnimalId` vagy `PlaceId` mezője
- nem létezik ilyen azonosítójú állat
- nem létezik ilyen azonosítójú élőhely
- az élőhelyen lévő állatok száma az áthelyezés után meghaladná annak kapacitását

Minden egyéb esetben (tehát például akkor is, ha az állat eleve ezen az élőhelyen volt) sikeres a művelet.

- Minta kérés: `POST http://localhost:4000/move-animals`
```json
[
  {"AnimalId": 3, "PlaceId": 4},
  {"AnimalId": 5, "PlaceId": -1}
]
```
- Válasz, ha a kérés törzse (body) nem tömb: `400 BAD REQUEST`
- Válasz hitelesítetlen kérés esetén: `401 UNAUTHORIZED`
- Válasz, ha a gondozónak nincs elég ereje: `403 FORBIDDEN`
- Válasz helyes kérés esetén: `200 OK`
```json
[
  {
    "AnimalId": 3,
    "PlaceId": 4,
    "success": true
  },
  {
    "AnimalId": 5,
    "PlaceId": -1,
    "success": false
  }
]
```
