#!/bin/sh

# to run with ngrok, define url before running this
# export VITE_NGROK_URL="your ngrok url"

pushd ./frontend
npm run build
popd
docker-compose -f docker-compose-ngrok.yml up --build
