# Szerveroldali webprogramozás - GraphQL pót/javító zárthelyi

_2023. január 11. 15:30-18:30_

Tartalom:

- [Szerveroldali webprogramozás - GraphQL pót/javító zárthelyi](#szerveroldali-webprogramozás---graphql-pótjavító-zárthelyi)
  - [Tudnivalók](#tudnivalók)
  - [Hasznos hivatkozások](#hasznos-hivatkozások)
  - [Kezdőcsomag segédlet](#kezdőcsomag-segédlet)
  - [Feladatok](#feladatok)
    - [0. feladat: Modellek, kapcsolatok, seeder, séma](#0-feladat-modellek-kapcsolatok-seeder-séma)
    - [1. feladat: `Query.convert` (1 pont)](#1-feladat-queryconvert-1-pont)
    - [2. feladat: `Query.multiconvert` (2 pont)](#2-feladat-querymulticonvert-2-pont)
    - [3. feladat: `Query.clients` és `Query.accounts` (1 pont)](#3-feladat-queryclients-és-queryaccounts-1-pont)
    - [4. feladat: `Query.client` és `Query.account` (2 pont)](#4-feladat-queryclient-és-queryaccount-2-pont)
    - [5. feladat: `Client.accounts` és `Account.owner` (2 pont)](#5-feladat-clientaccounts-és-accountowner-2-pont)
    - [6. feladat: `Account.transactions` (2 pont)](#6-feladat-accounttransactions-2-pont)
    - [7. feladat: `Mutation.createTransaction` (2 pont)](#7-feladat-mutationcreatetransaction-2-pont)
    - [8. feladat: `Mutation.transferAccount` (2 pont)](#8-feladat-mutationtransferaccount-2-pont)
    - [9. feladat: `Account.balance` (2 pont)](#9-feladat-accountbalance-2-pont)
    - [10. feladat: `Query.richestClient` (4 pont)](#10-feladat-queryrichestclient-4-pont)
    - [11. feladat: `Mutation.refreshActivity` (4 pont)](#11-feladat-mutationrefreshactivity-4-pont)
    - [12. feladat: `Query.statistics` (6 pont)](#12-feladat-querystatistics-6-pont)

## Tudnivalók

<details>
<summary>Tudnivalók megjelenítése</summary>

- A zárthelyi megoldására **180 perc** áll rendelkezésre, amely a kidolgozás mellett **magába foglalja** a kötelező nyilatkozat értelmezésére és kitöltésére, a feladatok elolvasására, az anyagok letöltésére, összecsomagolására és feltöltésére szánt időt is.
- **A zárthelyi idejében a tárgy _Teams_ csoportjának _Általános/General_ csatornáján írásos formában rendelkezésre állunk. Érdemes a csatorna üzeneteit figyelemmel kísérni az időközben érkező információk vagy esetleges kérdések miatt.**
- A kidolgozást a Canvas rendszeren keresztül kell beadni egyetlen **.zip** állományként. **A rendszer pontban 18:30-kor lezár, ezután nincs lehetőség beadásra!**
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
  - [GraphQL dokumentáció](https://graphql.org/learn/)
  - [GraphQL skalárok (kezdőcsomag tartalmazza)](https://www.graphql-scalars.dev/docs)
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

Készíts _Node.js_ környezetben, _JavaScript_ nyelv használatával egy **GraphQL API**-t az alábbi pontoknak megfelelően! A tantárgy gyakorlati tematikájához illeszkedve adatbázisként _SQLite3_, ORM-ként _Sequelize_, kiszolgálóként pedig _Fastify_ keretrendszer és _Mercurius_ használata kötelező. (A zárthelyihez kiadott [kezdőcsomagban](https://github.com/szerveroldali/zh_kezdocsomag) ezen csomagok már inicializálva vannak.)

### 0. feladat: Modellek, kapcsolatok, seeder, séma

**Ezen a zárthelyin a modelleket, kapcsolatokat és seedert is TELJESEN készen adjuk, továbbá a sémában az ezekhez kapcsolódó alapvető definiciók is adottak.**

Az érdemi feladatok elkezdéséhez tehát mindössze be kell másolni a kezdéskor megosztott fájlokat az előre ismert kezdőcsomagba, majd futtatni a seedelést (`npm run db`) és elindítani a szervert (`npm run dev`)!

**A sémát a feladatok megoldásának részeként ki kell egészíteni az egyes rezolverek megírásával párhuzamosan.**

A kiadott csomag a következő modelleket tartalmazza:

- `Client` - ügyfél
  - `id`
  - `name` - string, az ügyfél teljes neve
  - `birthdate` - date, a ügyfél születési dátuma
  - `birthplace` - string, a ügyfél születési helye
  - `active` - boolean, van-e aktív számlája az ügyfélnek
  - `createdAt`
  - `updatedAt`
- `Account` - számla
  - `id`
  - `iban` - string, a számla IBAN száma (nemzetközi bankszámlaszáma)
  - `ClientId` - integer, a számla tulajdonosának azonosítója
  - `createdAt`
  - `updatedAt`
- `Transaction` - tranzakció
  - `id`
  - `AccountIdFrom` - integer, nullable; azon számla azonosítója, amelyről a tranzakció indult
  - `AccountIdTo` - integer, nullable; azon számla azonosítója, amelyre a tranzakció érkezett
  - `amount` - integer, a tranzakció értéke forintban
  - `createdAt`
  - `updatedAt`

A fenti modellek közötti asszociációk (kapcsolatok):

- `Client` 1 : N `Account`
- `Account` 1 : N `Transaction` - mező: `AccountIdFrom`
- `Account` 1 : N `Transaction` - mező: `AccountIdTo`

_Természetesen 1:N kapcsolatot egy felvett mezővel, N:N kapcsolatot pedig külön kapcsolótábla létrehozásával tárolunk._

### 1. feladat: `Query.convert` (1 pont)

A fenti modellek alapján megállapítható, hogy ebben a zárthelyiben ügyfelekkel, számlákkal és azok közötti pénzügyi tranzakciókkal fogunk dolgozni.

A tranzakciók összegét ugyan forintban szeretnénk tárolni, de a valóság mindig bonyolultabb, mint a hirtelen felírt adatmodellek. Szükségünk lesz valahogyan kezelni azt, ha a tranzakciók nem forintban történnek.

Írj egy lekérést, amely a devizában adott összeget (`originalAmount`) átkonvertálja az `originalCurrency` pénznemből `targetCurrency` pénznembe! Figyelem: nem garantált, hogy a két pénznem bármelyike HUF lesz! Ha bármely pénznemhez nincs ismert árfolyam, akkor az eredmény legyen `null`!

Ehhez a következő árfolyamokat ismerjük, be lehet égetni a programba az egyszerűség kedvéért:
- 1 EUR = 394.28 HUF
- 1 USD = 369.46 HUF
- 1 GBP = 447.82 HUF
- 1 CHF = 398.55 HUF
- 1 JPY = 2.81 HUF

Kérés:

```graphql
query {
  convert (originalAmount: 721.93, originalCurrency: "USD", targetCurrency: "GBP")
}
```

Mintaválasz:

```json
{
  "data": {
    "convert": 595.6059528381938
  }
}
```

### 2. feladat: `Query.multiconvert` (2 pont)

Készítsünk most egy olyan lekérdezést, amely a megadott összeget egy adott pénznemből minden ismert pénznembe átszámítja, és ebből tetszőlegeseket kérdezhetünk le!

Kérés:

```graphql
query {
  multiconvert (originalAmount: 721.93, originalCurrency: "USD") {
    HUF, EUR, USD, GBP, CHF, JPY
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "multiconvert": {
      "HUF": 266724.25779999996,
      "EUR": 676.4843710053768,
      "USD": 721.93,
      "GBP": 595.6059528381938,
      "CHF": 669.2366272738676,
      "JPY": 94919.66469750888
    }
  }
}
```

### 3. feladat: `Query.clients` és `Query.accounts` (1 pont) 

Minden ügyfél és számla adatmezőinek lekérése.

Kérés:

```graphql
query {
  clients {
    id
    name
    birthdate
    birthplace
    active
    createdAt
    updatedAt
  }
  accounts {
    id
    iban
    ClientId
    createdAt
    updatedAt
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "clients": [
      {
        "id": "1",
        "name": "Kathleen Kerluke PhD",
        "birthdate": "1962-01-29",
        "birthplace": "Temple",
        "active": true,
        "createdAt": "2023-01-11T...",
        "updatedAt": "2023-01-11T..."
      },
      stb.
    ],
    "accounts": [
      {
        "id": "1",
        "iban": "HU62 0420 3391 6006 0031 1007 0084",
        "ClientId": "3",
        "createdAt": "2023-01-11T...",
        "updatedAt": "2023-01-11T..."
      },
      stb.
    ]
  }
}
```

### 4. feladat: `Query.client` és `Query.account` (2 pont)

Egy megadott azonosítójú ügyfél és számla alapmezőinek lekérése. Ha nem létezik ilyen, akkor kapjunk `null` értéket!

Kérés:

```graphql
query {
  client(id: 1) {
    id
    name
    birthdate
    birthplace
    active
    createdAt
    updatedAt
  }
  account(id: 1) {
    id
    iban
    ClientId
    createdAt
    updatedAt
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "client": {
      "id": "1",
      "name": "Kathleen Kerluke PhD",
      "birthdate": "1962-01-29",
      "birthplace": "Temple",
      "active": true,
      "createdAt": "2023-01-11T...",
      "updatedAt": "2023-01-11T..."
    },
    "account": {
      "id": "1",
      "iban": "HU62 0420 3391 6006 0031 1007 0084",
      "ClientId": "3",
      "createdAt": "2023-01-11T...",
      "updatedAt": "2023-01-11T..."
    }
  }
}
```

### 5. feladat: `Client.accounts` és `Account.owner` (2 pont)

Legyen lehetőség az ügyfél felől indulva lekérdezni azokat a számlákat, amelynek ő a tulajdonosa; illetve a számlák felől indulva a tulajdonos adatait is!

Kérés:

```graphql
query {
  client(id: 3) {
    id
    name
    accounts {
      id
      iban
    }
  }
  account(id: 3){
    id
    iban
    owner {
      id
      name
    }
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "client": {
      "id": "3",
      "name": "Rolando Weimann",
      "accounts": [
        {
          "id": "4",
          "iban": "HU98 5017 2566 0893 3056 0880 1089"
        },
        stb.
      ]
    },
    "account": {
      "id": "3",
      "iban": "HU05 2005 8085 2637 5507 8064 1009",
      "owner": {
        "id": "12",
        "name": "Jean Bauch"
      }
    }
  }
}
```

### 6. feladat: `Account.transactions` (2 pont)

Legyen lehetőség egy számla felől indulva lekérni azokat a tranzakciókat, amelyek a számlát akármilyen módon érintették! Ez azt jelenti, hogy a számláról kimenő és a számlára beérkező forgalmat is vissza kell adni, a tranzakció létrehozási dátuma szerint csökkenő időrendben! (Előfordulhat, hogy a tranzakcióban résztvevő másik számla azonosítója `null`, ezek pénztári ki- vagy befizetéseket jelentenek, de az eredmény előállításának módját nem befolyásolják.)

_(Technikai segítség: ha elakadtál, hogy milyen módon lehetne elérni a számlához tartozó kétféle tranzakciót vagy egy tranzakción belül a kétféle számlát, érdemes megnézni az `Account` és a `Transaction` modellekhez tartozó fájlokat.)_

Kérés:

```graphql
query {
  account(id: 3){
    transactions {
      id
      AccountIdFrom
      AccountIdTo
      amount
      createdAt
    }
  }
}
```

Mintaválasz: 
```json
{
  "data": {
    "account": {
      "transactions": [
        {
          "id": "78",
          "AccountIdFrom": "9",
          "AccountIdTo": "1",
          "amount": 726934,
          "createdAt": "2023-01-06T15:25:00.785Z"
        },
        {
          "id": "76",
          "AccountIdFrom": "1",
          "AccountIdTo": null,
          "amount": 694344,
          "createdAt": "2022-12-20T09:12:06.478Z"
        },
        stb.
      ]
    }
  }
}
```

### 7. feladat: `Mutation.createTransaction` (2 pont)

Új tranzakció létrehozása a megadott adatokkal. Siker esetén visszaadja a létrejött tranzakciót, különben `null` értéket kap.

A bemenő adatoknak adj meg a sémában egy `CreateTransactionInput` definiciót, amely a modellben tárolt mezőket várja az automatikusan kitöltődő `id`, `createdAt` és `updatedAt` kivételével! Figyelem: a számlaazonosítók vehetnek fel `null` értéket is pénztári tranzakcióknál!

Kérés:

```graphql
mutation {
  createTransaction (input: {
    AccountIdFrom: 6
    AccountIdTo: null
    amount: 450000
  }) {
    id
    AccountIdFrom
    AccountIdTo
    amount
    createdAt
    updatedAt
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "createTransaction": {
      "id": "86",
      "AccountIdFrom": "6",
      "AccountIdTo": null,
      "amount": 450000,
      "createdAt": "2023-01-11T...",
      "updatedAt": "2023-01-11T..."
    }
  }
}
```

### 8. feladat: `Mutation.transferAccount` (2 pont)

Módosítja a megadott azonosítójú számla tulajdonosát a megadott azonosítójú ügyfélre. Amennyiben bármelyik azonosítóval nem létezik entitás, az eredmény `null`. Siker esetén visszaadja a módosított számla adatait.

Kérés:

```graphql
mutation {
  transferAccount (AccountId: 9, ClientId: 12) {
    id
    iban
    ClientId
    createdAt
    updatedAt
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "transferAccount": {
      "id": "9",
      "iban": "HU66 8213 2893 0609 2060 5004 0134",
      "ClientId": "12",
      "createdAt": "2023-01-11T...",
      "updatedAt": "2023-01-11T..."
    }
  }
}
```

### 9. feladat: `Account.balance` (2 pont)

Bővítsük a számláról ismert adatokat az aktuális egyenleggel! Mivel egy korábbi feladatból már ismerjük a számlát bármely irányban érintő forgalmat, nincs más dolgunk, mint összegezni, hogy összesen mennyi pénz ment ki (from) és érkezett be (to) erre a számlára! A számlák kezdőegyenlege 0 HUF, a tranzakciók értékét egész forintban tároljuk.

Kérés:

```graphql
query {
  accounts {
    id
    balance
  }
}
```

Mintaválasz: 

```json
{
  "data": {
    "accounts": [
      {
        "id": "1",
        "balance": 3745299
      },
      {
        "id": "2",
        "balance": -12177
      },
      stb.
    ]
  }
}
```

### 10. feladat: `Query.richestClient` (4 pont)

Adjuk meg azt az ügyfelet, akinek az összes saját számlájának összegyenlege a legnagyobb! Holtverseny esetén válasszuk a kisebb azonosítójú ügyfelet!

Kérés: 

```graphql
query {
  richestClient {
    id
    name
    birthdate
    birthplace
    accounts {
      id
      balance
    }
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "richestClient": {
      "id": "5",
      "name": "Suzanne Feest",
      "birthdate": "1978-03-01",
      "birthplace": "Cuyahoga Falls",
      "accounts": [
        {
          "id": "7",
          "iban": "HU75 0052 4856 0537 5100 9018 0089",
          "balance": 8635912
        },
        stb.
      ]
    }
  }
}
```

### 11. feladat: `Mutation.refreshActivity` (4 pont)

Elvileg az ügyfelekhez tartozó `active` mező azt jelzi, hogy van-e az ügyfélnek aktív számlája. Most kaptuk a hírt azonban, hogy a mező értéke néha pontatlan. Frissítsük a mezőt, vagyis menjünk végig mindig ügyfélen, és állítsuk az `active` mezőt igazra, ha van az ügyfélnek számlája; illetve hamisra, amennyiben nincs!

Az eredményben adjuk vissza azon (és csak azon) ügyfeleket (módosítás után), akiknek az `active` mezőjét meg kellett változtatni!

Kérés:
```graphql
mutation {
  refreshActivity {
    id
    active
    accounts {
      id
      iban
    }
    createdAt
    updatedAt
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "refreshActivity": [
      {
        "id": "3",
        "active": true,
        "accounts": [
          {
            "id": "13",
            "iban": "HU42 2490 0249 7070 0176 5047 5786"
          }
        ],
        "createdAt": "2023-01-11T...",
        "updatedAt": "2023-01-11T..."
      },
      {
        "id": "4",
        "active": false,
        "accounts": [],
        "createdAt": "2023-01-11T...",
        "updatedAt": "2023-01-11T..."
      },
      stb.
    ]
  }
}
```

### 12. feladat: `Query.statistics` (6 pont)

Statisztika készítése, amely a következő mezőket tartalmazza:
- `activeClients`: az aktív (`active` mező igaz) ügyfelek száma
- `biggestAmount`: a legnagyobb tranzakció értéke
- `bigTransactions`: azon tranzakciók darabszáma, amelyek értéke meghaladja a 100000 Ft-ot
- `oldTransactions`: a 365 napnál régebben létrehozott tranzakciók száma
- `updatedAccounts`: az olyan számlák száma, amelyeket létrehozás után módosítottak
- `accountsPerClient`: egy ügyfélhez tartozó számlák átlagos mennyisége

Kérés: 

```graphql
query {
  statistics {
    activeClients
    biggestAmount
    bigTransactions
    oldTransactions
    updatedAccounts
    accountsPerClient
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "statistics": {
      "activeClients": 14,
      "biggestAmount": 1930200,
      "bigTransactions": 52,
      "oldTransactions": 9,
      "updatedAccounts": 2,
      "accountsPerClient": 1.3888888888888888
    }
  }
}
```