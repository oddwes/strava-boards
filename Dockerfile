# build environment
FROM node:14.16.0-alpine3.10 as build

ARG PIZZLY_SETUP_ID
ENV REACT_APP_PIZZLY_SETUP_ID $PIZZLY_SETUP_ID
ARG PIZZLY_HOST
ENV REACT_APP_PIZZLY_HOST $PIZZLY_HOST
ARG CACHE_HOST
ENV REACT_APP_CACHE_HOST $CACHE_HOST

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]