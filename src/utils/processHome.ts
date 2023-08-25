import { Home } from "../types";
import { buildAddress, calcDistance, readHome, requestHtml } from ".";

export const processHome = async (homeLink: string): Promise<Home> => {
    const htmlStr = await requestHtml(homeLink);
    const { home, contactInfo } = readHome(htmlStr, homeLink);
    if (contactInfo.street && contactInfo.city && contactInfo.state && contactInfo.zip_code) {
        const { street, city, state, zip_code } = contactInfo;
        const homeAddress = buildAddress({ streetAddress: street, city, state, zip: zip_code });
        const { distance, duration } =  await calcDistance(process.env.MOUNT_TABOR_ADDRESS, homeAddress);
        home.miles_to_tabor_park = distance;
        home.minutes_to_tabor_park = duration;
    }
    return { home, contactInfo };
}