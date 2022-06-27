### STAGE 1: Build ###
FROM node:16.13.0 AS build
# create directory app
WORKDIR /usr/src/app
# copy package.json to install dependencies
COPY package.json package-lock.json ./
# install project dependencies
RUN npm install
# copy project source code
COPY . .
# build project
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.21-alpine
# copy nginx config file
COPY nginx.conf /etc/nginx/nginx.conf
# copy build directory
COPY --from=build /usr/src/app/dist/sav-v4 /usr/share/nginx/html
# expose nginx port
EXPOSE 80