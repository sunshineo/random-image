FROM node:16

WORKDIR /app

ADD ./src /app/src
ADD ./package.json /app/package.json
ADD ./package-lock.json /app/package-lock.json
ADD ./tsconfig.json /app/tsconfig.json
ADD ./tslint.json /app/tslint.json

RUN npm ci
RUN npm run build

CMD node .
