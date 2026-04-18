import express from "express";
import cors from "cors";
import "dotenv/config";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`Connected id: ${socket.id}`);
    socket.on("joinRoom", (roomID) => {
        socket.join(roomID);
    });

    socket.on("sendMessage", (data) => {
        io.to(data.roomID).emit("receiveMessage",
            {
                senderID: data.senderID,
                message: data.message
            });
    });
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
