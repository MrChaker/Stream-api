import axios from "axios";
import { IntegrationDataType, ItemType, OrderType } from "../types";
import { IntegrationAdaptee } from "./Adapter";

export class SquareAdaptee implements IntegrationAdaptee {
    integrationData: IntegrationDataType;

    constructor(data: IntegrationDataType) {
        this.integrationData = data;
    }

    public async getItems(body: any): Promise<OrderType> {
        const headers = {
            Authorization: this.integrationData.access_token,
            "Content-Type": "application/json",
        };

        let items: ItemType[] = [];
        let orderID = "";

        switch (body.type) {
            case "order.created":
                orderID = body.data.object.order_created.order_id;
                break;
            case "order.updated": {
                orderID = body.data.object.order_updated.order_id;
            }
        }
        const response: any = await axios(
            `${this.integrationData.baseURL}/orders/${orderID}`,
            {
                method: "get",
                headers,
            }
        ).catch(function (error: Error) {
            console.log("error");
        });
        if (response) {
            response.data.order.line_items.forEach((item: any) => {
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
        } else {
            return null;
        }
        /* res.send(response.data);  */
    }
}
