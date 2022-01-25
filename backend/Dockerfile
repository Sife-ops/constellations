FROM node:16.13-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 80
CMD ["node", "./dist/index.js"]
