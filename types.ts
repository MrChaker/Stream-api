export type OrderType = {
    items: ItemType[];
    taxPrice: number;
    itemsPrice: number;
    finalPrice: number;
} | null;

export type ItemType = {
    name: string;
    price: number;
    quantity: number;
};

export type IntegrationDataType = {
    baseURL: string;
    access_token: string;
    more_header_info: any;
    search_info: any;
};
