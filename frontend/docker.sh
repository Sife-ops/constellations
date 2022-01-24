#!/bin/sh
docker run \
    --name constellations_frontend \
    --rm \
    -d \
    -p 3000:80 \
    constellations_frontend
