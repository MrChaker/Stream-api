"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const crypto_1 = __importDefault(require("crypto"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
io.on("connection", (socket) => console.log("connected to" + socket.id));
var data = JSON.stringify({
    location_ids: ["LS8Y646CN0Z0N"],
});
var config = {
    method: "post",
    url: "https://connect.squareupsandbox.com/v2/orders/search",
    headers: {
        Host: "connect.squareupsandbox.com",
        Authorization: "Bearer EAAAEEV5v78_Lck8rB_9hH5sYJNUWjH4qDEN80869Yu5XQWhYcKQ0PLZz8Agqpqz",
        "Content-Type": "application/json",
    },
    data: data,
};
app.get("/get-order", (req, res) => {
    (0, axios_1.default)(config)
        .then(function (response) {
        console.log(response.data);
        res.send(response.data);
    })
        .catch(function (error) {
        console.log(error);
    });
});
const SIGNATURE_KEY = process.env.SQUARE_SIGNATURE || "";
function isFromSquare(signature) {
    const hmac = crypto_1.default.createHmac("sha256", SIGNATURE_KEY);
    hmac.update(process.env.URL + "/webhook");
    const hash = hmac.digest("base64");
    console.log(hash);
    return hash === signature;
}
app.post("/webhook", (req, res) => {
    const signature = req.headers["x-square-hmacsha256-signature"];
    if (signature) {
        // Signature is valid. Return 200 OK.
        (0, axios_1.default)(config)
            .then(function (response) {
            response.data.orders.forEach((order) => {
                console.log("searched:" + order.id);
            });
            /* res.send(response.data); */
        })
            .catch(function (error) {
            console.log(error);
        });
    }
    else {
        // Signature is invalid. Return 403 Forbidden.
        res.status(400).send("err");
    }
    res.end();
});
