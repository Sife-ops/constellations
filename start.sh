#!/bin/sh

# to run with ngrok, define url before running this
# export VITE_PROD_URL="your prod url"

pushd ./frontend
npm run build
popd
docker-compose up --build
