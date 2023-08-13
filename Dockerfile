FROM node:18-alpine

WORKDIR /server
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install && npm cache clean --force
COPY  . /server
EXPOSE 4000
CMD ["npm", "run", "start:migrate:dev"]