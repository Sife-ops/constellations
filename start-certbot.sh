#!/bin/sh

# define url before running this
# export VITE_PROD_URL="your prod url"

pushd ./proxy

if ! touch ./dhparam/dhparam-2048 ; then
    mkdir ./dhparam
    openssl dhparam -out ./dhparam/dhparam-2048.pem 2048
fi

sed "/server_name/ s/<++>/${VITE_PROD_URL}/" ./nginx-template/default.certbot.conf > ./nginx-certbot/default.conf

popd

docker-compose up
