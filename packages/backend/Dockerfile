FROM node:20-alpine

# we need curl to validate the healthcheck
RUN apk add --no-cache curl

WORKDIR /usr/src/app

# install pnpm and set the store directory
RUN npm install -g pnpm@9.12.2 && pnpm config set store-dir /usr/src/app/.pnpm-store

# copy package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml* ./

# install dependencies
RUN pnpm install

# copy the rest of the files, including entrypoint.sh (assuming it's in packages/backend/)
COPY . .

# generate Prisma client
RUN pnpm exec prisma generate

# set the entrypoint script permissions for the entrypoint.sh in the WORKDIR
RUN chmod +x ./entrypoint.sh

EXPOSE 3001

# Set the entrypoint to the correct path within the WORKDIR
ENTRYPOINT ["./entrypoint.sh"]
CMD ["pnpm", "run", "dev"]
