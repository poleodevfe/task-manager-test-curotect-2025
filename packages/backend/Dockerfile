FROM node:20-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm@9.12.2 && pnpm config set store-dir /usr/src/app/.pnpm-store

COPY package.json pnpm-lock.yaml* ./
COPY prisma ./prisma

RUN pnpm install && pnpm exec prisma generate

COPY . .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["/entrypoint.sh"]
CMD ["pnpm", "run", "dev"]
