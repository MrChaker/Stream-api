import axios from "axios";
import { IntegrationDataType, ItemType, OrderType } from "../types";
import { IntegrationAdaptee } from "./Adapter";

export class CloverAdaptee implements IntegrationAdaptee {
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

        let orderID =
            body.merchants[
                this.integrationData.more_info.merchantID
            ][0].objectId.slice(2);

        /* switch (body.merchants[this.integrationData.more_info.merchantID].type) {
            case "CREATE":
                orderID = body.data.object.order_created.order_id;
                break;
            case "UPDATE": {
                orderID = body.data.object.order_updated.order_id;
            }
        } */
        const response: any = await axios(
            `${this.integrationData.baseURL}/${this.integrationData.more_info.merchantID}/orders/${orderID}?expand=lineItems`,
            {
                method: "get",
                headers,
            }
        ).catch(function (error: Error) {
            console.log("error");
        });
        if (response) {
            response.data.lineItems.elements.forEach((el: any) => {
                items.push({
                    name: el.name,
                    price: el.price,
                    quantity: el.unitQty / 1000,
                });
            });
            return {
                items,
                finalPrice: response.data.total,
                taxPrice: 0,
                itemsPrice: response.data.total - response.data.taxRemoved,
            };
        } else {
            return null;
        }
        /* res.send(response.data);  */
    }
}
