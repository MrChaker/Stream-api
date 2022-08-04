import type { Express } from "express";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
export declare const integrationRouter: (app: Express, socketID: string, integrationName: string, io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => void;
export default integrationRouter;
