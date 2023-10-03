export type TNominatimReverse = {
    address: TNominatimAddress;
    boundingbox: [];
    class: string;
    place_id: number;
    licence : string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon:string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype: string,
    name: string;
    display_name: string,
}

export type TNominatimAddress = {
    'ISO3166-2-lvl4'?: string;
    country: string;
    country_code: string;
    county: string;
    neighbourhood: string;
    postcode: string;
    province: string;
    town: string;
    city: string;
}
