import type { Express } from "express";

import crypto from "crypto";
import { Integration } from "../interfaces/Integration";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let integration: Integration | null = null;

export const integrationRouter = (
    app: Express,
    socketID: string,
    integrationName: string,
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
    integration = new Integration(integrationName);

    app.post("/webhook", (req, res) => {
        if (integration) {
            integration.webhook(io, socketID, req);
        }
        res.end();
    });
};

const SIGNATURE_KEY = process.env.SQUARE_SIGNATURE || "";
function isFromSquare(signature: any) {
    const hmac = crypto.createHmac("sha256", SIGNATURE_KEY);
    hmac.update(process.env.URL + "/webhook");
    const hash = hmac.digest("base64");
    console.log(hash);
    return hash === signature;
}

export default integrationRouter;
