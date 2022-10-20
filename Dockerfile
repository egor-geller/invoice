FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN npm install
RUN npm install react-bootstrap-table-next --save --legacy-peer-deps
RUN npm install react-bootstrap-table2-editor --save --legacy-peer-deps


COPY . .

EXPOSE 3000

CMD ["npm", "start"]