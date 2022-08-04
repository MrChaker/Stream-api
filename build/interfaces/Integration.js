"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Integration = void 0;
const Adapter_1 = require("./Adapter");
class Integration {
    constructor(name) {
        this.name = name;
    }
    webhook(io, socketID, req) {
        var _a;
        // we need to handle the webhook for diffrent integrations
        const adapter = new Adapter_1.Adapter(this.name);
        (_a = adapter.chosenAdapter) === null || _a === void 0 ? void 0 : _a.getItems(req.body).then((items) => {
            console.log(socketID);
            console.log(items);
            io.to(socketID).emit("new order", items);
        });
    }
}
exports.Integration = Integration;
