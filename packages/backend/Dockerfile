# packages/backend/Dockerfile
FROM node:20-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm@9.12.2

COPY package.json pnpm-lock.yaml* ./
COPY prisma ./prisma

RUN pnpm install && pnpm exec prisma generate

COPY . .

EXPOSE 3001
# CMD ["node_modules/.bin/nodemon"]
CMD ["pnpm", "run", "dev"]
