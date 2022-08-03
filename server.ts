import express from "express";
import axios from "axios";
import cors from "cors";
import crypto from "crypto";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

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
io.on("connection", (socket: Socket) =>
    console.log("connected to" + socket.id)
);

var data = JSON.stringify({
    location_ids: ["LS8Y646CN0Z0N"],
});

var config = {
    method: "post",
    url: "https://connect.squareupsandbox.com/v2/orders/search",
    headers: {
        Host: "connect.squareupsandbox.com",
        Authorization:
            "Bearer EAAAEEV5v78_Lck8rB_9hH5sYJNUWjH4qDEN80869Yu5XQWhYcKQ0PLZz8Agqpqz",
        "Content-Type": "application/json",
    },
    data: data,
};
app.get("/get-order", (req, res) => {
    axios(config)
        .then(function (response) {
            console.log(response.data);
            res.send(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
});
const SIGNATURE_KEY = process.env.SQUARE_SIGNATURE || "";

function isFromSquare(signature: any) {
    const hmac = crypto.createHmac("sha256", SIGNATURE_KEY);
    hmac.update(process.env.URL + "/webhook");
    const hash = hmac.digest("base64");
    console.log(hash);
    return hash === signature;
}

app.post("/webhook", (req, res) => {
    const signature = req.headers["x-square-hmacsha256-signature"];
    if (signature) {
        // Signature is valid. Return 200 OK.
        axios(config)
            .then(function (response) {
                response.data.orders.forEach((order: any) => {
                    console.log("searched:" + order.id);
                });
                /* res.send(response.data); */
            })
            .catch(function (error) {
                console.log(error);
            });
    } else {
        // Signature is invalid. Return 403 Forbidden.
        res.status(400).send("err");
    }
    res.end();
});
