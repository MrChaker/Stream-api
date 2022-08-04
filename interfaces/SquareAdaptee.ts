import axios from "axios";
import { IntegrationDataType, ItemType } from "../types";
import { IntegrationAdaptee } from "./Adapter";

export class SquareAdaptee implements IntegrationAdaptee {
    integrationData: IntegrationDataType;

    constructor(data: IntegrationDataType) {
        this.integrationData = data;
    }

    public async getItems(body: any): Promise<ItemType[]> {
        const headers = {
            Host: "connect.squareupsandbox.com",
            Authorization:
                "Bearer EAAAEEV5v78_Lck8rB_9hH5sYJNUWjH4qDEN80869Yu5XQWhYcKQ0PLZz8Agqpqz",
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
        if (response.data) {
            response.data.order.line_items.forEach((item: any) => {
                items.push({
                    name: item.item_type,
                    price: item.total_money.amount,
                    quantity: item.quantity,
                });
            });
            return items;
        } else {
            return [];
        }
        /* res.send(response.data);  */
    }
}
