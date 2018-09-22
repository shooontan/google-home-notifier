FROM node:10.6

WORKDIR /app
COPY package.json yarn.lock /app/

RUN \
  apt-get update -y && \
  yarn
