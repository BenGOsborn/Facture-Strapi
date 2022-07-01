FROM node:16.15.1-alpine3.16

ENV NODE_ENV=production

WORKDIR /usr/local/app

COPY config config/
COPY database ./database/
COPY providers ./providers/
COPY public ./public/
COPY src ./src/
COPY package* ./

RUN npm ci

RUN npm run build

CMD npm run start