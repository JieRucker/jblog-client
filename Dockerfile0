
#RUN apt-get update \
#    && apt-get install -y nginx



echo "FROM nginx:latest" >> ./Dockerfile
echo "COPY ./dist /usr/share/nginx/html/" >> ./Dockerfile
echo "" >> ./Dockerfile
echo "EXPOSE 80" >> ./Dockerfile

#安装nginx
FROM nginx:alpine

#镜像创建者的信息
MAINTAINER jrucker "jrucker@163.com"

#将自定义nginx配置添加到conf.d下
COPY ./default.conf /etc/nginx/conf.d/

#ENV SSR_PATH /build
#$SSR_PATH
#ENV PATH /usr/local/nginx/bin:$PATH确保CMD ["nginx"] 正常工作。
#以挂载方式启动容器
#docker run -d -p 8003:3000 -v /Users/wuming/dockerWorkpace/myDocker/public:/myDocker/public my-docker:latest

# 安装node
FROM node:10.7.0-alpine

LABEL name = "jblog-client"
LABEL version = "1.0"

# 创建项目代码的目录
RUN mkdir -p /home/work

# 指定RUN、CMD与ENTRYPOINT命令的工作目录
WORKDIR /home/work

# 复制宿主机当前路径下所有文件到docker的工作目录
COPY . /home/work

# 清除npm缓存文件
#RUN npm cache clean --force \
#    && npm cache verify \
RUN npm config set registry "https://registry.npm.taobao.org" \
    && npm config set sass_binary_site "https://npm.taobao.org/mirrors/node-sass/"

RUN npm install -g pm2@latest

# 安装package.json
RUN npm install

RUN npm run build
#   && cp -r dist/* /usr/share/nginx/html



#移除nginx默认的default.conf
#RUN rm -rf /etc/nginx/conf.d/default.conf

#将自定义nginx配置添加到conf.d下
#COPY ./default.conf /etc/nginx/conf.d/

#拷贝前端文件夹
#COPY ./dist /usr/share/nginx/html/

#RUN rm -rf /home/work

#CMD [ "sh", "-c", "service nginx start"]
#CMD npm run prod --no-daemon

# docker容器仅在pid为1运行时会保持运行，如果进程退出了docker容器也就退出了
#CMD ["nginx","-g","daemon off;"]

EXPOSE 8082


