#! /bin/bash

docker run -itd --name trip-collector.db --network trip-collector.network --hostname trip-collector.db -p 27017:27017 mongo --bind_ip_all
