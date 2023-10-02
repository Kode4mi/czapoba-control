export interface Status {
    code: number;
    message?: string;
}

export enum ServiceRoute {
    products = "products",
    offers = "offers",
    contractors = "contractors",
    users = "users"
}

export const serviceRouteTab: ServiceRoute[] = [
    ServiceRoute.products,
    ServiceRoute.offers,
    ServiceRoute.contractors,
    ServiceRoute.users
]