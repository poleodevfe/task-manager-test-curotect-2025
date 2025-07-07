FROM node:20-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm@9.12.2 && pnpm config set store-dir /usr/src/app/.pnpm-store

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

EXPOSE 5173

# Command to start the Vite development server
CMD ["pnpm", "run", "dev"]
