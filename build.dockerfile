FROM node:20
LABEL author="Suhyun Park <me@shiftpsh.com>"

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile --non-interactive

COPY . ./
RUN yarn build

# Running the app
CMD [ "yarn", "start" ]