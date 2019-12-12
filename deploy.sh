#!/bin/bash

#PROJECT_NAME = "jblog-client" # 项目名称
#IMAGE_VERSION = "v1.0" # 镜像版本

#RESUME_PATH

#cd /home
#
## 创建项目代码的目录
#echo "创建项目目录"
#mkdir -p work
#
#echo "克隆新代码"
#git clone git@47.99.68.87:/home/git/blog/jblog-client.git
#
#cd jblog-client
#
#echo "编译build"
#npm run build
#
#echo "安装node镜像：10.7.0"
#docker pull node:10.7.0
#
#echo "安装nginx镜像：1.12.2"
#docker pull nginx:1.12.2
#
#echo "制作镜像:jblog-client"
#docker build -t jblog-client:v1.0 .
#
#echo "停止旧容器，并删除旧容器"
#docker stop jblog-client_web_container
#docker rm jblog-client_web_container
#docker stop jblog-client_nginx_container
#docker rm jblog-client_nginx_container
#
#echo "启动新容器"
#docker run -it -d --name jblog-client -p 8081:8081 jblog-client:v1.0

# 关闭容器
docker-compose stop || true;
# 删除容器
docker-compose down || true;
# 构建镜像
docker-compose build;
# 启动并后台运行
docker-compose up -d;
# 查看日志
#docker logs nodejs;
# 对空间进行自动清理
docker system prune -a -f




