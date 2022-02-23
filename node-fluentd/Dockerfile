FROM node:13-alpine as builder

WORKDIR /src

COPY package.json .
COPY package-lock.json .
RUN npm install

FROM node:13-alpine as runner

WORKDIR /run

COPY --from=builder /src/node_modules ./node_modules
COPY package.json .
COPY index.js .

CMD node index.js