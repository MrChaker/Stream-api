import { Request } from "express";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
export interface IntegrationInterface {
    webhook(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, socketID: string, req: Request): void;
}
export declare class Integration implements IntegrationInterface {
    name: string;
    constructor(name: string);
    webhook(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, socketID: string, req: Request): void;
}
