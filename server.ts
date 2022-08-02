import express from "express";
import axios from "axios";
import cors from "cors";
const app = express();
import { Client, Environment, ApiError } from "square";

const client = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox,
});

app.listen(4000);

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

app.get("/get-order", (req, res) => {
    axios(config)
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
});
