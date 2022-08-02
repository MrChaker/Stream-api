import express from "express";
import axios from "axios";
import cors from "cors";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const app = express();
import { Client, Environment, ApiError } from "square";

const client = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox,
});

const port = process.env.PORT || 4000;
console.log(port);
app.listen(port, () => {
    console.log("listening at : " + port);
});

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var data = JSON.stringify({
    idempotency_key: "uuid",
    order: {
        location_id: "LS8Y646CN0Z0N",
        customer_id: "129",
        line_items: [
            {
                quantity: "3",
                name: "Burger",
                note: "without cheese",
                uid: "19",
                base_price_money: {
                    amount: 20,
                    currency: "USD",
                },
            },
            {
                quantity: "1",
                name: "Colla",
                uid: "20",
                base_price_money: {
                    amount: 90,
                    currency: "USD",
                },
            },
        ],
    },
});

var config = {
    method: "post",
    url: "https://connect.squareupsandbox.com/v2/orders",
    headers: {
        Host: "connect.squareupsandbox.com",
        Authorization:
            "Bearer EAAAEEV5v78_Lck8rB_9hH5sYJNUWjH4qDEN80869Yu5XQWhYcKQ0PLZz8Agqpqz",
        "Content-Type": "application/json",
    },
    data: data,
};

app.get("/", (req, res) => {
    res.send("ooof");
});
app.get("/get-order", (req, res) => {
    axios(config)
        .then(function (response) {
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
        res.status(200).send(req.body);
    } else {
        // Signature is invalid. Return 403 Forbidden.
        res.status(400).send("err");
    }
    res.end();
});
