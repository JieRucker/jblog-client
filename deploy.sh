#!/bin/bash

rm -rf /var/lib/docker/volumes/jblog-client-data/_data/*
docker volume create --driver local jblog-client-data
docker-compose down
docker-compose build
docker-compose up -d

echo "构建成功"









