import crypto from "crypto";
import { Integration } from "../interfaces/Integration";
import express from "express";

const integrationRouter = express.Router();

integrationRouter.post("/webhook", (req, res) => {
    if (req.integration) {
        req.integration.webhook(req.io, req.socketId, req);
    }
    res.status(200).send("webook recieved");
});

export default integrationRouter;

const SIGNATURE_KEY = process.env.SQUARE_SIGNATURE || "";
function isFromSquare(signature: any) {
    const hmac = crypto.createHmac("sha256", SIGNATURE_KEY);
    hmac.update(process.env.URL + "/webhook");
    const hash = hmac.digest("base64");
    console.log(hash);
    return hash === signature;
}
