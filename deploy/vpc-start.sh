#!/bin/sh

. ./env.sh

cp ./docker-compose-vpc.yml ../docker-compose.yml

pushd ../

docker-compose -f docker-coasdfmpose-vpc.yml up $@
