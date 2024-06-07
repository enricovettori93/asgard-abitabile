FROM node:20.11.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run generate
EXPOSE 3000
CMD ["npm", "run", "dev"]
