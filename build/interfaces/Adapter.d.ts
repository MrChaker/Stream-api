import { IntegrationDataType, ItemType } from "../types";
export declare class Adapter {
    chosenAdapter: IntegrationAdaptee | null;
    constructor(name: string);
    private getIntegrationData;
}
export interface IntegrationAdaptee {
    integrationData: IntegrationDataType;
    getItems(body: any): Promise<ItemType[]>;
}
