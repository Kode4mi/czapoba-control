export interface Status {
    code: number;
    message?: string;
}

export enum ServiceRoute {
    products = "products",
    offers = "offers",
    contractors = "contractors"
}