FROM node:14

WORKDIR /app

RUN npm install -g expo-cli

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
CMD ["expo", "start", "--tunnel"]
