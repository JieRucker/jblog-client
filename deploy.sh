#!/bin/bash

PROJECT_NAME = "jblog-client" # 项目名称
IMAGE_VERSION = "v1.0" # 镜像版本

RESUME_PATH

cd /home

# 创建项目代码的目录
echo "创建项目目录"
mkdir -p work

echo "克隆新代码"
git clone git@47.99.68.87:/home/git/blog/$PROJECT_NAME.git

cd project_name

echo "编译build"
npm run build

echo "安装node镜像：10.7.0"
docker pull node:10.7.0

echo "安装nginx镜像：1.12.2"
docker pull nginx:1.12.2

echo "制作镜像:$PROJECT_NAME"
docker build -t $PROJECT_NAME:$IMAGE_VERSION .

echo "停止旧容器，并删除旧容器"
docker stop jblog-client
docker rm jblog-client

echo "启动新容器"
docker run -d --name jblog-client -p 8081:8081 $$project_name:$IMAGE_VERSION

