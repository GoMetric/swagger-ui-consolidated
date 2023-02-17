#!/bin/sh

set -e

if [ -n "${APP_CONFIG}" ]; then
  echo "${APP_CONFIG}" > /var/www/swagger-ui/config.json
fi
