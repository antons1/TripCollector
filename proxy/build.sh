#!/bin/bash

source ./settings.sh

docker build . -t $PREFIX/$NAME
docker tag $PREFIX/$NAME registry.mk8s.lanodispenser.no/$NAME