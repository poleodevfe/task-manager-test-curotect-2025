#!/bin/sh
# entrypoint.sh

echo "Waiting for PostgreSQL to be ready..."
sleep 5

echo "Running Prisma migrations..."
pnpm exec prisma migrate deploy

echo "Starting the server..."
exec "$@"
