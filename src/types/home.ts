import { DBContactInfo, DBHome } from ".";

export interface Home {
    home: DBHome;
    contactInfo: DBContactInfo;
}

export interface Distance {
    distance: number;
    duration: number;
}