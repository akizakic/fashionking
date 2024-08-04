FROM node:14

WORKDIR /app

COPY package.json ./
RUN npm install
# ㅁㄴㅇㄹ
COPY . .

EXPOSE 5000
CMD ["node", "server.js"]
