# Szerveroldali webprogramozás - GraphQL zárthelyi

_2022. december 21. 16:00-19:00_

Tartalom:

- [Szerveroldali webprogramozás - GraphQL zárthelyi](#szerveroldali-webprogramozás---graphql-zárthelyi)
  - [Tudnivalók](#tudnivalók)
  - [Hasznos hivatkozások](#hasznos-hivatkozások)
  - [Kezdőcsomag segédlet](#kezdőcsomag-segédlet)
  - [Feladatok](#feladatok)
    - [0. feladat: Modellek, kapcsolatok, seeder, séma](#0-feladat-modellek-kapcsolatok-seeder-séma)
    - [1. feladat: `Query.grade` (1 pont)](#1-feladat-querygrade-1-pont)
    - [2. feladat: `Query.grades` (1 pont)](#2-feladat-querygrades-1-pont)
    - [3. feladat: `Query.gradesFrom` (1 pont)](#3-feladat-querygradesfrom-1-pont)
    - [4. feladat: `Query.students` és `Query.exams` (1 pont)](#4-feladat-querystudents-és-queryexams-1-pont)
    - [5. feladat: `Query.exam` (2 pont)](#5-feladat-queryexam-2-pont)
    - [6. feladat: `Query.studentByNeptun` (2 pont)](#6-feladat-querystudentbyneptun-2-pont)
    - [7. feladat: `Student.exams` és `Exam.tasks` (2 pont)](#7-feladat-studentexams-és-examtasks-2-pont)
    - [8. feladat: `Mutation.createStudent` (2 pont)](#8-feladat-mutationcreatestudent-2-pont)
    - [9. feladat: `Exam.studentCount` (2 pont)](#9-feladat-examstudentcount-2-pont)
    - [10. feladat: `Exam.maxScore` és `Exam.perfectScore` (2 pont)](#10-feladat-exammaxscore-és-examperfectscore-2-pont)
    - [11. feladat: `Query.closestExam` (2 pont)](#11-feladat-queryclosestexam-2-pont)
    - [12. feladat: `Mutation.registerStudents` (4 pont)](#12-feladat-mutationregisterstudents-4-pont)
    - [13. feladat: `Query.mostBusyStudent` (4 pont)](#13-feladat-querymostbusystudent-4-pont)
    - [14. feladat: `Mutation.removePassiveStudents` (4 pont)](#14-feladat-mutationremovepassivestudents-4-pont)

## Tudnivalók

<details>
<summary>Tudnivalók megjelenítése</summary>

- A zárthelyi megoldására **180 perc** áll rendelkezésre, amely a kidolgozás mellett **magába foglalja** a kötelező nyilatkozat értelmezésére és kitöltésére, a feladatok elolvasására, az anyagok letöltésére, összecsomagolására és feltöltésére szánt időt is.
- **A zárthelyi idejében a tárgy _Teams_ csoportjának _Általános/General_ csatornáján egy értekezletet indítunk, amelybe ajánlott becsatlakozni az időközben érkező információk vagy esetleges kérdések miatt.**
- A kidolgozást a Canvas rendszeren keresztül kell beadni egyetlen **.zip** állományként. **A rendszer pontban 19:00-kor lezár, ezután nincs lehetőség beadásra!**
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

- `Student` - hallgató
  - `id`
  - `neptun` - string, a hallgató Neptun-kódja
  - `name` - string, a hallgató teljes neve
  - `birthdate` - date, a hallgató születési dátuma
  - `birthplace` - string, a hallgató születési helye
  - `semester` - integer, a hallgató aktív féléveinek száma
  - `active` - boolean, aktív féléve van-e a hallgatónak
  - `createdAt`
  - `updatedAt`
- `Exam` - vizsgaalkalom
  - `id`
  - `startTime` - date, a vizsga kezdetének időpontja
  - `endTime` - date, a vizsga végének időpontja
  - `location` - string, a vizsga helyszíne
  - `maxStudents` - integer, a vizsgára maximálisan feljelentkező hallgatók száma
  - `createdAt`
  - `updatedAt`
- `Task` - vizsgafeladat
  - `id`
  - `title` - string, a feladat címe
  - `text` - string, a feladat szövege
  - `points`˙ - float, a feladat pontértéke
  - `extra` - boolean; ha igaz, akkor a feladat nem számít bele a maximális pontszámba, hanem pluszpontot ér
  - `createdAt`
  - `updatedAt`

A fenti modellek közötti asszociációk (kapcsolatok):

- `Exam` 1 : N `Task`
- `Exam` N : N `Student`

_Természetesen 1:N kapcsolatot egy felvett mezővel, N:N kapcsolatot pedig külön kapcsolótábla létrehozásával tárolunk._

### 1. feladat: `Query.grade` (1 pont)

Bemelegítésként és a témára való ráhangolódásként kezdjünk néhány egyszerű feladattal, amelyekhez még nem szükséges a modelleket használni!

Bővítsd a `Query` típust egy `grade` mezővel, amely egy véletlenszerű 1 és 5 közötti egész számot (érdemjegyet) ad!

Kérés:

```graphql
query {
  grade
}
```

Mintaválasz:

```json
{
  "data": {
    "grade": 5
  }
}
```

### 2. feladat: `Query.grades` (1 pont)

Nagyszerű! Ebben feladatban most egy olyan tömböt állíts elő, amely a paraméterként megadott értékkel megegyező számú érdemjegyet tartalmaz!

Kérés:

```graphql
query {
  grades(count: 7)
}
```

Mintaválasz:

```json
{
  "data": {
    "grades": [5, 3, 4, 5, 5, 1, 5]
  }
}
```

### 3. feladat: `Query.gradesFrom` (1 pont)

Ebben a feladatban a paraméter most egy százalékos teljesítményeket tartalmazó lebegőpontos (float) tömb legyen! Ezek alapján állítsuk elő azt a tömböt, amely a százalékoknak megfelelő (tehát már nem véletlenszerű) érdemjegyeket tartalmazza az eredeti sorrendben!

Az érdemjegyek határai:

- 1, ha százalék < 40
- 2, ha 40 <= százalék < 55
- 3, ha 55 <= százalék < 70
- 4, ha 70 <= százalék < 85
- 5, ha százelék >= 85

Kérés:

```graphql
query {
  gradesFrom(percentages: [100, 54.99, 55, 39])
}
```

Mintaválasz:

```json
{
  "data": {
    "gradesFrom": [5, 2, 3, 1]
  }
}
```

### 4. feladat: `Query.students` és `Query.exams` (1 pont)

Minden hallgató és vizsga adatmezőinek lekérése.

Kérés:

```graphql
query {
  students {
    id
    neptun
    name
    birthdate
    birthplace
    semester
    active
    createdAt
    updatedAt
  }
  exams {
    id
    startTime
    endTime
    location
    maxStudents
    createdAt
    updatedAt
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "students": [
      {
        "id": "1",
        "neptun": "6AF0CG",
        "name": "John Deckow",
        "birthdate": "1971-10-22",
        "birthplace": "The Villages",
        "semester": 5,
        "active": false,
        "createdAt": "2022-12-21T...",
        "updatedAt": "2022-12-21T..."
      },
      stb.
    ],
    "exams": [
      {
        "id": "1",
        "startTime": "2022-12-22T11:45:00.000Z",
        "endTime": "2022-12-22T12:45:00.000Z",
        "location": "Déli Tömb 2.189",
        "maxStudents": 130,
        "createdAt": "2022-12-21T...",
        "updatedAt": "2022-12-21T..."
      },
      stb.
    ]
  }
}
```

### 5. feladat: `Query.exam` (2 pont)

Visszaadja a paraméterként megadott azonosítójú vizsga adatait. Ha nem létezik ilyen, akkor kapjunk `null` értéket!

Kérés:

```graphql
query {
  exam(id: 3) {
    id
    startTime
    endTime
    location
    maxStudents
    createdAt
    updatedAt
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "exam": {
      "id": "3",
      "startTime": "2023-01-09T12:15:00.000Z",
      "endTime": "2023-01-09T14:15:00.000Z",
      "location": "Déli Tömb 4.633",
      "maxStudents": 40,
      "createdAt": "2022-12-21T...",
      "updatedAt": "2022-12-21T..."
    }
  }
}
```

### 6. feladat: `Query.studentByNeptun` (2 pont)

Visszaadja a paraméterként megadott Neptun kódhoz tartozó hallgató adatait. Ha nem létezik ilyen, akkor kapjunk `null` értéket!

Kérés:

```graphql
query {
  studentByNeptun(neptun: "6AF0CG") {
    id
    neptun
    name
    birthdate
    birthplace
    semester
    active
    createdAt
    updatedAt
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "studentByNeptun": {
      "id": "1",
      "neptun": "6AF0CG",
      "name": "John Deckow",
      "birthdate": "1971-10-22",
      "birthplace": "The Villages",
      "semester": 5,
      "active": false,
      "createdAt": "2022-12-21T...",
      "updatedAt": "2022-12-21T..."
    }
  }
}
```

### 7. feladat: `Student.exams` és `Exam.tasks` (2 pont)

Legyen lehetőség a hallgatók felől indulva lekérni azokat a vizsgákat, amelyekre az érintett hallgató jelentkezett; valamint az egyes vizsgákhoz tartozó feladatokat is.

Kérés:

```graphql
query {
  students {
    id
    neptun
    name
    exams {
      id
      location
      startTime
      endTime
      maxStudents
      tasks {
        id
        title
        text
        points
        extra
      }
    }
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "students": [
      {
        "name": "Kendra DuBuque",
        "birthdate": "1969-10-22",
        "birthplace": "The Villages",
        "exams": [
          {
            "id": "1",
            "location": "Déli Tömb 2.189",
            "startTime": "2022-12-22T11:45:00.000Z",
            "endTime": "2022-12-22T12:45:00.000Z",
            "maxStudents": 130,
            "tasks": [
              {
                "id": "1",
                "title": "1/A. feladat",
                "text": "Aspernatur pariatur officia...",
                "points": 3.5,
                "extra": false
              },
              stb.
            ]
          },
          stb.
        ]
      },
      stb.
    ]
  }
}
```

### 8. feladat: `Mutation.createStudent` (2 pont)

Létrehoz egy új hallgatót a megadott adatokkal. Siker esetén visszaadja a hallgatót, különben `null` értéket kap.

A bemenő adatoknak adj meg a sémában egy `CreateStudentInput` definiciót, amely a modellben tárolt mezők mindegyikét kötelezően várja az automatikusan kitöltődő `id`, `createdAt` és `updatedAt` kivételével!

Kérés:

```graphql
mutation {
  createStudent(
    input: {
      neptun: "FOXYYY"
      name: "Fox Luna"
      birthdate: "1996-07-09"
      birthplace: "Foxy Forest"
      semester: 5
      active: true
    }
  ) {
    id
    neptun
    name
    birthdate
    birthplace
    semester
    active
    createdAt
    updatedAt
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "createStudent": {
      "id": "...",
      "neptun": "FOXYYY",
      "name": "Fox Luna",
      "birthdate": "1996-07-09",
      "birthplace": "Foxy Forest",
      "semester": 5,
      "active": true,
      "createdAt": "2022-12-21T...",
      "updatedAt": "2022-12-21T..."
    }
  }
}
```

### 9. feladat: `Exam.studentCount` (2 pont)

Bővítsük a vizsgák adatait a vizsgára jelentkezett hallgatók számát jelentő értékkel!

Kérés:

```graphql
query {
  exam(id: 3) {
    startTime
    endTime
    location
    maxStudents
    studentCount
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "exam": {
      "id": "3",
      "startTime": "2023-01-09T12:15:00.000Z",
      "endTime": "2023-01-09T14:15:00.000Z",
      "location": "Déli Tömb 4.633",
      "maxStudents": 40,
      "studentCount": 12
    }
  }
}
```

### 10. feladat: `Exam.maxScore` és `Exam.perfectScore` (2 pont)

Bővítsük a vizsgák adatait a következő két mezővel:

  - `maxScore` - megadja, hogy mennyi az maximális pontszám a pluszpontos feladatok nélkül
  - `perfectScore` - megadja, hogy a pluszpontos feladatok hibátlan megoldásával együtt összesen hány pont szerezhető

A megfelelő számértékeket a `Task` modellben található `points` és `extra` mezők segítségével lehet kiszámítani a vizsgához tartozó feladatok figyelembevételével.

Kérés:

```graphql
query {
  exam(id: 1) {
    startTime
    endTime
    location
    maxScore
    perfectScore
    tasks {
      title
      points
      extra
    }
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "exam": {
      "startTime": "2022-12-22T11:45:00.000Z",
      "endTime": "2022-12-22T12:45:00.000Z",
      "location": "Déli Tömb 2.189",
      "maxScore": 30,
      "perfectScore": 35,
      "tasks": [
        {
          "title": "1/A. feladat",
          "points": 3.5,
          "extra": false
        },
        stb.,
        {
          "title": "4. feladat",
          "points": 5,
          "extra": true
        }
      ]
    }
  }
}
```

### 11. feladat: `Query.closestExam` (2 pont)

Megadja azt a vizsgát, amelynek kezdési időpontja jövőbeli és legközelebb van a lekérés pillanatához. Időpontegyezés esetén válasszuk a legkisebb azonosítójút! Ha nincs már jövőbeli vizsga, akkor `null` az eredmény.

Kérés:

```graphql
query {
  closestExam {
    id
    startTime
    endTime
    location
    maxStudents
  }
}
```

```json
{
  "data": {
    "closestExam": {
      "id": "5",
      "startTime": "2022-12-22T08:30:00.000Z",
      "endTime": "2022-12-22T10:30:00.000Z",
      "location": "Online",
      "maxStudents": 130
    }
  }
}
```

### 12. feladat: `Mutation.registerStudents` (4 pont)

Hallgatók feljelentkeztetése egy adott vizsgára.

Paraméterként adott a hallgatók Neptun kódjainak tömbje (`students`) és a vizsga azonosítója (`ExamId`).

A kimenet legyen a minta szerinti, azaz válasszuk szét külön tömbökbe a következő eseteket:

  - `invalidNeptun`: nem létezik ilyen Neptun kóddal hallgató
  - `alreadyRegistered`: létezik ilyen Neptun kóddal hallgató, de már fel van iratkozva a vizsgára
  - `justRegistered`: létezik ilyen Neptun kóddal hallgató, és most jelentkezett fel a vizsgára

Kérés:

```graphql
mutation {
  registerStudents(students: ["PNMVIL", "AAAAAA", "8G8YR7"], ExamId: 3) {
    invalidNeptun
    alreadyRegistered
    justRegistered
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "registerStudents": {
      "invalidNeptun": ["AAAAAA"],
      "alreadyRegistered": ["PNMVIL"],
      "justRegistered": ["8G8YR7"]
    }
  }
}
```

### 13. feladat: `Query.mostBusyStudent` (4 pont)

Megadja azt a hallgatót, aki a legtöbb vizsgára jelentkezett. Egyező vizsgaszám esetén válasszuk a legkisebb azonosítójú ilyen hallgatót! Feltételezhető, hogy van legalább egy hallgató, aki jelentkezett vizsgára.

Kérés:

```graphql
query {
  mostBusyStudent {
    id
    neptun
    name
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "mostBusyStudent": {
      "id": "10",
      "neptun": "0KD8CD",
      "name": "Charlotte Wintheiser II"
    }
  }
}
```

### 14. feladat: `Mutation.removePassiveStudents` (4 pont)

Most kaptuk a hírt, hogy a legújabb Neptun-hiba következtében olyan hallgatók is tudtak vizsgára jelentkezni, akik egyébként passzív féléven vannak.

Távolítsuk el őket a vizsgákról, és közben állítsuk elő a minta szerinti választ, amelyből kiolvasható, hogy mely hallgatók kerültek eltávolításra mely vizsgákról!

(Tipp: ha a módosítás helyesen működik, akkor többször egymás után futtatva üres tömböt kell kapni, hiszen az első futtatás után nem marad eltávolítandó jelentkező.)

Kérés:

```graphql
mutation {
  removePassiveStudents {
    student {
      id
      neptun
      name
    }
    removedFromExams {
      id
      startTime
      location
    }
  }
}
```

Mintaválasz:

```json
{
  "data": {
    "removePassiveStudents": [
      {
        "student": {
          "id": "7",
          "neptun": "RDYCVV",
          "name": "Monique Wagner"
        },
        "removedFromExams": [
          {
            "id": "2",
            "startTime": "2023-02-07T16:00:00.000Z",
            "location": "Online"
          },
          stb.
        ]
      },
      stb.
    ]
  }
}
```
