FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json to leverage Docker's layer caching
COPY package.json ./

# Install pnpm globally and then install dependencies
RUN npm install -g pnpm@9.12.2 && pnpm install

# Copy the rest of the application's source code
COPY . .

# Expose the port the app will run on
EXPOSE 3001

# Command to start the application in development mode
# This will be overridden later by a more specific start script
CMD ["pnpm", "run", "dev"]
