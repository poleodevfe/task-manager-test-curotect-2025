FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install pnpm and configure a consistent store path to prevent conflicts
RUN npm install -g pnpm@9.12.2 && pnpm config set store-dir /usr/src/app/.pnpm-store

# Copy package definition files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application's source code
COPY . .

# Expose the port the app will run on
EXPOSE 3001

# Command to start the application in development mode
CMD ["pnpm", "run", "dev"]
