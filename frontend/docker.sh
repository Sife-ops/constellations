#!/bin/sh
docker run \
    --name constellations_frontend \
    --rm \
    -d \
    -p 3001:80 \
    constellations_frontend
