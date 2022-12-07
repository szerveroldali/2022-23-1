# Szerveroldali webprogramozás - REST API zárthelyi

_2022. május 11. 15:30-17:45 (2 óra kidolgozás + 15 perc beadás)_

Tartalom:

- [Szerveroldali webprogramozás - REST API zárthelyi](#szerveroldali-webprogramozás---rest-api-zárthelyi)
  - [Tudnivalók](#tudnivalók)
  - [Hasznos linkek](#hasznos-linkek)
  - [Kezdőcsomag](#kezdőcsomag)
  - [Feladatok](#feladatok)
    - [`1. feladat: Modellek és relációk (2 pont)`](#1-feladat-modellek-és-relációk-2-pont)
    - [`2. feladat: Seeder (2 pont)`](#2-feladat-seeder-2-pont)
    - [`3. feladat: GET /tracks (0.5 pont)`](#3-feladat-get-tracks-05-pont)
    - [`4. feladat: GET /tracks/:id (0.5 pont)`](#4-feladat-get-tracksid-05-pont)
    - [`5. feladat: POST /tracks (1 pont)`](#5-feladat-post-tracks-1-pont)
    - [`6. feladat: PUT /tracks/:id (1 pont)`](#6-feladat-put-tracksid-1-pont)
    - [`7. feladat: DELETE /tracks/:id (1 pont)`](#7-feladat-delete-tracksid-1-pont)
    - [`8. feladat: POST /login (2 pont)`](#8-feladat-post-login-2-pont)
    - [`9. feladat: GET /my-playlists (1 pont)`](#9-feladat-get-my-playlists-1-pont)
    - [`10. feladat: POST /my-playlists (1 pont)`](#10-feladat-post-my-playlists-1-pont)
    - [`11. feladat: POST /my-playlists/:id/add-tracks (6 pont)`](#11-feladat-post-my-playlistsidadd-tracks-6-pont)
    - [`12. feladat: POST /my-playlists/:id/remove-tracks (6 pont)`](#12-feladat-post-my-playlistsidremove-tracks-6-pont)
    - [`13. feladat: GET /playlists/:id/tracks (6 pont)`](#13-feladat-get-playlistsidtracks-6-pont)

## Tudnivalók

- Kommunikáció
  - **A Teams csoport Általános csatornáján a zárthelyi egész ideje alatt lesz egy meeting! Elsősorban itt válaszolunk a felmerülő kérdésekre, valamint az időközben felmerülő információkat is itt osztjuk meg veletek, ezért erősen ajánlott csatlakozni!**
  - Ha a zárthelyi közben valamilyen problémád/kérdésed adódik, akkor írj nyugodtan a közös meeting chatbe vagy az oktatódnak privát chaten.
  - A közös meeting chaten tilos megosztani megoldásokat / részmegoldásokat!
- Időkeret
  - **A zárthelyi megoldására 2 óra áll rendelkezésre.**
- Beadás
  - **A beadásra az alap időkereten túl további *15* perc áll rendelkezésre. Ez a +15 perc *ténylegesen* a beadásra van! A határidő lejárta után a Canvas lezár, és további beadásra nincs lehetőség!**
  - Beadás menete:
    1. Becsomagolás: `npm run zip`
    2. A `zipfiles` mappában létrejött zip fájl ellenőrzése, hogy biztosan minden benne van-e, amit be szeretnél adni.
    3. Az ellenőrzött zip fájl feltöltése ide a Canvas feladathoz.
  - Ha előbb végzel, természetesen a határidő lejártáig bármikor beadhatod a feladatot.
  - A feladatokat `node_modules` mappa nélkül kell becsomagolni egy .zip fájlba, amit a Canvas rendszerbe kell feltölteni!
  - A dolgozat megfelelő és hiánytalan beadása a hallgató felelőssége. Mivel a dolgozat végén külön 15 perces időkeretet adunk a feladat megfelelő, nyugodt körülmények közötti beadására, ezért a határidő lejárta után már nincs lehetőség az elrontott beadások javítására.
- Értékelés
  - A legutoljára beadott megoldás lesz értékelve.
  - **A zárthelyin legalább a pontok 40%-át, vagyis legalább 12 pontot kell elérni**, ez alatt a zárthelyi sikertelen.
  - Vannak részpontok.
  - **A pótzárthelyin nem lehet rontani a zárthelyi eredményéhez képest, csak javítani.** Ez azt jelenti, ha valaki egy adott témakörből (pl. REST API) megírja mindkét zárthelyit (a normált és a pótot is), akkor a jegyébe a kettő közül a jobbik eredményt fogjuk beszámítani. Azonban fontos, hogy ez a "jobbik eredmény" **legalább** 40%, vagyis 12 pont legyen, különben az illető nem teljesítette a tárgyat!
  - **Érvényes nyilatkozat (megfelelően kitöltött statement.txt) hiányában a kapott értékelés érvénytelen, vagyis 0 pont.**
  - Az elrontott, elfelejtett nyilatkozat utólag pótolható: Canvasen kommentben kell odaírni a feladathoz.
- Egyéb
  - A feladatokat Node.js környezetben, JavaScript nyelven kell megoldani, a tantárgy keretein belül tanult technológiák használatával!
  - Ajánlott a Node.js LTS verziójának a használata. Ha a gépedre már telepítve van a Node.js és telepített példány legalább 2 főverzióval le van maradva az aktuálisan letölthető legfrissebbhez képest, akkor érdemes lehet frissíteni.

## Hasznos linkek

- Dokumentációk
  - Sequelize:
    - [Sequelize dokumentáció](https://sequelize.org/master/)
    - [Model querying basics](https://sequelize.org/master/manual/model-querying-basics.html)
    - [Sequelize asszociációk](https://github.com/szerveroldali/leirasok/blob/main/SequelizeAsszociaciok.md) (tantárgyi leírás)
  - Express:
    - [ExpressJS 4 dokumentáció](https://expressjs.com/en/4x/api.html)
- Eszközök:
  - [Postman](https://www.postman.com/)
  - [Firecamp Chrome kiegészítő](https://chrome.google.com/webstore/detail/firecamp-a-campsite-for-d/eajaahbjpnhghjcdaclbkeamlkepinbl)
  - [DB Browser for SQLite](https://sqlitebrowser.org/)

## Kezdőcsomag

Segítségképpen biztosítunk egy kezdőcsomagot a zárthelyihez. Csak telepíteni kell a csomagokat, és kezdheted is a fejlesztést.

- A kezdőcsomag elérhető ebben a GitHub repository-ban:
  - https://github.com/szerveroldali/restapi_kezdocsomag
  - Vagy: [Közvetlen letöltési link](https://github.com/szerveroldali/restapi_kezdocsomag/archive/refs/heads/main.zip) (zip fájl)
- Automatikus tesztelő: `npm run test <FELADATOK SZÁMAI>`
  - Pl. 1. és 2. feladat tesztelése: `npm run test 1 2`
  - Minden feladat tesztelése: `npm run test`
- Zippelő: `npm run zip`

## Feladatok
Készíts egy REST API-t Node.js-ben, Express, Sequelize és SQLite3 segítségével, amelyben az alább részletezett feladatokat valósítod meg! A szerver a 4000-es porton fusson!

### `1. feladat: Modellek és relációk (2 pont)`

> :warning: **A modelleket és a seedert odaadjuk obfuszkált formában (a Teams meeting-be feltöltött zip fájlban, amelyikben a tesztelő is van), így az első két feladat (modellek és relációk, ill. seeder) a dolgozat végére halasztható vagy akár ki is hagyható. Értelemszerűen a kihagyott feladatokra nem jár pont! Ha valamelyiket kihagyod, ott az obfuszkált verziókat add be!**

Sequelize CLI segítségével hozd létre a következő modelleket! Az `id`, `createdAt`, `updatedAt` a Sequelize ORM szempontjából alapértelmezett mezők, így ezeket a feladat nem specifikálja. Alapesetben egyik mező értéke sem lehet null, hacsak nem adtunk külön `nullable` kikötést! Tehát alapértelmezés szerint a migration minden mezőjére
```js
allowNull: false
```
van érvényben, kivéve ott, ahol ezt a feladat másképp nem kéri!

A modellek az alábbiak:

`User`: felhasználó
- `id`
- `email`: string, unique (a felhasználónév egyedi)
- `createdAt`
- `updatedAt`

`Playlist`: lejátszási lista
- `id`
- `title`: string *(lejátszási lista címe)*
- `private`: boolean, default false *(nyilvános-e)*
- `UserId`: integer, references `id` on `Users` *(melyik felhasználóé)*
- `createdAt`
- `updatedAt`

`Track`: bejegyzéshez fűzött hozzászólás
- `id`
- `title`: string *(zeneszám címe)*
- `length`: integer *(zeneszám hossza másodpercekben)*
- `author`: string, nullable *(zeneszám szerzője)*
- `genres`: string, nullable *(zeneszám műfajai, egyszerűen szövegként)*
- `album`: string, nullable *(melyik albumba tartozik a szám - csak szövegként)*
- `url`: string *(zeneszámra mutató hivatkozás, pl. Spotify link, stb)*
- `createdAt`
- `updatedAt`

A fenti modellek közötti relációk pedig a következőképpen alakulnak:

- `User` 1-N `Playlist`
- `Playlist` N-N `Track`

*Értelemszerűen az N-N kapcsolat esetében el kell készíteni a kapcsolótáblát.*

### `2. feladat: Seeder (2 pont)`

Hozz létre egy seedert, melynek segítségével feltölthető az adatbázis mintaadatokkal! A seeder minél több esetet fedjen le! A megoldás akkor számít teljes értékűnek, ha a seeder minden lehetséges esethez készít néhány adatot, és a relációkat is figyelembe veszi. A seedert az automata tesztelő nem értékeli, a gyakorlatvezető fogja kézzel javítani.

### `3. feladat: GET /tracks (0.5 pont)`

Lekéri az összes zeneszámot.

- Minta kérés: `GET http://localhost:4000/tracks`
- Válasz megfelelő kérés esetén: `200 OK`
  ```json
  [
    {
        "id": 1,
        "title": "Rerum autem impedit eveniet qui consequuntur",
        "length": 257,
        "author": "Dewey Kuhn",
        "genres": "Electronic",
        "album": "safari",
        "url": "https://szerveroldali-webprog-zenetar.com/12184-rerum-autem-impedit-eveniet-qui-consequuntur",
        "createdAt": "2022-05-11T...",
        "updatedAt": "2022-05-11T..."
    },
    {
        "id": 2,
        "title": "Ut ut sit commodi sint",
        "length": 165,
        "author": "Dr. Jesse Botsford",
        "genres": "Jazz",
        "album": "councilperson",
        "url": "https://szerveroldali-webprog-zenetar.com/11457-ut-ut-sit-commodi-sint",
        "createdAt": "2022-05-11T...",
        "updatedAt": "2022-05-11T..."
    }
    stb.
  ]
  ```

### `4. feladat: GET /tracks/:id (0.5 pont)`

Lekér egy adott zeneszámot.

- Minta kérés: `GET http://localhost:4000/tracks/1`
- Válasz megfelelő kérés esetén: `200 OK`
  ```json
  {
    "id": 1,
    "title": "Rerum autem impedit eveniet qui consequuntur",
    "length": 257,
    "author": "Dewey Kuhn",
    "genres": "Electronic",
    "album": "safari",
    "url": "https://szerveroldali-webprog-zenetar.com/12184-rerum-autem-impedit-eveniet-qui-consequuntur",
    "createdAt": "2022-05-11T...",
    "updatedAt": "2022-05-11T..."
  }
  ```
- Válasz, ha a megadott id-vel nem létezik zeneszám: `404 NOT FOUND`

### `5. feladat: POST /tracks (1 pont)`

Létrehoz egy új zeneszámot.

- Minta kérés: `POST http://localhost:4000/tracks`
  ```json
  {
    "title": "Tuesday",
    "length": 190,
    "author": "Burak Yeter",
    "genres": "deep house",
    "album": "Tuesday",
    "url": "https://szerveroldali-webprog-zenetar.com/12345-Burak-Yeter-Tuesday",
  }
  ```

- Válasz megfelelő kérés esetén: `201 CREATED`
  ```json
  {
    "id": 23,
    "title": "Tuesday",
    "length": 180,
    "author": "Burak Yeter",
    "genres": "deep house",
    "album": "Tuesday",
    "url": "https://szerveroldali-webprog-zenetar.com/12345-Burak-Yeter-Tuesday",
    "createdAt": "2022-05-11T...",
    "updatedAt": "2022-05-11T..."
  }
  ```
- Válasz hibás kérés esetén (hiányzó/hibás adatok, stb): `400 BAD REQUEST`

### `6. feladat: PUT /tracks/:id (1 pont)`

Módosít egy meglévő zeneszámot. Csak azokat a mezőket módosítja, amiket felküldünk, a többit változatlanul hagyja.

- Minta kérés: `PUT http://localhost:4000/tracks/23`
  ```json
  {
    "length": 190,
  }
  ```

- Válasz megfelelő kérés esetén: `200 OK`
  ```json
  {
    "id": 23,
    "title": "Tuesday",
    "length": 190,
    "author": "Burak Yeter",
    "genres": "deep house",
    "album": "Tuesday",
    "url": "https://szerveroldali-webprog-zenetar.com/12345-Burak-Yeter-Tuesday",
    "createdAt": "2022-05-11T...",
    "updatedAt": "2022-05-11T..."
  }
  ```
- Válasz, ha a megadott id-vel nem létezik zeneszám: `404 NOT FOUND`
- Válasz hibás kérés esetén (hiányzó/hibás adatok, stb): `400 BAD REQUEST`

### `7. feladat: DELETE /tracks/:id (1 pont)`

Töröl egy meglévő zeneszámot.

- Minta kérés: `DELETE http://localhost:4000/tracks/23`
- Válasz megfelelő kérés esetén: `200 OK`
- Válasz, ha a megadott id-vel nem létezik zeneszám: `404 NOT FOUND`

### `8. feladat: POST /login (2 pont)`

Hitelesítés. Nincs semmilyen jelszókezelés, csak a felhasználónevet kell felküldeni a request body-ban. Ha a megadott felhasználónévvel létezik fiók az adatbázisban, azt sikeres loginnak vesszük és kiállítjuk a tokent. A user-t bele kell rakni a token payload-jába! A token aláírásához `HS256` algoritmust használj! A titkosító kulcs értéke `"secret"` legyen!

- Minta kérés: `POST http://localhost:4000/login`
  ```json
  {
    "email": "user1@szerveroldali.hu"
  }
  ```

- Válasz megfelelő kérés esetén: `200 OK`
  ```json
  {
    "token": "ey...",
  }
  ```
- Válasz hibás kérés esetén (hiányzó/hibás adatok, stb): `400 BAD REQUEST`
- Válasz nem létező felhasználó esetén: `404 NOT FOUND`

*Tipp: A token ellenőrizhető a https://jwt.io/ oldalon.*

### `9. feladat: GET /my-playlists (1 pont)`

Megadja a bejelentkezett felhasználóhoz tartozó lejátszási listákat. Értelemszerűen **a végpont hitelesített**, hiszen ehhez tudnunk kell, hogy ki a bejelentkezett felhasználó.

- Minta kérés: `GET http://localhost:4000/my-playlists`
  - Hitelesített végpontokra a következő fejléccel kell küldeni a kérést:
    ```
    Authorization: Bearer <token>
    ```
    Firecamp-ben ehhez az Auths fül alatt válaszd a "No Auth" felirattal induló menüből a Bearer-t. Ilyenkor elég csak a tokent megadni, és a fenti fejlécet fogja elküldeni:

    ![Bearer Firecamp](https://i.imgur.com/qduwew7.png)

- Válasz megfelelő kérés esetén: `200 OK`
  ```json
  [
    {
        "id": 2,
        "title": "Playlist1",
        "private": false,
        "UserId": 1,
        "createdAt": "2022-05-11T...",
        "updatedAt": "2022-05-11T..."
    },
    {
        "id": 3,
        "title": "Playlist2",
        "private": true,
        "UserId": 1,
        "createdAt": "2022-05-11T...",
        "updatedAt": "2022-05-11T..."
    }
  ]
  ```
- Válasz hitelesítetlen kérés esetén: `401 UNAUTHORIZED`

`Tipp #1`: A `server.js`-ben van egy hibakezelő middleware, ami fixen `500 INTERNAL SERVER ERROR`-t küld, amennyiben elkap egy hibát. Annak érdekében, hogy a hiba ne jusson el odáig, és megfelelő választ tudj adni, a route-jaid után Te magad is fel tudsz venni egy vertikális middleware-t, ahol kezeled a hibákat:

```js
router.use(async (err, req, res, next) => {
    // Ha a hiba illeszkedik valamilyen feltételre, akkor visszatérsz egy válasszal és megszakítod a folyamatot, 
    // ez esetben itt a szerver ad a kliensnek egy választ és már nem hívja meg a következő middleware-t
    if (err instanceof /* ... */) {
        return res.sendStatus(/* ... */);
    }
    // Ha valamilyen más jellegű hiba történt, ami az előző feltételekre nem illeszkedett, akkor a next()-el meghívod 
    // a sorban következő middleware-t, ami már valószínűleg a server.js-ben lesz. Ez fontos, különben a kliens nem kapna választ
    next(err, req, res);
});
```

A fent látható módon tehát tudod kezelni az `UnauthorizedError`-t, vagy a `ValidationError`/`DatabaseError`-t is, és nem kell try-catch blokkokat csinálni minden feldolgozó fv-edhez.

`Tipp #2`: Az auth middleware a token payload-ját berakja a `req.user`-be. Emlékezz vissza, hogy a payload-ba pedig az előző feladatban beraktad a user adatait.

### `10. feladat: POST /my-playlists (1 pont)`

Új lejátszási lista létrehozása a bejelentkezett felhasználóhoz. **A végpont hitelesített**.

- Minta kérés: `POST http://localhost:4000/my-playlists`
  ```json
  {
    "title": "Playlist3",
    "private": false
  }
  ```
- Válasz megfelelő kérés esetén: `201 CREATED`
  ```json
  {
    "id": 4,
    "title": "Playlist3",
    "private": false,
    "UserId": 1,
    "createdAt": "2022-05-11T...",
    "updatedAt": "2022-05-11T..."
  }
  ```
- Válasz hitelesítetlen kérés esetén: `401 UNAUTHORIZED`
- Válasz hibás kérés esetén (hiányzó/hibás adatok, stb): `400 BAD REQUEST`

### `11. feladat: POST /my-playlists/:id/add-tracks (6 pont)`

Zeneszám(ok) hozzárendelése a bejelentkezett felhasználó megadott lejátszási listájához (adatbázis szintű reláció megteremtése két egyébként már létező entitás esetén). **A végpont hitelesített**.

- Minta kérés: `POST /my-playlists/4/add-tracks`
  - A request body-ban felküldjük a hozzárendelni kívánt track-et id-jeit:
    ```json
    {
      "tracks": [1, 2, 3, "asd", 9999, 4]
    }
    ```
- Válasz megfelelő kérés esetén: `200 OK`
  - A kapott válasz a következőképpen épül fel:
    ```js
    {
      invalidTracks: [
        // Azok a kérésben megadott track ID-k, amelyekkel nem létezik track az adatbázisban, tehát eleve nem lehet velük mit kezdeni
      ],
      alreadyAdded: [
        // Azok a kérésben megadott track ID-k, amelyek már eleve hozzá voltak rendelve a playlist-hez, tehát nem szükséges őket hozzáadni
      ],
      addedTracks: [
        // Azok a kérésben megadott track ID-k, amelyek hozzá lettek rendelve a playlist-hez
      ],
      playlist: {
        // A playlist alapadatai, id, stb
        id: // ...,
        tracks: [
          // A playlist-hez aktuálisan tartozó track-ek, a pivot tábla adatait vedd ki (ehhez segítség: options.joinTableAttributes)
        ]
      }
    }
    ```
  - Minta válasz:
    ```json
    {
      "invalidTracks": [
        "asd",
        9999
      ],
      "alreadyAdded": [
        1
      ],
      "addedTracks": [
        2,
        3,
        4
      ],
      "playlist": {
        "id": 4,
        "title": "Playlist3",
        "private": false,
        "UserId": 1,
        "createdAt": "2022-05-11T...",
        "updatedAt": "2022-05-11T...",
        "tracks": [
          {
            "id": 1,
            "title": "Rerum autem impedit eveniet qui consequuntur",
            "length": 257,
            "author": "Dewey Kuhn",
            "genres": "Electronic",
            "album": "safari",
            "url": "https://szerveroldali-webprog-zenetar.com/12184-rerum-autem-impedit-eveniet-qui-consequuntur",
            "createdAt": "2022-05-11T...",
            "updatedAt": "2022-05-11T..."
          },
          {
            stb.
          }
          stb.
        ]
      }
    }
    ```
- Válasz hitelesítetlen kérés esetén: `401 UNAUTHORIZED`
- Válasz, ha a megadott id-vel nem létezik playlist: `404 NOT FOUND`
- Válasz illetéktelen módosítás esetén (a playlist létezik, de nem a bejelentkezett userhez tartozik): `403 FORBIDDEN`

### `12. feladat: POST /my-playlists/:id/remove-tracks (6 pont)`

Zeneszám(ok) eltávolítása a bejelentkezett felhasználó megadott lejátszási listájáról (adatbázis szintű reláció megszüntetése). **A végpont hitelesített**.

- Minta kérés: `POST /my-playlists/4/remove-tracks`
  - A request body-ban felküldjük az eltávolítani kívánt track-et id-jeit:
    ```json
    {
      "tracks": [1, "asd", 9999, 4, 15]
    }
    ```
- Válasz megfelelő kérés esetén: `200 OK`
  - A kapott válasz a következőképpen épül fel:
    ```js
    {
      invalidTracks: [
        // Azok a kérésben megadott track ID-k, amelyekkel nem létezik track az adatbázisban, tehát eleve nem lehet velük mit kezdeni
      ],
      skippedTracks: [
        // Azok a kérésben megadott track ID-k, amelyek eleve hozzá se voltak rendelve a playlist-hez, tehát nem szükséges őket eltávolítani
      ],
      removedTracks: [
        // Azok a kérésben megadott track ID-k, amelyek el lettek távolítva a playlist-ről
      ],
      playlist: {
        // A playlist alapadatai, id, stb
        id: // ...,
        tracks: [
          // A playlist-hez aktuálisan tartozó track-ek, a pivot tábla adatait vedd ki (ehhez segítség: options.joinTableAttributes)
        ]
      }
    }
    ```
  - Minta válasz:
    ```json
    {
      "invalidTracks": [
        "asd",
        9999
      ],
      "skippedTracks": [
        15
      ],
      "removedTracks": [
        1,
        4
      ],
      "playlist": {
        "id": 4,
        "title": "Playlist3",
        "private": false,
        "UserId": 1,
        "createdAt": "2022-05-11T...",
        "updatedAt": "2022-05-11T...",
        "tracks": [
          {
          "id": 1,
          "title": "Rerum autem impedit eveniet qui consequuntur",
          "length": 257,
          "author": "Dewey Kuhn",
          "genres": "Electronic",
          "album": "safari",
          "url": "https://szerveroldali-webprog-zenetar.com/12184-rerum-autem-impedit-eveniet-qui-consequuntur",
          "createdAt": "2022-05-11T...",
          "updatedAt": "2022-05-11T..."
          },
          {
            stb.
          }
          stb.
        ]
      }
    }
    ```

- Válasz hitelesítetlen kérés esetén: `401 UNAUTHORIZED`
- Válasz, ha a megadott id-vel nem létezik playlist: `404 NOT FOUND`
- Válasz illetéktelen módosítás esetén (a playlist létezik, de nem a bejelentkezett userhez tartozik): `403 FORBIDDEN`

### `13. feladat: GET /playlists/:id/tracks (6 pont)`

Lekéri a megadott playlist-hez tartozó track-eket. **A végpont "opcionálisan" hitelesített**, hiszen ha nyilvános lejátszási listát kérünk le (emlékeztető: `private` adattag), akkor azt bárkinek (egy vendégnek is) megjeleníthetjük, de ha a lejátszási lista privát, akkor ellenőriznünk kell, hogy a tulajdonosa küldte-e a kérést, hiszen ő megnézheti, de egy vendég/más felhasználók nem.

Az "opcionális" hitlesítésre használhatod ezeket a middleware-ket:
```js
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

// ...

const jwtAuthMiddleware = expressJwt({ secret: process.env.JWT_SECRET, algorithms: [process.env.JWT_ALGO] });
const optionalJwtAuthMiddleware = (req, res, next) => jwtAuthMiddleware(req, res, (err) => next());
```

A `jwtAuthMiddleware` egy `UnauthorizedError` error-t dob, ha nem sikerült a hitelesítés (vagyis a feldolgozó fv-ed sose fog lefutni, mert már az előtte lévő middleware-ben hiba keletkezik) - ez a gyakorlatokon vett módszer. Az `optionalJwtAuthMiddleware` azonban továbbengedi a hitelesítetlen kérést is, csak abban az esetben nem lesz `req.user` property (amit ugye a két fv által használt Express-JWT rak be a header-ből visszafejtett adatok alapján a request objektumba). A `JWT_SECRET` és a `JWT_ALGO` a kezdőcsomag `.env` fájljában van definiálva.

- Minta kérés: `GET /playlists/:id/tracks`
  - A kérés opcionálisan fogadjon egy `shuffle` nevű query parameter-t, ami annyit csinál, hogyha meg van adva (nem kell, hogy legyen értéke), akkor nem ID szerint rendezetten, hanem random sorrendben adja vissza a track-eket a válaszban.
  - Minta kérés a `shuffle` query parameterrel: `GET /playlists/:id/tracks?shuffle`
- Válasz megfelelő kérés esetén: `200 OK`
  - A track-ekhez ne jelenjen meg se a `createdAt`, se az `updatedAt` mező
  - Legyen egy `lengthFormatted` nevű mező, ami átkonvertálja a `length`-et (ami másodpercekben adja meg a track hosszát) `ÓÓ:PP:MM` formátumba. **Ennek nagyon sok jó megközelítése lehet**, pl. SQLite fv, natív JS. Légy kreatív, de ne gondolkodj rajta sokat :)
  - A `length` mező megjelenítése opcionális, a minta válaszban az is ki van véve.
  - Minta válasz:
    ```json
    [
      {
        "id": 2,
        "title": "Ut ut sit commodi sint",
        "author": "Dr. Jesse Botsford",
        "genres": "Jazz",
        "album": "councilperson",
        "url": "https://szerveroldali-webprog-zenetar.com/11457-ut-ut-sit-commodi-sint",
        "lengthFormatted": "00:02:45"
      },
      {
        "id": 3,
        "title": "Reiciendis ex eveniet",
        "author": "Stephanie Hickle",
        "genres": "Soul",
        "album": "tusk",
        "url": "https://szerveroldali-webprog-zenetar.com/13256-reiciendis-ex-eveniet",
        "lengthFormatted": "00:05:23"
      }
    ]
    ```
- Válasz, ha a megadott id-vel nem létezik playlist: `404 NOT FOUND`
- Válasz illetéktelen kérés esetén (a lejátszási lista privát, és nem állapítható meg, hogy a kérést intéző személy a tulajdonosa): `403 FORBIDDEN`
