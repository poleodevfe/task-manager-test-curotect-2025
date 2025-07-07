#!/bin/sh
# entrypoint.sh

echo "Waiting for PostgreSQL to be fully ready and accepting connections..."

MAX_RETRIES=30
RETRY_INTERVAL=5

for i in $(seq 1 $MAX_RETRIES); do
  pnpm exec prisma validate >/dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "PostgreSQL is ready and Prisma can connect!"
    break
  else
    echo "PostgreSQL not yet ready or Prisma cannot connect. Retrying in $RETRY_INTERVAL seconds... ($i/$MAX_RETRIES)"
    sleep $RETRY_INTERVAL
  fi
done

if [ $i -gt $MAX_RETRIES ]; then
  echo "Error: PostgreSQL did not become ready after $MAX_RETRIES attempts. Exiting."
  exit 1
fi

echo "Running Prisma migrations..."
pnpm exec prisma migrate deploy

echo "Starting the server..."
exec "$@"
