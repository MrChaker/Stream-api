import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import integrationRouter from "./controllers/inetegrationController";
import { Integration } from "./interfaces/Integration";

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

let connectedSocket = "";
let integration: Integration | null = null;

io.on("connection", (socket) => {
    socket.on("integration", ({ integration: intName, clientSocket }) => {
        console.log("connected to" + clientSocket);
        connectedSocket = clientSocket;
        integration = new Integration(intName);
    });
});

app.use(
    "/",
    (req, res, next) => {
        req.integration = integration;
        req.io = io;
        req.socketId = connectedSocket;
        next();
    },
    integrationRouter
);
