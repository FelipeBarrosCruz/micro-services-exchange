FROM mhart/alpine-node:latest
ENV NODE_ENV=production

RUN apk add --update \
  make \
  gcc \
  g++ \
  python \
  git

WORKDIR /src

ADD package.json package-lock.json ./
RUN npm install

ADD / ./

CMD ["npm", "start"]
