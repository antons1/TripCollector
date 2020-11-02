#!/bin/bash

source ./settings.sh

lein uberjar
docker build . -t $PREFIX/$NAME
