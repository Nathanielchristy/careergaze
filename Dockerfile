########################################
# 1️⃣ Dependencies
########################################
FROM node:20-slim AS deps
WORKDIR /app

COPY package*.json ./
RUN npm install

########################################
# 2️⃣ Build
########################################
FROM node:20-slim AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

########################################
# 3️⃣ Production Runner
########################################
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
