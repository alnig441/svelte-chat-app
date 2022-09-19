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


				io.on('connection',  async (socket) => {
					const toActiveRooms = io.to("active");
					const toModerator = io.to("moderator");
					const isModerator = (socket.handshake.auth.type === 'moderator');

					console.log('is moderator: ', socket.handshake.auth)

					if(isModerator) {
						moderatorIsConnected = true;
						moderatorID = socket.id;
						socket.join('moderator');
						let connections = await getConnections(socket);
						toModerator.emit('add rooms', connections);
						toActiveRooms.emit("welcome", "let me know if I can answer any questions!");
					} else {
						socket.join('active');
						toModerator.emit('new room', socket.id);
						if(moderatorIsConnected) {
							socket.emit('welcome', 'let me know if I can answer any questions!')
						}
					}

					socket.on('disconnect', (reason) => {
						let moderator = (moderatorID === socket.id);
						if(moderator) {
							console.log(`moderator disconnected - ${reason}`)
							toActiveRooms.emit("moderator left", "moderator left");
							moderatorIsConnected = false;
						}
						else {
							console.log(`room disconnected - ${reason}`)
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
