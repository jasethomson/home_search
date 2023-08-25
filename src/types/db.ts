export interface DBHome {
    id: number | null;
    price: number | null;
    beds:  number | null;
    baths:  number | null;
    stories:  number | null;
    square_feet:  number | null;
    finished_square_feet:  number | null;
    lot_square_feet:  number | null;
    property_type: string | null;
    est_monthly_payment:  number | null;
    days_listed:  number | null;
    year_built:  number | null;
    description:  string | null;
    miles_to_tabor_park: number | null;
    minutes_to_tabor_park: number | null;
}

export interface DBContactInfo {
    id: number | null;
    home_id: number | null;
    web_link: string;
    street:  string | null;
    city:  string | null;
    state:  string | null;
    zip_code:  string | null;
    county:  string | null;
}