
FROM node:23.11-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm i

COPY . .

RUN npm run build

FROM node:23.11-alpine AS runner

WORKDIR /app

COPY package*.json ./

RUN npm i --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

EXPOSE 3000

CMD ["npm", "run", "start"]