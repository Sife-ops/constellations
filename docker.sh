#!/bin/sh

# to run with ngrok, define url before running this
# export VITE_NGROK_URL="your ngrok url"

pushd ./frontend
npm run build
popd
docker-compose up --build
