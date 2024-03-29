SHELL=bash

assets-build-prod:
	export NODE_ENV=production
	yarn install --non-interactive
	yarn build

watch:
	NODE_ENV=development yarn watch
