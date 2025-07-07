FROM node:20-alpine

# we need curl to validate the healthcheck
RUN apk add --no-cache curl

WORKDIR /usr/src/app

# install pnpm and set the store directory
RUN npm install -g pnpm@9.12.2 && pnpm config set store-dir /usr/src/app/.pnpm-store

# copy package.json and pnpm-lock.yaml files for the backend service
COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY prisma ./prisma
COPY entrypoint.sh ./entrypoint.sh

# generate Prisma client
RUN pnpm exec prisma generate

COPY . .

# set the entrypoint script permissions for the entrypoint.sh in the WORKDIR
RUN chmod +x ./entrypoint.sh

EXPOSE 3001

# Set the entrypoint to the correct path within the WORKDIR
ENTRYPOINT ["./entrypoint.sh"]
CMD ["pnpm", "run", "dev"]
