FROM public.ecr.aws/lambda/nodejs:16

COPY src/ ./src/
COPY *.json ./

RUN npm ci --production

RUN npm run build

CMD ["dist/index.handler"]
