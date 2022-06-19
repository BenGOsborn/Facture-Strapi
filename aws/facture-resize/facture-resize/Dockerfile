FROM public.ecr.aws/lambda/nodejs:16

COPY . .

RUN npm ci --production

RUN npm run build

CMD ["dist/index.handler"]
