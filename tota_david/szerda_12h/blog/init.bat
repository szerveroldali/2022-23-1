:: Ezzel a parancsfajllal lehet nullarol inicializalni a Laravel projektet Windows rendszereken

:: Composer csomagok telepitese mindenfele interakcio es konzolra iras nelkul
call composer install --no-interaction --quiet
:: .env fajl elkeszitese, majd key generalas
:: A kezdocsomagban jo a .env.example fajl, nem kell utolag atirni a db-t
copy .env.example .env
call php artisan key:generate
:: NPM-es csomagok telepitese, szinten csendes modban
call npm install --silent
:: frontend oldali asset-ek kigeneralasa
call npm run dev
:: Ures database/database.sqlite fajl eloallitasa, hogy a migration mukodjon
type nul > database/database.sqlite
:: Fresh migration keszitese
call php artisan migrate:fresh
:: Adatok seedelese
call php artisan db:seed
:: A .gitignore-s zippeles miatt nincs public, es enelkul nem megy a symlink creation
mkdir .\storage\app\public
:: Symlink keszitese, alap config szerint a /public/storage-rol a /storage/app/public-ra
call php artisan storage:link
:: App elinditasa
call php artisan serve
