import { IntegrationDataType, ItemType } from "../types";
import { IntegrationAdaptee } from "./Adapter";
export declare class SquareAdaptee implements IntegrationAdaptee {
    integrationData: IntegrationDataType;
    constructor(data: IntegrationDataType);
    getItems(body: any): Promise<ItemType[]>;
}
