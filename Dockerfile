FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV REACT_APP_API_URL=https://meditech.ismaildev.uz/api
ENV REACT_APP_API_GRAPHQL_URL=https://meditech.ismaildev.uz/api/graphql
ENV REACT_APP_API_WS=wss://meditech.ismaildev.uz/api
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
