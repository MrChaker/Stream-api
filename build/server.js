"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const inetegrationController_1 = __importDefault(require("./controllers/inetegrationController"));
const Integration_1 = require("./interfaces/Integration");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const port = process.env.PORT || 4000;
httpServer.listen(port, () => {
    console.log("listening at : " + port);
});
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Socket IO
app.get("/", (req, res) => {
    res.send("ooof");
});
/* Socket io */
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
let connectedSocket = "";
let integration = null;
io.on("connection", (socket) => {
    socket.on("integration", ({ integration: intName, clientSocket }) => {
        console.log("connected to" + clientSocket);
        connectedSocket = clientSocket;
        integration = new Integration_1.Integration(intName);
    });
});
app.use("/", (req, res, next) => {
    req.integration = integration;
    req.io = io;
    req.socketId = connectedSocket;
    next();
}, inetegrationController_1.default);
