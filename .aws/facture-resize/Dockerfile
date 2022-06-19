# Build
FROM public.ecr.aws/lambda/nodejs:16 AS builder

WORKDIR /usr/local

COPY . .

RUN npm ci

RUN npm run build

# Production
FROM public.ecr.aws/lambda/nodejs:16 AS production

COPY --from=builder /usr/local/dist /usr/local/package*.json ./

RUN npm ci --production

CMD ["dist/index.handler"]
