#安装nginx
FROM nginx:1.12.2-alpine

#镜像创建者的信息
MAINTAINER jrucker "jrucker@163.com"

#WORKDIR /usr/share/nginx/html/

# 拷贝nginx全局配置文件
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/cert /etc/nginx/conf.d/cert

COPY ./dist/ /usr/share/nginx/html/dist

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80 443
