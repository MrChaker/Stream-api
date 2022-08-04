import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import integrationRouter from "./controllers/inetegrationController";

const app = express();
const httpServer = createServer(app);

const port = process.env.PORT || 4000;
httpServer.listen(port, () => {
    console.log("listening at : " + port);
});

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Socket IO

app.get("/", (req, res) => {
    res.send("ooof");
});

/* Socket io */
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

let connectedSocket: Socket | null = null;
io.on("connection", (socket) => {
    socket.on("integration", ({ integration, clientSocket }) => {
        console.log("connected to" + clientSocket);
        integrationRouter(app, clientSocket, integration, io);
    });
});
