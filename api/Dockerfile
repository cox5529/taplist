FROM node:16
EXPOSE 80

WORKDIR /app
COPY package.json .
COPY package-lock.json .

RUN npm install

ENV GOOGLE_APPLICATION_CREDENTIALS /app/credential.json
COPY . .
RUN npm run build

ENTRYPOINT npm run start
