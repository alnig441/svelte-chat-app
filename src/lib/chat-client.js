import ioClient from "socket.io-client";
const ENDPOINT = "http://localhost:5173";

const SOCKET = ioClient(ENDPOINT);

export const io = SOCKET;
