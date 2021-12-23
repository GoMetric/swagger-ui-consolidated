FROM node:16.13.1 as build

WORKDIR /build
COPY . /build

ENV NODE_ENV=production
RUN yarn install
RUN NODE_ENV=production yarn build

FROM nginx:1.21.4-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY ./docker/nginx/swagger-ui.conf /etc/nginx/conf.d

COPY --from=build /build/dist /var/www/swagger-ui
EXPOSE 80
WORKDIR /var/www/swagger-ui

