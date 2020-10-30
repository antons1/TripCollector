#!/bin/bash

lein uberjar
docker build . -t hantonsen/trip-collector.backend

