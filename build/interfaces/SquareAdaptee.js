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
                Authorization: this.integrationData.access_token,
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
            if (response) {
                response.data.order.line_items.forEach((item) => {
                    items.push({
                        name: item.name,
                        price: item.total_money.amount,
                        quantity: item.quantity,
                    });
                });
                return {
                    items,
                    taxPrice: response.data.order.total_tax_money.amount,
                    itemsPrice: response.data.order.total_money.amount,
                    finalPrice: response.data.order.total_money.amount,
                };
            }
            else {
                return null;
            }
            /* res.send(response.data);  */
        });
    }
}
exports.SquareAdaptee = SquareAdaptee;
