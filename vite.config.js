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
				let moderatorIsConnected = false;
				let moderatorID;
				// io.use((socket, next) => {
				// 	console.log('in use')
				// 	isModerator = !socket.handshake.xdomain ;
				//
				// 	if(isModerator) {
				// 		moderatorIsConnected = true;
				// 		socket.join('moderator');
				// 	}
				// 	else {
				// 		socket.join('active');
				// 	}
				// 	console.log('is moderator?: ', isModerator)
				// 	next();
				// })

				io.on('connection',  async (socket) => {
					const toActiveRooms = io.to("active");
					const toModerator = io.to("moderator");
					const isModerator = !socket.handshake.xdomain;

					console.log(`is moderator? ${isModerator}: moderator connected? ${moderatorIsConnected}`)

					if(isModerator) {
						moderatorIsConnected = true;
						moderatorID = socket.id;
						socket.join('moderator');
						let connections = await getConnections(socket);
						toModerator.emit('add rooms', connections);
						toActiveRooms.emit("welcome", "moderator says welcome");
					} else {
						socket.join('active');
						toModerator.emit('new room', socket.id);
						if(moderatorIsConnected) {
							socket.emit('welcome', 'any questions?')
						}
					}

					socket.on('disconnect', (reason) => {
						let moderator = (moderatorID === socket.id);
						console.log(`moderator disconnect ? : ${moderator} - ${reason}`)
						if(moderator) {
							console.log('send disconnect to active rooms');
							toActiveRooms.emit("moderator left", "moderator has left the chat");
							moderatorIsConnected = false;
						}
						else {
							toModerator.emit('remove room', socket.id);
						}
					})

					socket.on('message', (message, roomId) => {
						console.log('message received: ', message, roomId, socket.id)
						if(!roomId) {
							socket.to("moderator").emit('message', message, socket.id);
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
