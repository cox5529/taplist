FROM node:16
EXPOSE 80

WORKDIR /app
COPY api/package.json ./api/
COPY api/package-lock.json ./api/

WORKDIR /app/api
RUN npm install

ENV GOOGLE_APPLICATION_CREDENTIALS /app/credential.json

WORKDIR /app
COPY . .

WORKDIR /app/api
RUN npm run build

ENTRYPOINT npm run start
