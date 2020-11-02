#! /bin/bash

source ./settings.sh

docker run -itd --name $NAME --network $NETWORK --hostname $NAME -p $PORT:$PORT $PREFIX/$NAME
