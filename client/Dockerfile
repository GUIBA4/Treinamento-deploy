FROM node:lts-slim

RUN mkdir /app
WORKDIR /app

COPY ./src ./src
COPY ./public ./public
COPY package.json .
COPY client.js .

RUN yarn 

RUN yarn build

EXPOSE 3001

CMD ["yarn", "start"]