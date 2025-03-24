#!/bin/sh
set -e  # Exit on error

# Wait for the database to be ready
dockerize -wait tcp://db:3306 -timeout 20s

# Ensure dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm ci --production
fi

# Execute the original command
exec "$@"
