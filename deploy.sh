#!/bin/bash

#echo "制作镜像:jblog-client"
#docker build -t jblog-client:v1.0 .

#echo "停止旧容器，并删除旧容器"
#docker stop jblog-client_web_container
#docker rm jblog-client_web_container
#docker stop jblog-client_nginx_container
#docker rm jblog-client_nginx_container

#echo "启动新容器"
#docker run -it -d --name jblog-client -p 8081:8081 jblog-client:v1.0

#!/bin/bash

server_address="47.99.68.87"
folder="/home/work/blog"
project_folder="/home/work/blog/jblog-client"

if [ ! -d "$folder" ]; then
  echo '创建目录：'$folder''
  mkdir -p "$folder"
fi

echo '进入'$folder'目录：'
cd $folder

if [ -d "$project_folder" ]; then
  cd $project_folder
  git pull origin master
else
  echo "克隆代码："
  git clone git@$server_address:/home/git/blog/jblog-client.git
  cd $project_folder
fi

docker-compose down
docker volume rm jblogclient_web
docker volume rm jblog-client_web
docker volume ls
docker-compose build
docker-compose up -d
docker cp jblog-client_web_container:/home/work/blog/jblog-client/dist ./
docker cp ./dist jblog-client_nginx_container:/usr/share/nginx/html/dist
# 查看日志
#docker logs jblog-client_web_container;
# 对空间进行自动清理
#docker system prune -a -f









