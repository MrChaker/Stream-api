"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.integrationRouter = void 0;
const crypto_1 = __importDefault(require("crypto"));
const Integration_1 = require("../interfaces/Integration");
let integration = null;
const integrationRouter = (app, socketID, integrationName, io) => {
    integration = new Integration_1.Integration(integrationName);
    app.post("/webhook", (req, res) => {
        if (integration) {
            integration.webhook(io, socketID, req);
        }
        res.status(200).send("webook recieved");
    });
};
exports.integrationRouter = integrationRouter;
const SIGNATURE_KEY = process.env.SQUARE_SIGNATURE || "";
function isFromSquare(signature) {
    const hmac = crypto_1.default.createHmac("sha256", SIGNATURE_KEY);
    hmac.update(process.env.URL + "/webhook");
    const hash = hmac.digest("base64");
    console.log(hash);
    return hash === signature;
}
exports.default = exports.integrationRouter;
