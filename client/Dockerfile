FROM node:lts-alpine as build

WORKDIR /app
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock
RUN ["yarn", "install"]

COPY .  /app
RUN ["yarn", "run", "build"]

FROM nginx
COPY --from=build /app/dist /
COPY frontend.conf /etc/nginx/conf.d/
