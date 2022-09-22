# Ezzel a shell scripttel lehet nullarol inicializalni a Laravel projektet Linux/macOS rendszereken

# Composer csomagok telepitese mindenfele interakcio es konzolra iras nelkul
composer install --no-interaction --quiet
# .env fajl elkeszitese, majd key generalas
# A kezdocsomagban jo a .env.example fajl, nem kell utolag atirni a db-t
cp .env.example .env
php artisan key:generate
# NPM-es csomagok telepitese, szinten csendes modban
npm install --silent
# frontend oldali asset-ek kigeneralasa
npm run prod
# Ures database/database.sqlite fajl eloallitasa, hogy a migration mukodjon
touch database/database.sqlite
# Fresh migration keszitese
php artisan migrate:fresh
# Adatok seedelese
php artisan db:seed
# A .gitignore-s zippeles miatt nincs public, es enelkul nem megy a symlink creation
mkdir ./storage/app/public
# Symlink keszitese, alap config szerint a /public/storage-rol a /storage/app/public-ra
php artisan storage:link
# App elinditasa
php artisan serve
