#!/bin/sh
set -e

case "$1" in
  --serve)
    echo "Starting local reVISit server on port 8080 (yarn serve)..."
    yarn serve
    ;;
  *)
    echo "leana.sh - minimal helper for local development"
    echo
    echo "Usage:"
    echo "  ./leana.sh --serve    # start the local dev server"
    exit 1
    ;;
esac


