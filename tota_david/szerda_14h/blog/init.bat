:: Composer-es csomagok telepítése mindenféle interakció és konzolra írás nélkül
call composer install --no-interaction --quiet

:: Beadandónak megfelelő .env fájl előállítása
@echo off
(
  echo APP_NAME="Laravel beadandó"
  echo APP_ENV=local
  echo APP_KEY=
  echo APP_DEBUG=true
  echo APP_URL=http://localhost
  echo.
  echo DB_CONNECTION=sqlite
) > .env
@echo on

:: Encryption key kigenerálása
call php artisan key:generate

:: Node Package Manager-es csomagok telepítése (csendes módban)
call npm install --silent

:: Frontend oldali asset-ek kigenerálása. A build opcióval a Vite dobja a watch módot
:: (amitől megakadna az init folyamat), de ha Mix kapja meg, akkor ignorálja
call npm run dev -- build

:: Üres database/database.sqlite fájl előállítása, hogy a migration működjön
type nul > database/database.sqlite

:: Táblák létrehozása, seed-elés
call php artisan migrate:fresh --seed

:: Elképzelhető, hogy a storage-ben nem létezik a public, de szükséges legalább
:: egy üres könyvtár a szimbolikus link elkészítéséhez
mkdir .\storage\app\public

:: Symlink készítése, alap config szerint a /public/storage-ról a /storage/app/public-ra
call php artisan storage:link

:: Alkalmazás indítása
call php artisan serve
