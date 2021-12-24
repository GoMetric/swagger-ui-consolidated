SHELL=bash

assets-build-prod:
	export NODE_ENV=production
	yarn install --production --non-interactive
	yarn build
