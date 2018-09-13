FROM node:10.6

WORKDIR /app
COPY . /app

RUN \
  apt-get update -y && \
  yarn
