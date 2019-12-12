FROM node:10.7.0-alpine

## 拷贝项目文件进行构建
WORKDIR /app/
COPY ./package.json ./
RUN npm install --registry=https://registry.npm.taobao.org

COPY ./* /app/
CMD ["npm","run","dev"]

EXPOSE 7001
