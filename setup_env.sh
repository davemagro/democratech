#!/bin/bash 

git reset --hard HEAD
git clean -fd
git pull origin main

composer install --no-interaction --prefer-dist --no-dev --optimize-autoloader 
npm ci 
npm run build --
php artisan migrate --force 
php artisan optimize:clear 
php artisan config:cache 
php artisan route:cache 


cp .env.example .env

sed -i "s/DB_HOST=.*/DB_HOST=$DB_HOST/" .env
sed -i "s/DB_PORT=.*/DB_PORT=$DB_PORT/" .env
sed -i "s/DB_DATABASE=.*/DB_DATABASE=$DB_DATABASE/" .env
sed -i "s/DB_USERNAME=.*/DB_USERNAME=$DB_USERNAME/" .env
sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=$DB_PASSWORD/" .env

if [ ! -d "$LARAVEL_STORAGE_PATH" ]; then
    mkdir -p $LARAVEL_STORAGE_PATH
fi

sed -i "s/LARAVEL_STORAGE_PATH=.*/LARAVEL_STORAGE_PATH=$LARAVEL_STORAGE_PATH/" .env

