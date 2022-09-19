// my-server.js
import { handler } from './build/handler.js';
import socketIoHandler from './socket-handler.js';
import express from 'express';
import http from 'http';
const app = express();
const PORT = process.env.PORT || 3000;
const hostName = process.env.NODE_ENV === "development" ? "localhost" : "0.0.0.0";

console.log('hello env: ', process.env.NODE_ENV)

const server = http.createServer(app);

socketIoHandler(server);

app.use(handler);

server.listen(PORT, hostName, () => {
  console.log(`listening on port: ${PORT}`)
})
