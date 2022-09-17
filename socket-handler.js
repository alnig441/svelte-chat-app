import { Server } from 'socket.io';
import cors from 'cors';
const ALLOWED = process.env.CORS.split(',');

export default function socketIoHandler(server) {
  const io = new Server(server, {
    cors: {
      origin: ALLOWED
    }
  })

  const toActiveRooms = io.to("active");
  const toModerator = io.to("moderator");
  let moderatorIsConnected = false;
  let moderatorID;
  let isModerator;

  io.use( async (socket, next) => {

    isModerator = (socket.handshake.auth.type === 'moderator');

    if(isModerator) {
      moderatorIsConnected = true;
      moderatorID = socket.id;
      socket.join('moderator');
    } else {
      socket.join('active');
    }

    next();
  })

  io.on('connection',  async (socket) => {

    if(socket.id === moderatorID) {
      let connections = await getConnections(socket);
      toModerator.emit('add rooms', connections);
      toActiveRooms.emit("welcome", "let me know if I can answer any questions!");
    } else {
      toModerator.emit('new room', socket.id);
      if(moderatorIsConnected) {
        socket.emit('welcome', 'let me know if I can answer any questions!')
      }
    }

    socket.on('disconnect', (reason) => {
      let moderator = (moderatorID === socket.id);
      if(moderator) {
        toActiveRooms.emit("moderator left", "moderator left");
        moderatorIsConnected = false;
      }
      else {
        toModerator.emit('remove room', socket.id);
      }
    })

    socket.on('message', (message, roomId) => {
      if(!roomId) {
        socket.to("moderator").emit('message', message, socket.id);
      } else {
        socket.to(roomId).emit('message', message);
      }
    })

  })

  async function getConnections(socket) {
    const connections = await io.fetchSockets();
    return connections.map(connection => {
      if(connection.id !== socket.id) {
        return connection.id;
      }
    })
  }

  console.log('socket.io injected');
}
