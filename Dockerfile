
#RUN apt-get update \
#    && apt-get install -y nginx

#安装nginx
FROM nginx:latest

# 安装node
FROM node:10.7.0-slim

LABEL name = "jblog-client"
LABEL version = "1.0"

#移除nginx默认的default.conf
RUN rm /etc/nginx/conf.d/default.conf

#将自定义nginx配置添加到conf.d下
COPY ./default.conf /etc/nginx/conf.d

RUN cd /home

# 创建项目代码的目录
RUN mkdir -p work

# 指定RUN、CMD与ENTRYPOINT命令的工作目录
WORKDIR work

# 复制宿主机当前路径下所有文件到docker的工作目录
COPY . work

# 清除npm缓存文件
RUN npm cache clean --force \
    && npm cache verify \
    && npm config set registry "https://registry.npm.taobao.org"

RUN npm install -g pm2@latest

# 安装package.json
RUN npm install

RUN npm run build
#   && cp -r dist/* /usr/share/nginx/html

#拷贝前端文件夹
COPY ./dist /usr/share/nginx/html

RUN rm -rf /home/work

RUN npm run prod

# docker容器仅在pid为1运行时会保持运行，如果进程退出了docker容器也就退出了
CMD ["nginx","-g","daemon off;"]

EXPOSE 8081


