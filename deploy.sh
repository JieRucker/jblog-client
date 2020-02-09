#!/bin/bash

#server_address="47.99.68.87"
#folder="/home/git/blog/work"
#project_folder="/home/git/blog/work/jblog-client"
#
#if [ ! -d "$folder" ]; then
#  echo '创建目录：'$folder''
#  mkdir -p "$folder"
#fi
#
#echo '进入'$folder'目录：'
#cd $folder
#
#if [ -d "$project_folder" ]; then
#  cd $project_folder
#  git pull origin master
#else
#  echo "克隆代码："
#  git clone git@$server_address:/home/git/blog/work/jblog-client.git
#  cd $project_folder
#fi

docker-compose down
docker volume rm jblogclient_web
docker volume rm jblog-client_web
docker volume ls
docker-compose build
docker-compose up -d
docker cp jblog-client_web_container:/home/jblog-client/dist /home/git/blog/work/jblog-client/dist
docker cp /home/git/blog/work/jblog-client/dist jblog-client_nginx_container:/usr/share/nginx/html/dist
echo "构建成功"









