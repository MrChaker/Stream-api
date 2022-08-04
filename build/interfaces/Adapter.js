"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adapter = void 0;
const SquareAdaptee_1 = require("./SquareAdaptee");
const IntegrationData_json_1 = __importDefault(require("./IntegrationData.json"));
class Adapter {
    constructor(name) {
        this.chosenAdapter = null;
        const data = this.getIntegrationData(name);
        switch (name) {
            case "Square": {
                this.chosenAdapter = new SquareAdaptee_1.SquareAdaptee(data);
            }
        }
    }
    getIntegrationData(name) {
        const int = IntegrationData_json_1.default.find((integration) => integration.name === name);
        return {
            baseURL: int === null || int === void 0 ? void 0 : int.baseURL,
            access_token: int === null || int === void 0 ? void 0 : int.access_token,
            more_header_info: int === null || int === void 0 ? void 0 : int.more_header_info,
            search_info: int === null || int === void 0 ? void 0 : int.search_info,
        };
    }
}
exports.Adapter = Adapter;
