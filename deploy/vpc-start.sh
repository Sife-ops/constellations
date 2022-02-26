#!/bin/sh

. ./env.sh

cp ./docker-compose-vpc.yml ../docker-compose.yml

pushd ../

docker-compose up $@
