FROM node:latest as builder

WORKDIR /src

COPY package.json .
COPY package-lock.json .
RUN npm install

FROM node:latest as runner

WORKDIR /run

COPY --from=builder /src/node_modules ./node_modules
COPY package.json .
COPY index.js .

CMD npm run start