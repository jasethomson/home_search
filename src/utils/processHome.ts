import { Home } from "../types";
import { buildAddress, calcDistance, readHome, requestHtml } from ".";

const MOUNT_TABOR_ADDRESS = 'Mt. Tabor Park South Stairs, 6336 SE Lincoln St, Portland, OR 97215';

export const processHome = async (homeLink: string): Promise<Home> => {
    const htmlStr = await requestHtml(homeLink);
    const home = readHome(htmlStr, homeLink);
    if (home.streetAddress && home.city && home.state && home.zip) {
        const { streetAddress, city, state, zip } = home;
        const homeAddress = buildAddress({ streetAddress, city, state, zip });
        home.distanceToTabor = await calcDistance(MOUNT_TABOR_ADDRESS, homeAddress);
    }
    return home;
}