import { Request } from "express";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { OrderType } from "../types";
import { Adapter } from "./Adapter";

export interface IntegrationInterface {
    webhook(
        io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
        socketID: string,
        req: Request
    ): void;
}

export class Integration implements IntegrationInterface {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    public webhook(
        io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
        socketID: string,
        req: Request
    ) {
        // we need to handle the webhook for diffrent integrations
        const adapter = new Adapter(this.name);
        adapter.chosenAdapter?.getItems(req.body).then((Order: OrderType) => {
            console.log(socketID);
            console.log(Order);
            io.to(socketID).emit("new order", Order);
        });
    }
}
