import { sveltekit } from '@sveltejs/kit/vite';
import { Server } from 'socket.io';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();
const ALLOWED = process.env.CORS.split(',');

import { kitDocsPlugin } from '@svelteness/kit-docs/node';
import Icons from 'unplugin-icons/vite';

/** @type {import('vite').UserConfig} */
const config = {
	extensions: ['svelte', 'md'],
	plugins: [
		Icons({ compiler: 'svelte' }),
		kitDocsPlugin({
			shiki: {
				theme: 'material-ocean',
			},
		}),
		sveltekit(),
		{
			name: 'svelte-kit-io',
			configureServer(server) {
				const io = new Server(server.httpServer,{cors: { origin: ALLOWED }});
				// io.use((socket, next) => {
				// 	console.log('in use')
				// 	isMaster = !socket.handshake.xdomain ;
				//
				// 	if(isMaster) {
				// 		masterIsConnected = true;
				// 		socket.join('master');
				// 	}
				// 	else {
				// 		socket.join('active');
				// 	}
				// 	console.log('is master?: ', isMaster)
				// 	next();
				// })

				io.on('connection',  async (socket) => {
					const activeRooms = io.to("active");
					const masterRoom = io.to("master");
					const isMaster = !socket.handshake.xdomain;

					if(isMaster) {
						socket.join('master');
						let connections = await getConnections(socket);
						masterRoom.emit('add rooms', connections);
					} else {
						socket.join('active');
						masterRoom.emit('new room', socket.id);
						socket.emit('welcome', 'any questions?')
					}

					// socket.emit("welcome", socket.id);

					socket.on('disconnect', (reason) => {
						console.log('disconnect reason: ', reason)
						masterRoom.emit('remove room', socket.id);
					})

					socket.on('message', (message, roomId) => {
						console.log('message received: ', message, roomId, socket.id)
						if(!roomId) {
							socket.to("master").emit('message', message, socket.id);
						} else {
							socket.to(roomId).emit('message', message);
						}
					})

				})

				async function getConnections(socket) {
					const connections = await io.fetchSockets();
					return connections.map( connection => {
						if(connection.id !== socket.id) {
							return connection.id;
						}
					})
				}


			}
		}
	],
};

export default config;
