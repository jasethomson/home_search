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