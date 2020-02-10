#!/bin/bash

docker-compose down
docker-compose build
docker-compose up -d
docker cp jblog-client_web_container:/home/jblog-client/dist /home/git/blog/work/jblog-client/dist
docker cp /home/git/blog/work/jblog-client/dist nginx_container:/usr/share/nginx/html/jblog-client
echo "构建成功"









