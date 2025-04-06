#!/bin/bash 

if [ ! -d "$LARAVEL_PROJECT_PATH" ]; then
    echo "LARAVEL_PROJECT_PATH does not exist. Please set it in the environment."
    exit 1
fi
cd $LARAVEL_PROJECT_PATH

git reset --hard HEAD
git clean -fd
git pull origin main

COMPOSER_ALLOW_SUPERUSER=1 composer install --no-interaction --prefer-dist --no-dev --optimize-autoloader 

cp .env.example .env

sed -i "s/DB_HOST=.*/DB_HOST=$DB_HOST/" .env
sed -i "s/DB_PORT=.*/DB_PORT=$DB_PORT/" .env
sed -i "s/DB_DATABASE=.*/DB_DATABASE=$DB_DATABASE/" .env
sed -i "s/DB_USERNAME=.*/DB_USERNAME=$DB_USERNAME/" .env
sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=$DB_PASSWORD/" .env

if [ ! -d "$LARAVEL_STORAGE_PATH" ]; then
    mkdir -p $LARAVEL_STORAGE_PATH
fi

LARAVEL_STORAGE_PATH=$(echo $LARAVEL_STORAGE_PATH | sed 's/\//\\\//g')
sed -i "s/LARAVEL_STORAGE_PATH=.*/LARAVEL_STORAGE_PATH=$LARAVEL_STORAGE_PATH/" .env
sed -i "s/SERVER_NAME=.*/SERVER_NAME=$SERVER_NAME/" .env

npm ci 
npm run build
php artisan migrate --force 
php artisan optimize:clear 
php artisan config:cache 
php artisan route:cache 

docker compose down --rmi all --volumes
docker compose up -d --wait 