import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});
export function getReceiverSocketId(receiverId) {
  return userSocketOnline[receiverId];
}

const userSocketOnline = {};
//lắng nghe user kết nối
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketOnline[userId] = socket.id;
  }
  io.emit("userOnline", Object.keys(userSocketOnline));
  //lắng nghe user ngắt kết nối
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketOnline[userId];
    io.emit("userOnline", Object.keys(userSocketOnline));
  });
});


export { io, server, app };
