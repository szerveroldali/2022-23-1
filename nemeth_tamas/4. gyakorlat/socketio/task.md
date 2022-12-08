## 3. feladat: Websocket - Egyszámjáték (10 pont)

Socket.io segítségével készíts Websocket szervert, amelyen keresztül a kapcsolódó klienseknek lehetőségük van egyszámjátékot játékot játszani! Ennek során a szerver időről időre indít egy új játékot. Minden játékban minden egyes kliensnek lehetősége van egy szám tippelésére. Az adott játékban az nyer, akinek a tippje a legkisebb olyan szám, amire mások nem szavaztak. Minden játékban egy adott ideig van nyitva, eddig lehet gyűjteni a tippeket, majd az idő lejártával a szerver mindenkit értesít, hogy győzött-e vagy vesztett, majd egy új játékot nyit. Ez egy szerveroldali folyamat, a klienseknek erre nincsen ráhatása. Szerveren használjuk a `setTimeout`-ot az időzítéshez! Minden kliens csak egyszer tippelhet egy adott játékban. A klienseket a socket azonosítójukkal azonosítjuk. A játékokat a szerver memóriájában tároljuk, nem kell adatbázis! Például az alábbi adatszerkezet használható, ahol a játékokat egy tömbben tároljuk, mindig az utolsó az aktív, és minden játéknál tároljuk, hogy melyik kliens milyen számra tippelt.

```js
games = [
    {
        startTime: 123456789,
        tips: [
            { client: 'socketid1', number: 12 },
            { client: 'socketid2', number: 1 },
            { client: 'socketid3', number: 1 },
            { client: 'socketid4', number: 2 },
            { client: 'socketid5', number: 12 },
        ],
    },
];
```

A következő üzenetek legyenek:

-   Kliens -> szerver
    -   `tip`: Tippelés, értéke a tippelt szám. Hiba akkor van, ha már tippeltünk az adott játékban, vagy ha nem számot küldtünk fel. **(4 pont)**
        -   Paraméterek: tippelt szám
        -   Válasz
            -   Helyes: `{ status: 'ok' }`
            -   Hibás: `{ status: 'error', message: <hibaüzenet> }`
-   Szerver -> kliens
    -   `new-game-started`: Ha új játék kezdődik, akkor kapunk ilyen üzenetet. Adata nincs. **(1 pont)**
    -   `game-over`: A játék végén generálódik automatikusan. Minden tippelő kliensnek elküldi, hogy nyert-e vagy sem. Elküldi az adott kliens által tippelt és a győztes számot is. **(5 pont)**
        ```js
        {
          won: false,
          tipped: 12,
          winner: 2
        }
        ```
