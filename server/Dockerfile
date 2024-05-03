FROM node:latest as build
WORKDIR /app
COPY package.json ./
COPY . .
RUN npm ci
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main.js"]