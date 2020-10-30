#!/bin/bash

docker run -itd -p 3000:3000 --name trip-collector.backend --network trip-collector.network --hostname trip-collector.backend hantonsen/trip-collector.backend
