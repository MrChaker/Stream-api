"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const integrationRouter = express_1.default.Router();
integrationRouter.post("/webhook", (req, res) => {
    if (req.integration) {
        req.integration.webhook(req.io, req.socketId, req);
    }
    res.status(200).send("webook recieved");
});
exports.default = integrationRouter;
/* const SIGNATURE_KEY = process.env.SQUARE_SIGNATURE || "";
function isFromSquare(signature: any) {
    const hmac = crypto.createHmac("sha256", SIGNATURE_KEY);
    hmac.update(process.env.URL + "/webhook");
    const hash = hmac.digest("base64");
    console.log(hash);
    return hash === signature;
} */
