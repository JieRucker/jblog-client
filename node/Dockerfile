FROM node:10.7.0-alpine as build-stage

LABEL name = "jblog-client"
LABEL version = "1.0"

# 设置时区
#RUN apk --update add tzdata \
#    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
#    && echo "Asia/Shanghai" > /etc/timezone \
#    && apk del tzdata

# 创建目录
RUN mkdir -p /home/jblog-client

# 设置工作目录
WORKDIR /home/jblog-client

# 拷贝package.json文件到工作目录
COPY ./package.json /home/jblog-client/package.json
COPY ./package-lock.json /home/jblog-client/package-lock.json

# 安装npm依赖(使用淘宝的镜像源)
RUN npm config set registry "https://registry.npm.taobao.org" \
    && npm config set sass_binary_site "https://npm.taobao.org/mirrors/node-sass/"

RUN npm install

# 拷贝所有源代码到工作目录
COPY . /home/jblog-client

#构建
RUN npm run build

#COPY --from=build-stage /home/jblog-client/dist jblog-client_nginx_container:/usr/share/nginx/html/dist
#https://www.jianshu.com/p/a4506ce7d33b
#COPY ./dist jblog-client_nginx_container:/usr/share/nginx/html/dist

CMD npm start

EXPOSE 8081
