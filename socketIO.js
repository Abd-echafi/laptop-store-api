const { Server } = require("socket.io");

let io;

function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: ["http://localhost:3000", "http://localhost:5173"], // Allow connections from these frontend URLs
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("A user disconnected:", socket.id);
        });
    });

    return io;
}

function getIO() {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
}

module.exports = { initSocket, getIO };
