#!/bin/bash

source ./settings.sh

docker run -itd -p $PORT:$PORT --name $NAME --network $NETWORK --hostname $NAME $PREFIX/$NAME
