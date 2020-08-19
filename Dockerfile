FROM node:13.12.0-alpine as build
WORKDIR /confusion
ENV PATH /confusion/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

FROM node:13.12.0-alpine
WORKDIR /confusion
ENV PATH /confusion/node_modules/.bin:$PATH
RUN npm install json-server
COPY --from=build /confusion/manifest.json /confusion/public/favicon.ico /confusion/server/public/
COPY --from=build /confusion/json-server/public/images /confusion/server/public/images
COPY --from=build /confusion/build/ /confusion/server/public/
COPY --from=build /confusion/json-server/db.json /confusion/server/
EXPOSE 80
ENTRYPOINT [ "json-server", "-H", "0.0.0.0", "--watch", "server/db.json", "--static", "./server/public", "-p", "80", "-d", "2000" ]