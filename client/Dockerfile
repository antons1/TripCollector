FROM node:lts-alpine as build

WORKDIR /app
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN ["npm", "install"]

COPY .  /app
RUN ["npm", "run", "build"]

FROM nginx
COPY --from=build /app/dist /
COPY frontend.conf /etc/nginx/conf.d/
