FROM node:14.16.0-alpine3.10 as build-stage

ARG PIZZLY_SETUP_ID
ENV REACT_APP_PIZZLY_SETUP_ID $PIZZLY_SETUP_ID
ARG PIZZLY_HOST
ENV REACT_APP_PIZZLY_HOST $PIZZLY_HOST
ARG CACHE_HOST
ENV REACT_APP_CACHE_HOST $CACHE_HOST

WORKDIR /app
COPY . /app/
RUN yarn install && yarn build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-stage /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]