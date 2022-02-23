#!/bin/sh

if ! stat ./.env ; then
    echo 'Error: no .env file'
    exit 1
fi

source ./.env

pushd ./frontend
npm run build
popd
docker-compose -f docker-compose.yml up --build
