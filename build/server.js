"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const square_1 = require("square");
const client = new square_1.Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: square_1.Environment.Sandbox,
});
const port = process.env.PORT || 4000;
console.log(port);
app.listen(port, () => {
    console.log(process.env.PORT);
});
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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
        Authorization: "Bearer EAAAEEV5v78_Lck8rB_9hH5sYJNUWjH4qDEN80869Yu5XQWhYcKQ0PLZz8Agqpqz",
        "Content-Type": "application/json",
    },
    data: data,
};
app.get("/", (req, res) => {
    res.send("ooof");
});
app.get("/get-order", (req, res) => {
    (0, axios_1.default)(config)
        .then(function (response) {
        res.send(response.data);
    })
        .catch(function (error) {
        console.log(error);
    });
});
app.post("/webhook", (req, res) => { });
