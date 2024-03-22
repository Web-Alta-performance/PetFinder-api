FROM node:alpine

WORKDIR /usr/src/app

COPY package.json .
RUN npm install --quiet --force

COPY . .

CMD ["npm", "start"]