# syntax=docker/dockerfile:1.4

FROM --platform=$BUILDPLATFORM node:16.18-bullseye-slim as builder

RUN mkdir /project
WORKDIR /project

RUN npm install -g @angular/cli@14

COPY package.json package-lock.json ./

#fix bootstrap issue to remove force
RUN npm ci --force 

COPY /src .
CMD ["ng", "build", "--configuration", "production", "--aot"]

#host app internally via nginx
FROM nginx:1.17.1-alpine as builder

COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist /usr/share/nginx/html


#target for local machine
FROM --platform=$BUILDPLATFORM node:16.18-bullseye-slim as dev-envs

RUN mkdir /project
WORKDIR /project

RUN npm install -g @angular/cli@14

COPY package.json package-lock.json ./

#fix bootstrap issue to remove force
RUN npm ci --force 

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]