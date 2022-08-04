import { IntegrationDataType, ItemType } from "../types";
import { SquareAdaptee } from "./SquareAdaptee";
import data from "./IntegrationData.json";

export class Adapter {
    chosenAdapter: IntegrationAdaptee | null = null;
    constructor(name: string) {
        const data = this.getIntegrationData(name);
        switch (name) {
            case "Square": {
                this.chosenAdapter = new SquareAdaptee(data);
            }
        }
    }

    private getIntegrationData(name: string): IntegrationDataType {
        const int = data.find((integration) => integration.name === name);
        return {
            baseURL: int?.baseURL!,
            access_token: int?.access_token!,
            more_header_info: int?.more_header_info,
            search_info: int?.search_info,
        };
    }
}

export interface IntegrationAdaptee {
    integrationData: IntegrationDataType;
    getItems(body: any): Promise<ItemType[]>;
}
