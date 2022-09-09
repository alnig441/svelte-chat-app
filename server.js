// my-server.js
import { handler } from './build/handler.js';
import socketIoHandler from './socket-handler.js';
import express from 'express';
import http from 'http';
const app = express();

const server = http.createServer(app);

socketIoHandler(server);

app.use(handler);

server.listen(3000, () => {
  console.log('listening on port 3000')
})
