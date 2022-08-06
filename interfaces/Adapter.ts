import { IntegrationDataType, OrderType } from "../types";
import { SquareAdaptee } from "./SquareAdaptee";
import data from "./IntegrationData.json";
import { CloverAdaptee } from "./CloverAdaptee";

export class Adapter {
    chosenAdapter: IntegrationAdaptee | null = null;
    constructor(name: string) {
        const data = this.getIntegrationData(name);
        switch (name) {
            case "Clover": {
                this.chosenAdapter = new CloverAdaptee(data);
            }
        }
    }

    private getIntegrationData(name: string): IntegrationDataType {
        const int = data.find((integration) => integration.name === name);
        return {
            baseURL: int?.baseURL!,
            access_token: int?.access_token!,
            more_info: int?.more_info,
            search_info: int?.search_info,
        };
    }
}

export interface IntegrationAdaptee {
    integrationData: IntegrationDataType;
    getItems(body: any): Promise<OrderType>;
}
