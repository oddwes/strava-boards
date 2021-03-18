FROM node:14.16.0-alpine3.10 as build-stage
WORKDIR /app
COPY . /app/
RUN yarn install && yarn build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-stage /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]