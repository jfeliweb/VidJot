FROM node:latest
RUN mkdir /app
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
EXPOSE 5000
RUN npm install -g nodemon
CMD [ "nodemon", "app.js"]