FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY src ./src

COPY tsconfig.json ./

RUN npm run build

RUN npm ci --only=production

EXPOSE 3000

CMD ["node", "dist/index.js"]
