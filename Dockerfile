FROM node:16.3

WORKDIR /app

RUN \
  curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.13.0 \
  && export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
