import { Home } from "../types";
import { buildAddress, calcDistance, readHome, requestHtml } from ".";
import { checkIfHomeExists, createContactInfo, createHome } from "../db";

export const processHome = async (homeLink: string): Promise<Home | null> => {
    let sourceIdStr = homeLink.split('/').pop();
    if (!sourceIdStr) {
        throw new Error('Home id not found');
    }
    const sourceId = Number(sourceIdStr);    
    const homeAlreadyExists = await checkIfHomeExists(sourceId);
    if (homeAlreadyExists) {
        console.info(`Home with sourceId ${sourceId} already exists, skipping read`);
        return null;
    }

    const htmlStr = await requestHtml(homeLink);
    const { home, contactInfo } = readHome(htmlStr, homeLink, sourceId);

    if (contactInfo.street && contactInfo.city && contactInfo.state && contactInfo.zip_code) {
        const { street, city, state, zip_code } = contactInfo;
        const homeAddress = buildAddress({ streetAddress: street, city, state, zip: zip_code });
        const { distance, duration } =  await calcDistance(process.env.MOUNT_TABOR_ADDRESS, homeAddress);
        home.miles_to_tabor_park = distance;
        home.minutes_to_tabor_park = duration;
    }

    home.id = await createHome(home);
    contactInfo.home_id = home.id;
    contactInfo.id = await createContactInfo(contactInfo);
    return { home, contactInfo };
}