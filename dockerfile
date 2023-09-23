FROM node:14-alpine

WORKDIR /app

COPY .env ./

COPY package.json ./

RUN npm install

COPY . .

RUN npm run postinstall

EXPOSE 5000

CMD ["npm", "run","dev"]
