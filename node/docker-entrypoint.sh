#!/bin/sh
set -e  # Exit on error

# Wait for the database to be ready
dockerize -wait tcp://db:3306 -timeout 20s

# Execute the original command
exec "$@"
