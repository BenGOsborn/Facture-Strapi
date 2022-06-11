FROM node:16-alpine3.16

ENV NODE_ENV=production

WORKDIR /usr/local/app

COPY ./ ./

RUN npm install --production

RUN npm run build

CMD npm run start