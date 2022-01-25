#!/bin/sh
docker run \
    --mount type=bind,source="$(pwd)"/database,target=/app/database \
    --name constellations_backend \
    --rm \
    -d \
    -p 4000:80 \
    constellations_backend

