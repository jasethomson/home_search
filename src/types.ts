export interface Home {
    homeLink: string;
    price: string | null;
    beds:  string | null;
    baths:  string | null;
    sqft:  string | null;
    streetAddress:  string | null;
    city:  string | null;
    state:  string | null;
    zip:  string | null;
    pricePerSqft:  number | null;
    propertyType:  string | null;
    estMonthlyPayment:  string | null;
    timeListed:  string | null;
    finishedSqft:  string | null;
    stories:  string | null;
    lotSize:  string | null;
    yearBuilt:  string | null;
    county:  string | null;
    description:  string | null;
    distanceToTabor: Distance | null;
}

export interface Distance {
    distance: string;
    duration: string;
}

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        GCLOUD_MAPS_API_KEY: string;
        GLOUD_MAPS_BASE_URL: string;
        ROOT_REDFIN_URL: string;
        MOUNT_TABOR_REDFIN_URL: string;
        SELLWOOD_MORELAND_REDFIN_URL: string;
      }
    }
}