FROM node:23.11-slim AS builder

WORKDIR /app

COPY package.json ./

RUN npm i --omit=dev

COPY . .

RUN npm run build

FROM node:23.11-slim AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "run", "start"]