FROM node:8.15-stretch as build
WORKDIR /usr/src
COPY package.json .
COPY yarn.lock .
RUN npm install -g yarn@^1.15 && \
    chmod +x /usr/local/bin/yarn && \
    yarn -v
RUN yarn install


FROM node:8.15-stretch as docs
WORKDIR /usr/src/docs
RUN npm install -g gatsby-cli@^2.5 && chmod +x /usr/local/bin/gatsby && gatsby -v
COPY --from=build /usr/src/node_modules /usr/src/docs/node_modules
EXPOSE 8000
CMD ["gatsby", "develop", "-H", "0.0.0.0"]
