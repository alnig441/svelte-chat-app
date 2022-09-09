import { Server } from 'socket.io';
import cors from 'cors';
const ALLOWED = process.env.CORS.split(',');

export default function socketIoHandler(server) {
  const io = new Server(server, {
    cors: {
      origin: ALLOWED
    }
  })

  let isMaster;
  let masterIsConnected = false;
  let activeRooms;
  let masterRoom;

  io.use((socket, next) => {
    isMaster = !socket.handshake.xdomain ;

    if(isMaster) {
      masterIsConnected = true;
      socket.join('master');
    }
    else {
      socket.join('active');
    }
    console.log('is master?: ', isMaster)
    next();
  })

  io.on('connection', (socket) => {
    console.log('new connection: ', socket.id);
    socket.emit("welcome", "here is your id");

    socket.on("message", (message, roomId) => {
      console.log("incoming message: ", message);
    })

  })

  console.log('socket.io injected');
}
