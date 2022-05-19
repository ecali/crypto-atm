export interface Venues {
    venues: Atm[];
}

export interface Atm {
    id: number;
    lat: number;
    lon: number;
    category: string;
    name: string;
    created_on: number;
    geolocation_degrees: string;
}