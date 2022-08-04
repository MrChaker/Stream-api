"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SquareAdaptee = void 0;
const axios_1 = __importDefault(require("axios"));
class SquareAdaptee {
    constructor(data) {
        this.integrationData = data;
    }
    getItems(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                Host: "connect.squareupsandbox.com",
                Authorization: "Bearer EAAAEEV5v78_Lck8rB_9hH5sYJNUWjH4qDEN80869Yu5XQWhYcKQ0PLZz8Agqpqz",
                "Content-Type": "application/json",
            };
            let items = [];
            let orderID = "";
            switch (body.type) {
                case "order.created":
                    orderID = body.data.object.order_created.order_id;
                    break;
                case "order.updated": {
                    orderID = body.data.object.order_updated.order_id;
                }
            }
            const response = yield (0, axios_1.default)(`${this.integrationData.baseURL}/orders/${orderID}`, {
                method: "get",
                headers,
            }).catch(function (error) {
                console.log("error");
            });
            if (response.data) {
                response.data.order.line_items.forEach((item) => {
                    items.push({
                        name: item.item_type,
                        price: item.total_money.amount,
                        quantity: item.quantity,
                    });
                });
                return items;
            }
            else {
                return [];
            }
            /* res.send(response.data);  */
        });
    }
}
exports.SquareAdaptee = SquareAdaptee;
