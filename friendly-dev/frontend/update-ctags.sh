#!/usr/bin/env bash

set -e  # Exit on error

ctags --recurse \
      --languages=JavaScript,TypeScript \
      --exclude=node_modules \
      --exclude=dist \
      --exclude=build \
      --exclude=.git \
      --exclude=coverage \
      --exclude=.next \
      --exclude=.cache \
      --fields=+l \
      --extras=+q \
      -e \
      ./app
